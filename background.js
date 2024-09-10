// 存儲激勵內容的數組
const inspirations = [
  { type: "quote", content: "成功不是最終目標,失敗也不是致命的:重要的是繼續前進的勇氣。" },
  { type: "quote", content: "生活中最重要的不是境遇,而是你看待境遇的態度。" },
  // ... 添加更多名言和圖片URL
];

// 監聽新標籤頁的創建
chrome.tabs.onCreated.addListener((tab) => {
  console.log("New tab created:", tab.pendingUrl);
  if (tab.pendingUrl === "chrome://newtab/") {
    console.log("Showing inspiration for new tab");
    showInspiration();
  }
});

function showInspiration() {
  console.log("showInspiration function called");
  const inspiration = inspirations[Math.floor(Math.random() * inspirations.length)];
  
  console.log("Selected inspiration:", inspiration);

  chrome.notifications.create({
    type: "basic",
    iconUrl: "icon.png",
    title: "每日靈感",
    message: inspiration.content
  }, (notificationId) => {
    if (chrome.runtime.lastError) {
      console.error("Notification error:", chrome.runtime.lastError);
    } else {
      console.log("Notification created with ID:", notificationId);
    }
  });
}

// 添加一個測試函數
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
  checkNotificationPermission();
});

// 在文件頂部添加這個函數
function checkNotificationPermission() {
  chrome.notifications.getPermissionLevel((level) => {
    console.log("Notification permission level:", level);
    if (level === 'granted') {
      showInspiration();
    } else {
      console.log("Notifications are not enabled for this extension");
    }
  });
}
