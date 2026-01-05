const fs = require('fs-extra');
const path = require('path');
const { marked } = require('marked');
const fm = require('front-matter');

// Configuration
const SRC_DIR = path.join(__dirname, 'src');
const CONTENT_DIR = path.join(SRC_DIR, 'content');
const TEMPLATE_DIR = path.join(SRC_DIR, 'templates');
const STATIC_DIR = path.join(SRC_DIR, 'static');
const PUBLIC_DIR = path.join(__dirname, 'public');

// Globals
let SEARCH_INDEX = [];
let TEMPLATES = {};
let PARTIALS = {};

async function loadAssets() {
    TEMPLATES = {
        index: await fs.readFile(path.join(TEMPLATE_DIR, 'index.html'), 'utf8'),
        article: await fs.readFile(path.join(TEMPLATE_DIR, 'article.html'), 'utf8'),
    };
    PARTIALS = {
        head: await fs.readFile(path.join(TEMPLATE_DIR, 'partials', 'head.html'), 'utf8'),
        sidebar_left: await fs.readFile(path.join(TEMPLATE_DIR, 'partials', 'sidebar_left.html'), 'utf8'),
        sidebar_right: await fs.readFile(path.join(TEMPLATE_DIR, 'partials', 'sidebar_right.html'), 'utf8'),
        footer: await fs.readFile(path.join(TEMPLATE_DIR, 'partials', 'footer.html'), 'utf8'),
    };
}

/**
 * SCAN PHASE: Recursively build the site tree
 */
async function scanDirectory(dirPath, relativePath = '') {
    const name = path.basename(dirPath);
    // Check for index.md
    const indexMdPath = path.join(dirPath, 'index.md');
    let title = name;
    let metadata = {};
    let hasBody = false;

    if (await fs.pathExists(indexMdPath)) {
        const content = await fs.readFile(indexMdPath, 'utf8');
        const front = fm(content);
        metadata = front.attributes;
        if (metadata.title) title = metadata.title;
        hasBody = true;
    } else {
        // Fallback title formatting
        title = name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');
    }

    const node = {
        name: name,
        title: title,
        path: relativePath, // e.g., 'notes/red-team'
        url: relativePath ? `/${relativePath.replace(/\\/g, '/')}/index.html` : '/index.html',
        type: 'folder',
        children: [],
        metadata: metadata,
        srcPath: dirPath
    };

    const items = await fs.readdir(dirPath, { withFileTypes: true });

    for (const item of items) {
        const itemPath = path.join(dirPath, item.name);
        const itemRelPath = path.join(relativePath, item.name);

        if (item.isDirectory()) {
            const childNode = await scanDirectory(itemPath, itemRelPath);
            node.children.push(childNode);
        } else if (item.isFile() && item.name.endsWith('.md')) {
            if (item.name === 'index.md') continue; // Handled by folder node

            const content = await fs.readFile(itemPath, 'utf8');
            const front = fm(content);
            const fileTitle = front.attributes.title || item.name.replace('.md', '').charAt(0).toUpperCase() + item.name.replace('.md', '').slice(1).replace(/-/g, ' ');

            const fileNode = {
                name: item.name,
                title: fileTitle,
                path: itemRelPath, // e.g. notes/red-team/foo.md
                url: `/${itemRelPath.replace('.md', '.html').replace(/\\/g, '/')}`,
                type: 'file',
                metadata: front.attributes,
                srcPath: itemPath
            };
            node.children.push(fileNode);

            // Add to search
            SEARCH_INDEX.push({
                title: fileTitle,
                tags: front.attributes.tags || [],
                url: fileNode.url, // ensure leading slash
                content: front.body.substring(0, 200)
            });
        }
    }

    // Add folder to search if it has content
    if (hasBody) {
        SEARCH_INDEX.push({
            title: title,
            tags: metadata.tags || [],
            url: node.url,
            content: "Section Index"
        });
    }

    // Sort Children: Folders first, then by filename (preserves 01-xx ordering)
    node.children.sort((a, b) => {
        if (a.type === b.type) return a.name.localeCompare(b.name, undefined, { numeric: true });
        return a.type === 'folder' ? -1 : 1;
    });

    return node;
}

/**
 * RENDER PHASE: Generate HTML files
 */
async function renderNode(node, rootNode) {
    const isFile = node.type === 'file';
    const outputPath = path.join(PUBLIC_DIR, node.path.replace('.md', '.html'));

    // Ensure parent dir exists (if node.path is empty/root, skip)
    if (node.path) {
        await fs.ensureDir(path.dirname(outputPath));
    } else {
        // Root folder
    }

    // Prepare Content
    let rawContent = '';
    let htmlContent = '';
    const src = isFile ? node.srcPath : path.join(node.srcPath, 'index.md');

    if (await fs.pathExists(src)) {
        rawContent = await fs.readFile(src, 'utf8');
        htmlContent = marked(fm(rawContent).body);
    }

    // Calculate depth for rootPath
    const depth = node.path ? node.path.split(path.sep).length : 0;
    // For file 'a/b.md', depth is 2. root is ../..
    // For folder 'a/b', path is 'a/b', depth is 2. output is a/b/index.html. root is ../..
    // Actually depth logic:
    // File: public/notes/foo.html -> depth 2 -> ../..
    // Folder: public/notes/index.html -> depth 1 -> ..

    // Wait. node.path for folder 'notes' is 'notes'. Output is public/notes/index.html.
    // 'notes' has 1 segment. 'notes/index.html' is 1 level deep relative to root? 
    // No, public/index.html is root. public/notes/index.html is depth 1.
    // public/notes/red/index.html is depth 2.
    // node.path='notes' -> split length 1.
    // so depth = node.path.split(path.sep).length. 
    // if node.path is empty string (root), depth 0.

    // BUT for file: 'notes/foo.md' -> path='notes/foo.md' -> split length 2.
    // output: public/notes/foo.html. depth 2.

    // Correct logic:
    // If root (path==''), depth 0.
    // Else count segments.

    let pathDepth = 0;
    if (node.path && node.path !== '') {
        const segments = node.path.replace(/\\/g, '/').split('/');
        pathDepth = segments.length;
        if (node.type === 'file') {
            pathDepth -= 1;
        }
    }

    let rootPath = pathDepth === 0 ? '.' : Array(pathDepth).fill('..').join('/');

    // Debug Logging
    if (node.name === 'phishing.md') {
        console.log(`Debug: Rendering phishing.md. Path: ${node.path}, Depth: ${pathDepth}, RootPath: ${rootPath}`);
    }

    // Generate Global Recursive Tree for Sidebar
    const activePath = node.path || '';
    const sidebarTree = generateRecursiveTree(rootNode, activePath, rootPath);

    // Generate Breadcrumbs
    const breadcrumbs = generateBreadcrumbs(node, rootPath);

    // Generate Content List (Immediate Children) for Index Pages
    let childrenListHtml = '';
    if (!isFile) {
        childrenListHtml = generateChildrenList(node, rootPath);
    }

    const data = {
        title: node.title,
        content: htmlContent,
        date: await getGitLastModified(node.srcPath) || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }),
        tags: node.metadata.tags || [],
        breadcrumbs: breadcrumbs,
        sidebar_tree: sidebarTree,
        children_list: childrenListHtml, // Added
        root_path: rootPath
    };

    const templateName = isFile ? 'article' : 'index';
    const html = renderTemplate(templateName, data);

    const finalOutPath = isFile ? outputPath.replace('.md', '.html') : path.join(outputPath, 'index.html');
    await fs.outputFile(finalOutPath, html);

    // Recurse
    if (!isFile) {
        for (const child of node.children) {
            await renderNode(child, rootNode);
        }
    }
}

async function getGitLastModified(filePath) {
    try {
        const { execSync } = require('child_process');
        // Get the last commit date in ISO format
        const dateStr = execSync(`git log -1 --format=%cd --date=iso-strict "${filePath}"`, { encoding: 'utf8' }).trim();
        if (dateStr) {
            return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
        }
    } catch (e) {
        console.warn(`Git date lookup failed for ${filePath}:`, e.message);
    }
    return null;
}


function renderTemplate(name, data) {
    let html = TEMPLATES[name];
    const repl = (str, key, val) => str.split(`{{${key}}}`).join(val);

    // Inject Partials with Root Path
    ['head', 'sidebar_left', 'sidebar_right', 'footer'].forEach(p => {
        let partialContent = PARTIALS[p];

        // Root Path injection for all partials
        partialContent = partialContent.split('{{root_path}}').join(data.root_path);

        // Special: Sidebar Tree injection
        if (p === 'sidebar_right') {
            const tree = data.sidebar_tree || '<div class="empty-tree">No Tree Data</div>';
            partialContent = partialContent.split('{{sidebar_tree}}').join(tree);
        }

        html = repl(html, p, partialContent);
    });

    html = repl(html, 'title', data.title);
    html = repl(html, 'content', data.content);
    html = repl(html, 'date', data.date);
    html = repl(html, 'breadcrumbs', data.breadcrumbs);
    // html = repl(html, 'children_grid', data.children_tree);
    html = repl(html, 'children_list', data.children_list || '');
    html = repl(html, 'tags', data.tags.map(t => `<span class="tag">${t}</span>`).join(''));
    html = repl(html, 'root_path', data.root_path);
    html = repl(html, 'description', data.title + ' - Eli2k');

    return html;
}

function generateRecursiveTree(node, activePath, rootPath) {
    if (!node.children || node.children.length === 0) return '';

    let html = '<ul class="tree-list">';

    for (const child of node.children) {
        // Calculate relative URL
        // child.url is like /notes/foo.html. rootPath is ../..
        // We want active path awareness.
        let linkUrl = rootPath + child.url;

        const isFile = child.type === 'file';

        // Normalize for comparison
        const normActive = activePath ? activePath.replace(/\\/g, '/') : '';
        const normChild = child.path ? child.path.replace(/\\/g, '/') : '';

        let isOpen = '';
        let isActiveClass = '';

        if (!isFile) {
            // Folder: Open if it partially matches active path
            if (normActive.startsWith(normChild)) {
                isOpen = 'open';
            }
        } else {
            // File: Active if exact match
            if (normActive === normChild) {
                isActiveClass = ' class="active-file"';
            }
        }

        if (isFile) {
            html += `
                <li class="tree-item file">
                    <a href="${linkUrl}"${isActiveClass}>
                        <span class="tree-icon">📄</span> ${child.title}
                    </a>
                </li>`;
        } else {
            const childrenHtml = generateRecursiveTree(child, activePath, rootPath);
            html += `
                <li class="tree-item folder">
                    <details ${isOpen}>
                        <summary>
                            <span class="tree-icon">📁</span> 
                            <a href="${linkUrl}" class="folder-link">${child.title}</a>
                        </summary>
                        ${childrenHtml}
                    </details>
                </li>`;
        }
    }
    html += '</ul>';
    return html;
}

function generateBreadcrumbs(node, rootPath) {
    // Reconstruct path from node.path (which is relative to content root)
    if (!node.path) return `<a href="${rootPath}/index.html">root</a>`;

    const parts = node.path.replace(/\\/g, '/').split('/');
    let html = `<a href="${rootPath}/index.html">root</a>`;

    let accPath = '';
    parts.forEach((part, i) => {
        accPath += '/' + part;
        // Fix case: title case the part for display, but use raw for link? 
        // We don't have the Title of the parent nodes easily unless we search the tree. 
        // But we can approximate Title Case.
        const label = part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ');

        let linkUrl = `${rootPath}${accPath}`;
        if (linkUrl.endsWith('.md')) linkUrl = linkUrl.replace('.md', '.html');
        else linkUrl += '/index.html'; // folder

        if (i === parts.length && node.type === 'file') {
            html += ` / <span class="current">${label}</span>`;
        } else {
            html += ` / <a href="${linkUrl}">${label}</a>`;
        }
    });
    return html;
}

function generateChildrenList(node, rootPath) {
    if (!node.children || node.children.length === 0) return '';

    let html = '<div class="section-list"><h3>Section Contents</h3><ul class="content-grid">';

    for (const child of node.children) {
        // Calculate relative URL
        let linkUrl = rootPath + child.url;
        const icon = child.type === 'file' ? '📄' : '📁';

        let desc = '';
        if (child.metadata && child.metadata.description) {
            desc = `<p>${child.metadata.description}</p>`;
        }

        html += `
            <li class="content-item">
                <a href="${linkUrl}">
                    <span class="content-icon">${icon}</span>
                    <span class="content-title">${child.title}</span>
                </a>
                ${desc}
            </li>`;
    }
    html += '</ul></div>';
    return html;
}

async function main() {
    await loadAssets();
    await fs.emptyDir(PUBLIC_DIR);
    await fs.copy(STATIC_DIR, PUBLIC_DIR);

    // Scan everything into memory
    const rootNode = await scanDirectory(CONTENT_DIR);

    // Render everything
    await renderNode(rootNode, rootNode);

    // Generate Search Index as JS file for local (file://) support
    const searchJsContent = `window.SEARCH_INDEX = ${JSON.stringify(SEARCH_INDEX, null, 2)};`;
    await fs.outputFile(path.join(PUBLIC_DIR, 'js', 'search_data.js'), searchJsContent);
    console.log('Build complete.');
}

main().catch(console.error);
