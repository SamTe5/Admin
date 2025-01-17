function startCountdown() {
    const timerElement = document.getElementById("timer");
    const targetDate = new Date("2025-04-06T00:00:00Z"); // Hedef tarih (UTC)

    function updateCountdown() {
        const currentTime = new Date();
        const timeRemaining = targetDate - currentTime;

        if (timeRemaining <= 0) {
            timerElement.textContent = "Süre doldu!";
            return;
        }

        // Gün, saat, dakika, saniye hesapla
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        // Ekrana yazdır
        timerElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    setInterval(updateCountdown, 1000);
}

// Başlat
startCountdown();


async function startCountdownFromAPI() {
    const timerElement = document.getElementById("timer");
    const apiUrl = "http://worldtimeapi.org/api/timezone/Etc/UTC"; // UTC saati çekmek için API

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const currentDate = new Date(data.datetime); // İnternetten alınan mevcut tarih
        const targetDate = new Date("2025-04-06T00:00:00Z"); // Sabit hedef tarih (UTC)

        function updateCountdown() {
            const currentTime = new Date();
            const timeRemaining = targetDate - currentTime;

            if (timeRemaining <= 0) {
                timerElement.textContent = "Süre doldu!";
                return;
            }

            // Gün, saat, dakika, saniye hesapla
            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            timerElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }

        // Her saniye geri sayımı güncelle
        setInterval(updateCountdown, 1000);
    } catch (error) {
        timerElement.textContent = " ";
        console.error("API Hatası:", error);
    }
}



// Tüm .cCImg ve .cardImg sınıfına sahip öğeleri seç
const cCImgElements = document.querySelectorAll(".cCImg");
const cardImgElements = document.querySelectorAll(".cardImg");

// Intersection Observer API ile gözlemci oluştur
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible"); // Göründüğünde animasyonu başlat
            } else {
                entry.target.classList.remove("visible"); // Görünmediğinde başlangıç durumuna döner
            }
        });
    },
    { threshold: 0.5 } // Öğenin %50'si görünür olduğunda tetiklenir
);

// .cCImg öğelerini gözlemle
cCImgElements.forEach((element) => observer.observe(element));

// .cardImg öğelerini gözlemle
cardImgElements.forEach((element) => observer.observe(element));

// Eğer başka işleve gerek yoksa bu kadarı yeterli.

// Başlat
startCountdownFromAPI();
