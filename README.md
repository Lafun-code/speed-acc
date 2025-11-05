# Force Playback Speed Extension

A lightweight browser extension for Chrome, Edge, and other Chromium browsers that gives you precise control over video playback speed. It's designed to forcefully override stubborn video players and bypass the browser's native 16x speed limit.

(https://i.imgur.com/7sopQtg.png)

## 🚀 The Problem

Many websites or e-learning platforms (like university portals) use custom video players (e.g., Video.js) that:
1.  Hide or disable the default speed controls.
2.  Constantly reset the playback speed to `1.0x`.
3.  Are limited by the browser's native maximum speed (usually `16x`).

This extension solves all three problems.

## ✨ Features

* **Force Override:** Persistently applies the desired speed using `requestAnimationFrame`. This ensures the speed stays set, even if the website's own scripts try to change it back.
* **Bypass 16x Limit:** Set speeds far beyond the browser's default maximum (e.g., `100x` or `1000x`).
* **Time-Skipping:** For any speed set above `16x`, the extension automatically enables "time-skipping" (manipulating `currentTime`) to achieve ultra-fast fast-forwarding.
* **Simple UI:** A clean popup to enter your desired speed.
* **Broad Compatibility:** Works on most HTML5 `<video>` and `<audio>` elements.
* **Iframe Support:** Injects into all frames, so it works on most embedded videos.

## 🛠️ Installation (Manual)

Since this is not on the Chrome Web Store, you must load it as an "unpacked extension":

1.  **Download:** Download or clone this repository to a local folder on your computer.
2.  **Open Extensions Page:** Open your browser's extensions page:
    * Chrome: `chrome://extensions`
    * Microsoft Edge: `edge://extensions`
3.  **Enable Developer Mode:** Find and turn on the "Developer mode" toggle (usually in the top-right or bottom-left corner).
4.  **Load Unpacked:** Click the "Load unpacked" button.
5.  **Select Folder:** Select the folder where you saved the extension files (e.g., `VideoHizlandirici`).

The extension icon will now appear in your browser's toolbar.

## 💡 How to Use

1.  Play a video on any webpage.
2.  Click the extension's icon in your toolbar.
3.  Enter your desired speed (e.g., `2.5`, `10`, `100`).
4.  Click the "Set Speed" button.
5.  The video will immediately adjust to the new speed.

## License

This project is open-source and available under the [MIT License](LICENSE).
