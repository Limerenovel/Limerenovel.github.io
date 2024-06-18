const novelContent = document.getElementById('novel-content');
let currentPage = 0;
let novelPages = [];

// 使用XMLHttpRequest來讀取檔案內容
const xhr = new XMLHttpRequest();
xhr.open('GET', 'novel.txt', true);
xhr.onload = function () {
  if (xhr.status === 200) {
    let novelText = xhr.responseText;
    // 移除被 /* 和 */ 包住的部分
    novelText = novelText.replace(/\/\*[\s\S]*?\*\//g, '');
    // 使用 &&& 作為分割符
    novelPages = novelText.split('&&&');
    // 去除每段開頭的多餘空格，並將換行符替換為 <br>
    novelPages = novelPages.map(page => 
      page.split('\n').map(paragraph => paragraph.trim()).join('<br>')
    );

    // 解析URL參數
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get('page');
    if (pageParam !== null) {
      const pageIndex = parseInt(pageParam, 10);
      if (pageIndex >= 0 && pageIndex < novelPages.length) {
        currentPage = pageIndex;
      } else {
        showErrorPage();
        return;
      }
    }

    showPage(currentPage);
  } else {
    console.error('讀取檔案時發生錯誤：', xhr.status);
  }
};
xhr.onerror = function () {
  console.error('讀取檔案時發生錯誤。');
};
xhr.send();

// 翻頁功能
document.querySelectorAll("#prev-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        if (currentPage > 0) {
        currentPage--;
        showPage(currentPage);
        }
    });
});
document.querySelectorAll("#next-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        if (currentPage < novelPages.length - 1) {
            currentPage++;
            showPage(currentPage);
        }
    });
});
    
// 顯示指定頁面的內容
function showPage(pageIndex) {
  let content = novelPages[pageIndex];
  // 獲取章節名稱
  const chapterTitleMatch = content.match(/\/\/(.+?)\/\//);
  let chapterTitle = '';
  if (chapterTitleMatch) {
    chapterTitle = chapterTitleMatch[1];
    // 移除章節名稱部分
    content = content.replace(/\/\/(.+?)\/\//, '').trim();
  }
  
  document.getElementById("page").innerText = chapterTitle;
  let paragraphs = content.split('<br>').map(paragraph => `<p>${paragraph}<\/p>`).join('');
  
  // 如果是最後一章，添加“（完結）”
  if (pageIndex === novelPages.length - 1) {
    paragraphs += '<p class="center">（完結）<\/p>';
  }
  
  novelContent.innerHTML = `${paragraphs}`;

  // 滾動到頁面的最上方
  window.scrollTo(0, 0);
  
  function bbtn(a, col, dis){
    document.querySelectorAll(a).forEach(btn => {
        btn.style.color = col;
        btn.disabled = dis;
    });
  }

  // 更新按鈕顏色和禁用狀態
  if (currentPage === 0) {
      bbtn("#prev-btn", "gray", true);
  } else {
      bbtn("#prev-btn", "#3c429b", false);
  }

  if (currentPage === novelPages.length - 1) {
      bbtn("#next-btn", "gray", true);
  } else {
      bbtn("#next-btn", "#3c429b", false);
  }
}

function showErrorPage() {
  novelContent.innerHTML = '<p class="center">404 無此章節<button id="go-to-first">回到第一章</button><\/p>';
  document.getElementById("page").innerText = '';
  document.getElementById("go-to-first").addEventListener("click", () => {
    currentPage = 0;
    showPage(currentPage);
  });
}

let a = document.querySelector("#A");
document.querySelector("#A").onclick = () => {
    if (a.innerText === "a") {
        a.innerText = "A";
        document.getElementById('novel-content').style.fontSize = "200%";
        document.querySelector("h1").style.fontSize = "400%";
        document.querySelector("h2").style.fontSize = "234%";
    } else {
        a.innerText = "a";
        document.getElementById('novel-content').style.fontSize = "150%";
        document.querySelector("h1").style.fontSize = "300%";
        document.querySelector("h2").style.fontSize = "175%";
    }
}
