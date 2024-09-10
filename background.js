// 存儲激勵內容的數組
const inspirations = [
  { type: "quote", content: "成功不是最終目標,失敗也不是致命的:重要的是繼續前進的勇氣。" },
  { type: "quote", content: "生活中最重要的不是境遇,而是你看待境遇的態度。" },
  { type: "quote", content: "成功不是終點，失敗也不是致命的，最重要的是持續的勇氣。" },
  { type: "quote", content: "生命的價值不在於擁有多少，而在於如何感受並珍惜每一刻。" },
  { type: "quote", content: "你的心態決定了你看到的世界。" },
  { type: "quote", content: "逆境並非阻礙，而是通往成功的階梯。" },
  { type: "quote", content: "真正的成長來自於克服困難，而非逃避它們。" },
  { type: "quote", content: "幸福不是來自外在的條件，而是來自內心的選擇。" },
  { type: "quote", content: "每一次跌倒，都是下一次站起的機會。" },
  { type: "quote", content: "命運由你掌握，不是由它決定你。" },
  { type: "quote", content: "勇氣不是沒有恐懼，而是即使恐懼仍然前進。" },
  { type: "quote", content: "不完美才是真實的美，接受自我是幸福的開始。" },
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
    title: "暖心小語",
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
