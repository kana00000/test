// 特定の処理を実行する関数
function checkAndUpdateElements() {
  document.querySelectorAll('dl[class*="talk"]').forEach(function(dl) {
    dl.querySelectorAll('p').forEach(function(p) {
      if (p.textContent.includes('꧅𒐫')) {
        dl.style.display = 'none';
      }
    });
  });
}

// ページ内の変更を監視するためのMutationObserverを設定
const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.type === 'childList') {
      checkAndUpdateElements();
    }
  });
});

// 監視を開始するための設定
observer.observe(document.body, { childList: true, subtree: true });

// 初期ロード時にも処理を実行
checkAndUpdateElements();
