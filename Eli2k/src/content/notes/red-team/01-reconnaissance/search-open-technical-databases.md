---
title: Search Open Technical Databases
tags: [recon, osint, certificates, shodan, whois]
description: Leveraging public datasets like Certificate Transparency logs, Shodan, and WHOIS to find hidden assets.
date: 2024-01-02
---

# Search Open Technical Databases (T1596)

You don't always need to scan the target. Sometimes, the target has already been scanned by the internet, or they have published their own infrastructure details via public registries.

## 1. Certificate Transparency (CT) Logs
SSL/TLS certificates are public. When a company creates `vpn-dev.target.com` and gets a LetsEncrypt cert, it is logged instantly.

### Implementation
- **crt.sh**: The web interface for CT logs.
  - Query: `%.target.com` (Wildcard search).
  - **Trick**: Look for "Pre-certificate" entries. These are often generated *before* the service is live or DNS is propagated.
- **CertSpotter**: Automated monitoring.
- **Relevance**: 
  - Finds subdomains that `Amass` might miss if they don't solve in DNS yet.
  - Reveals internal naming schemes (`corp-ad-01.target.com`).

## 2. Infrastructure Search Engines (Shodan / Censys)
"Google for Internet-connected devices". Scanning without scanning.

### Shodan
- **IP Search**: `net:203.0.113.0/24`. Show me everything in their IP block.
- **Org Search**: `org:"Target Corp"`.
- **SSL Facet**: `ssl:"target.com"`. Finds any IP serving an SSL cert with "target.com" in the subject/SAN, *even if the IP doesn't resolve in public DNS*.
- **Favicon Hash**: 
  1.  Calculate the murmurhash of the target's favicon.ico.
  2.  Search `http.favicon.hash:123456789`.
  3.  Find every server (internal, dev, cloud) using that icon. `Spring Boot` green leaf icon is a classic target.

### Censys
Similar to Shodan but better for TLS/Certificate pivoting.
- Query: `443.https.tls.certificate.parsed.names: target.com`

## 3. WHOIS and Reverse WHOIS
Domain ownership records.
- **Registrant Email**: If admin registered a domain with `admin@target.com`, use **Reverse WHOIS** (DomainTools, Whoxy) to find *every other domain* registered by that email.
- **Pivoting**:
  1.  Find `target.com`.
  2.  See Registrant: `IT Ops Team`.
  3.  Reverse Search `IT Ops Team`.
  4.  Find `target-dev-portal.io` (Separate domain, weaker security).

## 4. Public Code Repositories (GitHub / GitLab)
Developers leak secrets. Constantly.

### What to search for?
- `target.com password`
- `target.com api_key`
- `target.com aws_secret`
- `target.com jdbc` (Database connection strings)
- `"Authorization: Bearer"`

### Tools: GitRob / TruffleHog
- **TruffleHog**: Scans entire commit history. A developer might have committed a key, realized it, deleted it in the next commit. *It still exists in the `.git` history*. TruffleHog finds these "deleted" secrets.

```bash
trufflehog git https://github.com/target/repo.git
```

## 5. Wayback Machine (Archive.org)
- **Old Endpoints**: A login page might be removed from the main nav, but the PHP file (`/admin_v1.php`) might still exist on the server.
- **Waybackurls**: Tool to fetch all known URLs for a domain from Archive.org.
  ```bash
  waybackurls target.com | grep "login"
  ```
