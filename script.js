// ============================================
// 2000年代前半レトロホームページ JavaScript
// ============================================
(function () {
    'use strict';

    // ---- 共通ユーティリティ ----

    // alert() の代わりに使う非ブロッキングの通知バナー
    // (style.css の .site-notice / .is-visible を参照)
    let noticeTimer = null;
    function showNotice(message, duration = 4000) {
        let notice = document.getElementById('site-notice');
        if (!notice) {
            notice = document.createElement('div');
            notice.id = 'site-notice';
            notice.className = 'site-notice';
            document.body.appendChild(notice);
        }
        notice.textContent = message;
        notice.classList.add('is-visible');

        clearTimeout(noticeTimer);
        noticeTimer = setTimeout(() => {
            notice.classList.remove('is-visible');
        }, duration);
    }

    // 1. キラキラパーティクル生成
    function generateSparkles() {
        const sparklesContainer = document.querySelector('.sparkles');
        if (!sparklesContainer) return;

        const fragment = document.createDocumentFragment();
        for (let i = 0; i < 50; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animationDelay = Math.random() * 2 + 's';
            sparkle.style.animationDuration = (Math.random() * 2 + 1) + 's';
            fragment.appendChild(sparkle);
        }
        sparklesContainer.appendChild(fragment);
    }

    // 2. クリックでイースター卵：パーティクル効果
    function createParticles(x, y) {
        const particles = ['✨', '⭐', '💫', '🌟', '✨'];

        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.textContent = particles[Math.floor(Math.random() * particles.length)];
            particle.className = 'click-particle';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.fontSize = (Math.random() * 20 + 10) + 'px';
            particle.style.animationDuration = (Math.random() * 2 + 1) + 's';
            // パーティクルごとに異なる方向へ飛ばす（CSSカスタムプロパティ経由）
            particle.style.setProperty('--drift-x', (Math.random() * 100 - 50) + 'px');

            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 3000);
        }
    }

    function addClickParticles() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('a, button')) return;
            createParticles(e.clientX, e.clientY);
        });
    }

    // 3. ページ読み込み時のウェルカム通知（非ブロッキング）
    function showWelcomeNotice() {
        if (sessionStorage.getItem('visited')) return;

        setTimeout(() => {
            showNotice('✨ようこそ！惑星トントンの公式ホームページへ！🎵最新曲「ここではないどこかへ」配信中！🎵', 6000);
            sessionStorage.setItem('visited', 'true');
        }, 800);
    }

    // 4. スクロール連動タイトルアニメーション
    function addScrollAnimation() {
        const header = document.querySelector('header');
        if (!header) return;

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            header.style.transform = `perspective(1000px) rotateX(${Math.sin(scrollY * 0.01) * 2}deg)`;
        });
    }

    // 5. キーボードイースター卵：コナミコード
    function detectKonamiCode() {
        const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        let buffer = [];

        document.addEventListener('keydown', (e) => {
            buffer.push(e.key);
            buffer = buffer.slice(-konamiPattern.length);

            if (buffer.join(',') === konamiPattern.join(',')) {
                activateKonamiMode();
                buffer = [];
            }
        });
    }

    function activateKonamiMode() {
        // 全体に回転アニメーション（style.css の .konami-spin を参照）
        document.body.classList.add('konami-spin');
        showNotice('🎊 コナミコード発動！🎊 惑星トントンへようこそ！🪐', 4000);
        setTimeout(() => document.body.classList.remove('konami-spin'), 1000);
    }

    // 6. リアルタイムカウンター表示
    function updateCounter() {
        const footer = document.querySelector('footer');
        if (!footer) return;

        const visitTime = document.createElement('p');
        visitTime.className = 'last-updated';
        visitTime.textContent = `最終更新: ${new Date().toLocaleString('ja-JP')}`;
        footer.appendChild(visitTime);
    }

    // 7. マウスカーソルエフェクト
    function addCursorTrail() {
        document.addEventListener('mousemove', (e) => {
            // 時々パーティクルを生成（パフォーマンス考慮）
            if (Math.random() <= 0.9) return;

            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.left = e.clientX + 'px';
            trail.style.top = e.clientY + 'px';
            trail.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;

            document.body.appendChild(trail);
            setTimeout(() => trail.remove(), 1000);
        });
    }

    // 8. リンククリック時の効果
    function addLinkEffects() {
        document.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', function (e) {
                // href="#" の準備中リンクのみ通知を出す（アンカーリンクや実URLは対象外）
                if (this.getAttribute('href') === '#') {
                    e.preventDefault();
                    showNotice('準備中です！お楽しみに...🎵', 3000);
                }

                createParticles(e.clientX, e.clientY);
            });
        });
    }

    // 9. ナビゲーション自動スクロール
    function smoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });
    }

    // 10. メンバーアイコンのバウンドアニメーション（style.css の bob keyframe を使用）
    function animateDecorations() {
        document.querySelectorAll('.member-icon').forEach((icon, index) => {
            icon.style.animation = `bob 2s ease-in-out infinite ${index * 0.1}s`;
        });
    }

    // 11. 背景アニメーション強化
    function enhanceBackground() {
        window.addEventListener('scroll', () => {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercentage = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
            document.body.style.backgroundPosition = `${scrollPercentage}% 0`;
        });
    }

    // 12. アクセスカウンター
    // CountAPI（登録不要の無料カウンターAPI）でアクセス数を加算＆表示。
    // オフライン等でAPIに繋がらない場合はブラウザローカルの推定値にフォールバックする。
    async function initAccessCounter() {
        const digitsEl = document.getElementById('counter-digits');
        if (!digitsEl) return;

        const DIGIT_COUNT = 6;
        const NAMESPACE = 'tongtong-homepage-teranosinn-arch';
        const KEY = 'visits';

        function render(value) {
            digitsEl.textContent = String(value).padStart(DIGIT_COUNT, '0');
        }

        try {
            const res = await fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/${KEY}`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            render(data.value);
        } catch (err) {
            console.warn('[access-counter] オンラインカウンターに接続できないため、ローカルの推定値を表示します。', err);
            const LOCAL_KEY = 'tongtongLocalVisitCount';
            const count = (parseInt(localStorage.getItem(LOCAL_KEY), 10) || 0) + 1;
            localStorage.setItem(LOCAL_KEY, String(count));
            render(count);
        }
    }

    // ============================================
    // 初期化
    // ============================================
    // header/nav/各セクション/footer は partials/ から
    // includes.js が非同期で読み込むため、それらのブロックが
    // 全てDOMに揃った後（'partials:loaded'）に初期化する。
    function initApp() {
        generateSparkles();
        addClickParticles();
        showWelcomeNotice();
        addScrollAnimation();
        detectKonamiCode();
        updateCounter();
        initAccessCounter();
        addCursorTrail();
        addLinkEffects();
        smoothScroll();
        animateDecorations();
        enhanceBackground();

        // コンソールにメッセージ
        console.log('%c🪐 惑星トントン 公式ホームページへようこそ！🪐', 'font-size: 20px; color: #FF00FF; font-weight: bold; text-shadow: 2px 2px 0 #00FFFF;');
        console.log('%c最新曲「ここではないどこかへ」配信中！', 'font-size: 14px; color: #00FFFF;');
        console.log('ソースコード: https://github.com/teranosinn-arch/tongtong_homepage');
    }

    document.addEventListener('partials:loaded', initApp);

    // ブラウザのコンソールをいたずら
    console.log('%c\n████████████████████████████████████████\n███ 惑星トントン Official Site ███\n████████████████████████████████████████\n', 'color: #FF00FF; font-weight: bold;');
})();
