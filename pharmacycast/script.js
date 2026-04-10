let currentUtterance = null;
let playingId = null;
let viVoice = null;
const speechSupported = "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;

function loadVietnameseVoice() {
    if (!speechSupported) {
        return;
    }

    const voices = window.speechSynthesis.getVoices();
    viVoice = voices.find((voice) => voice.lang === "vi-VN" || voice.lang.includes("vi"));
}

if (speechSupported && window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVietnameseVoice;
}

loadVietnameseVoice();

function togglePlay(trackId) {
    const trackElement = document.getElementById(trackId);
    const scriptText = trackElement.getAttribute("data-script");
    const title = trackElement.getAttribute("data-title") || "Bài đang phát";
    const statusElement = document.getElementById("nowPlaying");

    if (!speechSupported) {
        statusElement.innerHTML = "Trình duyệt không hỗ trợ đọc văn bản. <strong>Vui lòng dùng Chrome, Edge hoặc Safari mới.</strong>";
        return;
    }

    if (playingId === trackId && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        resetAllTracks();
        return;
    }

    window.speechSynthesis.cancel();
    resetAllTracks();

    currentUtterance = new SpeechSynthesisUtterance(scriptText);
    currentUtterance.lang = "vi-VN";

    if (viVoice) {
        currentUtterance.voice = viVoice;
    } else {
        console.warn("Không tìm thấy gói giọng nói Tiếng Việt trên thiết bị này.");
    }

    currentUtterance.rate = 1.0;

    currentUtterance.onend = function() {
        resetAllTracks();
    };

    currentUtterance.onerror = function() {
        resetAllTracks();
    };

    window.speechSynthesis.speak(currentUtterance);

    trackElement.classList.add("is-playing");
    trackElement.querySelector(".track-duration").innerText = "⏹ Dừng";
    statusElement.innerHTML = "Đang phát: <strong>" + title + "</strong>";
    playingId = trackId;
}

function resetAllTracks() {
    document.querySelectorAll(".track").forEach((track) => {
        track.classList.remove("is-playing");
        track.querySelector(".track-duration").innerText = "▶ Phát";
    });

    const statusElement = document.getElementById("nowPlaying");
    statusElement.innerHTML = "Sẵn sàng phát: <strong>Chọn một chủ đề bên dưới</strong>";
    playingId = null;
}

function initQRCode() {
    const qrImage = document.getElementById("qrImage");
    const qrHint = document.getElementById("qrHint");
    const currentUrl = window.location.href;
    const isFileProtocol = window.location.protocol === "file:";
    const isLocalhost = ["localhost", "127.0.0.1"].includes(window.location.hostname);

    if (isFileProtocol) {
        qrHint.textContent = "Bạn đang mở file trực tiếp trên máy tính (file://), điện thoại không truy cập được. Hãy chạy qua web server và dùng URL LAN.";
        qrImage.alt = "Không thể tạo QR truy cập từ điện thoại khi đang mở file local.";
        return;
    }

    if (isLocalhost) {
        qrHint.textContent = "URL hiện tại là localhost nên điện thoại không mở được. Hãy dùng địa chỉ LAN dạng http://192.168.x.x:port/cast.html.";
    }

    const encodedUrl = encodeURIComponent(currentUrl);
    const primaryQrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&color=0f8053&bgcolor=f7fbf9&data=" + encodedUrl;
    const fallbackQrUrl = "https://chart.googleapis.com/chart?cht=qr&chs=150x150&chl=" + encodedUrl;

    qrImage.onerror = function() {
        if (qrImage.dataset.fallbackTried === "1") {
            qrImage.alt = "Không tải được mã QR. Hãy mở URL này trên điện thoại: " + currentUrl;
            return;
        }

        qrImage.dataset.fallbackTried = "1";
        qrImage.src = fallbackQrUrl;
    };

    qrImage.src = primaryQrUrl;
}

document.addEventListener("DOMContentLoaded", initQRCode);
