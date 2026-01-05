/**
 * CTF Challenge Manager
 * Tracks found flags and unlocks rewards.
 */

const CTF = (function () {
    // This is the easy (but boring) way of solving the ctf
    const FLAGS = [
        'flag{c0ns0l3_h4ck3r_3l1t3}',
        'flag{v1ew_s0urc3_m4st3r}',
        'flag{c00k1e_m0nst3r}',
        'flag{l0c4l_st0r4g3_rul3z}',
        'flag{s34rch_3ng1n3_d1sc0v3ry}',
        'flag{base64_is_not_encryption}',
        'flag{k0n4m1_c0mm4nd0}',
        'flag{css_1nsp3ct0r_g4dg3t}',
        'flag{gl0b4l_cl1ck3r}',
        'flag{h1dd3n_href_hunt3r}'
    ];

    const STORAGE_KEY = 'ctf_progress';

    function getProgress() {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    }

    function saveProgress(found) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
    }

    function checkWinCondition() {
        const found = getProgress();
        if (found.length === FLAGS.length) {
            console.log("%c🎉 CONGRATULATIONS! ALL FLAGS FOUND! 🎉", "font-size: 20px; color: gold;");
            unlockReward();
        }
    }

    function unlockReward() {
        // Show Badge
        const badge = document.getElementById('elite-badge');
        if (badge) {
            badge.classList.remove('hidden-badge');
            badge.classList.add('visible-badge');
        }

        // Trigger Confetti
        triggerConfetti();
    }

    function triggerConfetti() {
        // Simple confetti implementation
        const count = 200;
        const defaults = {
            origin: { y: 0.7 }
        };

        function fire(particleRatio, opts) {
            // Placeholder: In a real app we'd load canvas-confetti library
            // For now, let's just create some simple CSS particles
            createCSSConfetti();
        }
        createCSSConfetti();
    }

    function createCSSConfetti() {
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 5000);
        }
    }

    return {
        submit: function (flag) {
            if (!flag) {
                console.log("Usage: CTF.submit('flag{...}')");
                return;
            }

            if (!FLAGS.includes(flag)) {
                console.log("%c❌ Invalid Flag.", "color: red");
                return;
            }

            const found = getProgress();
            if (found.includes(flag)) {
                console.log("%c⚠️ Flag already found!", "color: orange");
                return;
            }

            found.push(flag);
            saveProgress(found);

            console.log(`%c✅ Flag Accepted! (${found.length}/${FLAGS.length})`, "color: lime; font-weight: bold;");
            checkWinCondition();
        },

        status: function () {
            const found = getProgress();
            console.log(`Current Progress: ${found.length}/${FLAGS.length} Flags Found.`);
            if (found.length === FLAGS.length) {
                console.log("You have unlocked the Elite Hacker Badge!");
            }
        },

        // Internal init
        init: function () {
            console.log("%c🕵️ CTF Challenge Active. Submit flags using CTF.submit('flag{...}')", "color: cyan");
            const found = getProgress();
            if (found.length === FLAGS.length) {
                unlockReward(); // Prepare badge if already won
            }
        }
    };
})();

// Init on load
document.addEventListener('DOMContentLoaded', CTF.init);
