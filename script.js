// ============================================
// 2000年代前半レトロホームページ JavaScript
// ============================================

// 1. キラキラパーティクル生成
function generateSparkles() {
    const sparklesContainer = document.querySelector('.sparkles');
    
    for (let i = 0; i < 50; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        sparkle.style.animationDuration = (Math.random() * 2 + 1) + 's';
        sparklesContainer.appendChild(sparkle);
    }
}

// 2. クリックでイースター卵：パーティクル効果
function addClickParticles() {
    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;
        
        createParticles(e.clientX, e.clientY);
    });
}

function createParticles(x, y) {
    const particles = ['✨', '⭐', '💫', '🌟', '✨'];
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.fontSize = (Math.random() * 20 + 10) + 'px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.animation = `particleFloat ${Math.random() * 2 + 1}s ease-out forwards`;
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 3000);
    }
}

// パーティクルアニメーション定義
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% {
            opacity: 1;
            transform: translateY(0) translateX(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-100px) translateX(${Math.random() * 100 - 50}px) scale(0);
        }
    }
`;
document.head.appendChild(style);

// 3. ページ読み込み時のアラート
function showWelcomeAlert() {
    // 最初の訪問のみ表示
    if (!sessionStorage.getItem('visited')) {
        setTimeout(() => {
            alert('✨ようこそ！惑星トントンの公式ホームページへ！✨\n\n🎵最新曲「ここではないどこかへ」配信中！🎵');
            sessionStorage.setItem('visited', 'true');
        }, 800);
    }
}

// 4. スクロール連動タイトルアニメーション
function addScrollAnimation() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const rotation = (scrollY * 0.1) % 360;
        header.style.transform = `perspective(1000px) rotateX(${Math.sin(scrollY * 0.01) * 2}deg)`;
    });
}

// 5. キーボードイースター卵：コナミコード
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

function detectKonamiCode() {
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);
        
        if (konamiCode.join(',').includes(konamiPattern.join(','))) {
            activateKonamiMode();
            konamiCode = [];
        }
    });
}

function activateKonamiMode() {
    document.body.style.animation = 'spin-full 1s ease-in-out';
    alert('🎊 コナミコード発動！🎊\n惑星トントンへようこそ！🪐');
    
    // 全体に回転アニメーション
    const spinStyle = document.createElement('style');
    spinStyle.textContent = `
        @keyframes spin-full {
            0% { transform: rotateZ(0deg); }
            100% { transform: rotateZ(360deg); }
        }
    `;
    document.head.appendChild(spinStyle);
}

// 6. リアルタイムカウンター表示
function updateCounter() {
    const now = new Date();
    const visitTime = document.createElement('p');
    visitTime.style.textAlign = 'center';
    visitTime.style.marginTop = '15px';
    visitTime.style.fontSize = '0.9em';
    visitTime.style.color = '#666';
    visitTime.textContent = `最終更新: ${now.toLocaleString('ja-JP')}`;
    
    const footer = document.querySelector('footer');
    if (footer) {
        footer.appendChild(visitTime);
    }
}

// 7. マウスカーソルエフェクト
function addCursorTrail() {
    document.addEventListener('mousemove', (e) => {
        // 時々パーティクルを生成（パフォーマンス考慮）
        if (Math.random() > 0.9) {
            const trail = document.createElement('div');
            trail.style.position = 'fixed';
            trail.style.left = e.clientX + 'px';
            trail.style.top = e.clientY + 'px';
            trail.style.width = '5px';
            trail.style.height = '5px';
            trail.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
            trail.style.borderRadius = '50%';
            trail.style.pointerEvents = 'none';
            trail.style.zIndex = '9998';
            trail.style.animation = 'fadeOut 1s ease-out forwards';
            
            document.body.appendChild(trail);
            setTimeout(() => trail.remove(), 1000);
        }
    });
    
    // フェードアウトアニメーション追加
    const fadeStyle = document.createElement('style');
    fadeStyle.textContent = `
        @keyframes fadeOut {
            0% {
                opacity: 1;
                transform: scale(1);
            }
            100% {
                opacity: 0;
                transform: scale(0);
            }
        }
    `;
    document.head.appendChild(fadeStyle);
}

// 8. リンククリック時の効果
function addLinkEffects() {
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.href === '#' || !this.href.startsWith('http')) {
                e.preventDefault();
                alert('準備中です！\nお楽しみに...🎵');
            }
            
            // クリック時のエフェクト
            createParticles(e.clientX, e.clientY);
        });
    });
}

// 9. ページを離れるアラート
function addExitAlert() {
    window.addEventListener('beforeunload', (e) => {
        // 実装するかどうかはお好みで
        // e.preventDefault();
        // e.returnValue = '本当に離れますか？また遊びに来てね！🪐';
    });
}

// 10. ナビゲーション自動スクロール
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 11. ホイール装飾アニメーション
function animateDecorations() {
    document.querySelectorAll('.member-icon').forEach((icon, index) => {
        icon.style.animation = `bounce 2s ease-in-out infinite ${index * 0.1}s`;
    });
}

// 12. 背景アニメーション強化
function enhanceBackground() {
    // ページスクロール時に背景を微妙に変更
    window.addEventListener('scroll', () => {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        document.body.style.backgroundPosition = `${scrollPercentage}% 0`;
    });
}

// ============================================
// 初期化
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    generateSparkles();
    addClickParticles();
    showWelcomeAlert();
    addScrollAnimation();
    detectKonamiCode();
    updateCounter();
    addCursorTrail();
    addLinkEffects();
    addExitAlert();
    smoothScroll();
    animateDecorations();
    enhanceBackground();
    
    // コンソールにメッセージ
    console.log('%c🪐 惑星トントン 公式ホームページへようこそ！🪐', 'font-size: 20px; color: #FF00FF; font-weight: bold; text-shadow: 2px 2px 0 #00FFFF;');
    console.log('%c最新曲「ここではないどこかへ」配信中！', 'font-size: 14px; color: #00FFFF;');
    console.log('ソースコード: https://github.com/teranosinn-arch/tongtong_homepage');
});

// ブラウザのコンソールをいたずら
console.log('%c\n████████████████████████████████████████\n███ 惑星トントン Official Site ███\n████████████████████████████████████████\n', 'color: #FF00FF; font-weight: bold;');
