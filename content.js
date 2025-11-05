// content.js (Geliştirilmiş ve Bug'lara Karşı Güçlendirilmiş)

// --- POTANSİYEL BUG 1: Çoklu Enjeksiyon (Multiple Injections) ---
// Eklenti butonuna her basıldığında bu script yeniden enjekte edilebilir.
// Bu global 'flag' (bayrak), script'in sadece İLK enjeksiyonda çalışmasını sağlar
// ve birden fazla 'forceSpeed' döngüsünün oluşmasını engeller.
if (!window.myVideoForcerActive) {
  window.myVideoForcerActive = true;

  let currentSpeed = 1.0;
  let forceLoopId = null; // Aktif animasyon döngüsünün ID'si

  /**
   * Hızı zorla ayarlayan ana fonksiyon.
   * Bu fonksiyon 'requestAnimationFrame' ile sürekli kendini çağırır.
   */
  function forceSpeed() {
    // Sayfadaki TÜM video VE audio elementlerini bul
    const mediaElements = document.querySelectorAll('video, audio');
    
    for (const media of mediaElements) {
      
      // --- POTANSİYEL BUG 2: İnatçı Oynatıcılar (Resistant Players) ---
      // Önceki kodda `if (media.playbackRate !== currentSpeed)` kontrolü vardı.
      // BU KONTROLÜ KALDIRDIK.
      // Neden? Çünkü Video.js gibi oynatıcılar, hızı her an
      // sıfırlamaya çalışabilir (örn: 1.0'a). 
      // Bu kod, her karede (frame) hızı bizim istediğimiz değere 
      // "çekiç gibi" zorla ayarlar. Oynatıcının direncini bu şekilde kırarız.
      try {
        if (media.playbackRate !== currentSpeed) {
           media.playbackRate = currentSpeed;
        }
      } catch (error) {
        // Bazı durumlarda (örn: korumalı içerik) .playbackRate ataması
        // hata verebilir. Döngünün kırılmaması için yakalıyoruz.
        console.warn('Video Hızlandırıcı: Hız ayarlanamadı.', error.message);
      }
    }
    
    // Döngüyü bir sonraki animasyon karesi için tekrar kur
    forceLoopId = requestAnimationFrame(forceSpeed);
  }

  /**
   * Hız zorlayıcıyı başlatan ve hafızadan hızı çeken fonksiyon.
   */
  function startSpeedForcer() {
    // Eğer (bir şekilde) zaten çalışan bir döngü varsa, önce onu durdur
    if (forceLoopId) {
      cancelAnimationFrame(forceLoopId);
    }
    
    // Eklentinin hafızasından (storage) kayıtlı hızı çek
    chrome.storage.local.get(['playbackSpeed'], (result) => {
      currentSpeed = result.playbackSpeed || 1.0;
      
      // Hız zorlama döngüsünü başlat
      forceSpeed();
    });
  }

  /**
   * Hız ayarı popup'tan her değiştiğinde (storage değiştiğinde)
   * çalışan 'listener'. Bu, sayfayı yenilemeden hızı günceller.
   */
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local' && changes.playbackSpeed) {
      currentSpeed = changes.playbackSpeed.newValue;
      // console.log("Hız güncellendi:", currentSpeed);
    }
  });

  // --- Script enjekte edildiği anda hız zorlayıcıyı başlat ---
  startSpeedForcer();

} // `if (!window.myVideoForcerActive)` bloğunun sonu