document.addEventListener('DOMContentLoaded', function() {
  var checkbox = document.getElementById('enableNotifications');
  
  // 載入保存的設置
  chrome.storage.sync.get('enableNotifications', function(data) {
    checkbox.checked = data.enableNotifications !== false;
  });
  
  // 保存設置變更
  checkbox.addEventListener('change', function() {
    chrome.storage.sync.set({enableNotifications: checkbox.checked});
  });
});
