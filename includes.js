// ============================================
// HTMLパーツ読み込み（ブロック単位で編集できるようにする）
// [data-include] 属性が指定された要素を、対応する
// partials/ 以下のHTMLファイルの中身に差し替える
// ============================================
(function () {
    'use strict';

    async function loadInclude(el) {
        const url = el.getAttribute('data-include');
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const html = await res.text();
            const template = document.createElement('template');
            template.innerHTML = html.trim();
            el.replaceWith(...template.content.childNodes);
        } catch (err) {
            console.error(`[includes.js] パーツの読み込みに失敗しました: ${url}`, err);
            el.textContent = `[読み込みエラー: ${url}]`;
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        const targets = Array.from(document.querySelectorAll('[data-include]'));

        Promise.all(targets.map(loadInclude)).then(() => {
            // 各ブロックのHTMLが全て差し替わった後に発火
            // script.js 側はこのイベントを待って初期化処理を行う
            document.dispatchEvent(new CustomEvent('partials:loaded'));
        });
    });
})();
