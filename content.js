// 設定字體大小和行間距的函數
function adjustFontSize(size) {
    document.body.style.fontSize = size + 'px';
    document.body.style.lineHeight = '1.5'; // 可根據需求調整
}

// 監聽來自 popup 的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received message:", request); // 添加日誌輸出
    if (request.action === "setFontSize") {
        adjustFontSize(request.size);
    }
});
