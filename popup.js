// popup.js

// Popup açıldığında kayıtlı hızı input'a yükle
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get(['playbackSpeed'], (result) => {
    document.getElementById('speedInput').value = result.playbackSpeed || 1.0;
  });
});

// Butona tıklandığında
document.getElementById('setSpeedButton').addEventListener('click', () => {
  const speed = parseFloat(document.getElementById('speedInput').value);
  
  // Hızı eklentinin hafızasına kaydet
  chrome.storage.local.set({ playbackSpeed: speed }, () => {
    
    // Aktif sekmeyi bul
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // content.js dosyasını o sekmeye enjekte et (veya çalıştır)
        chrome.scripting.executeScript({
        target: { tabId: tabs[0].id, allFrames: true }, // <-- "allFrames: true" eklendi
        files: ['content.js']
      });
    });
  });
});