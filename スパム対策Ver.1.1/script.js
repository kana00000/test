// GitHubのリポジトリからテキストファイルを取得するURL
const url = 'https://raw.githubusercontent.com/kana00000/test/main/NGKeyword.txt';
let searchTextList = [];

// テキストファイルの内容を取得し、行ごとにリストに変換
function NGKeyword() {
  fetch(url)
    .then(response => response.text())
    .then(text => {
      // 改行で分割し、空行を除外する
      searchTextList = text.split('\n').filter(line => line.trim() !== '');
    })
    .catch(error => {
      console.error('ファイルの読み込みに失敗しました:', error);
    });
}


NGKeyword();
// 特定のテキストを含むリスト
//const searchTextList = ['𒐫'];

// 特定の処理を実行する関数
function checkAndUpdateElements() {
  document.querySelectorAll('dl[class*="talk"]').forEach(function(dl) {
    dl.querySelectorAll('p').forEach(function(p) {
      // リスト内の各テキストに対してチェック
      searchTextList.forEach(function(searchText) {
        if (p.textContent.includes(searchText)) {
          dl.style.display = 'none';
          // 一致するテキストが見つかったら、他のテキストのチェックは不要なのでループを抜ける
          return;
        }
      });
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