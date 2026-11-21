
/* ========================================
   ZEROZTIME PORTFOLIO
   MAIN JAVASCRIPT
======================================== */


/* ========================================
   PROJECT CARD CLICK
======================================== */

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => {
    const title = card.querySelector("h3")?.textContent?.trim();

    if (title) {
      console.log("Selected project:", title);
    }
  });
});


/* ========================================
   VISITOR COUNTER
   
======================================== */


async function loadVisitorCounter() {
  const output = document.getElementById("visitor-total");

  if (!output) return;

  const endpoint = "visitors.js";
  let alreadyCounted = false;

  try {
    alreadyCounted =
      sessionStorage.getItem("portfolio-visited") === "1";
  } catch (error) {
    console.warn("Session storage unavailable:", error);
  }

  try {
    const response = await fetch(endpoint, {
      method: alreadyCounted ? "GET" : "POST"
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    const total = data.total;

    if (typeof total !== "number" || !Number.isFinite(total)) {
      throw new Error("Invalid visitor count");
    }

    output.textContent = total.toLocaleString("en-US");

    if (!alreadyCounted) {
      try {
        sessionStorage.setItem("portfolio-visited", "1");
      } catch (error) {
        console.warn("Unable to save session:", error);
      }
    }
  } catch (error) {
    console.error("Visitor counter error:", error);
    output.textContent = "Unavailable";
  }
}

document.addEventListener("DOMContentLoaded", loadVisitorCounter);


// เริ่มทำงานเมื่อเปิดหน้าเว็บ
loadVisitorCounter();


/* ========================================
   NAVBAR SMOOTH SCROLL
======================================== */

document
  .querySelectorAll('.navbar nav a[href^="#"]')
  .forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      // ป้องกัน href="#" ที่ไม่มีปลายทาง
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });


/* ========================================
   PROJECT IMAGE ERROR HANDLING
======================================== */

document
  .querySelectorAll(
    ".project-card img, .hero-image img, .logo img"
  )
  .forEach((img) => {
    img.addEventListener("error", () => {
      console.error(
        "Image failed to load:",
        img.getAttribute("src")
      );
    });
  });


/* ========================================
   CONSOLE MESSAGE
======================================== */

console.log(
  "%c ZEROZTIME PORTFOLIO ",
  "background:#ff303e;color:#fff;font-size:16px;font-weight:bold;padding:8px;"
);

console.log("Portfolio JavaScript loaded successfully.");


/* ========================================
   ZEROZTIME MUSIC PLAYER
======================================== */

const bgMusic = document.getElementById("bg-music");
const musicToggle = document.getElementById("music-toggle");
const musicIcon = document.getElementById("music-icon");
const musicVolume = document.getElementById("music-volume");
const musicPlayer = document.getElementById("music-player");

if (bgMusic && musicToggle && musicIcon && musicPlayer) {
  // ตั้งเสียงเริ่มต้น 25%
  bgMusic.volume = 0.25;

  // อัปเดตหน้าตาปุ่มเล่นเพลง
  function updateMusicUI(isPlaying) {
    musicPlayer.classList.toggle("is-playing", isPlaying);

    musicIcon.textContent = isPlaying ? "Ⅱ" : "▶";

    musicToggle.setAttribute(
      "aria-label",
      isPlaying ? "Pause music" : "Play music"
    );

    musicToggle.setAttribute(
      "aria-pressed",
      String(isPlaying)
    );
  }

  // ปุ่มเล่น / หยุดเพลง
  musicToggle.addEventListener("click", async () => {
    if (bgMusic.paused) {
      try {
        await bgMusic.play();
        updateMusicUI(true);
      } catch (error) {
        console.error("Music playback failed:", error);
        updateMusicUI(false);

        alert(
          "เล่นเพลงไม่ได้ กรุณาตรวจสอบไฟล์ Impure Desire.mp3"
        );
      }
    } else {
      bgMusic.pause();
      updateMusicUI(false);
    }
  });

  // ปรับระดับเสียง
  if (musicVolume) {
    musicVolume.addEventListener("input", () => {
      bgMusic.volume =
        Number(musicVolume.value) / 100;
    });
  }

  // อัปเดตสถานะเมื่อเพลงเล่นหรือหยุด
  bgMusic.addEventListener("play", () => {
    updateMusicUI(true);
  });

  bgMusic.addEventListener("pause", () => {
    updateMusicUI(false);
  });

  bgMusic.addEventListener("ended", () => {
    updateMusicUI(false);
  });

  // ตั้งสถานะเริ่มต้น
  updateMusicUI(false);
}

/* ========================================
   HERO IMAGE AUTO SLIDESHOW
======================================== */

const heroSlideshow = document.getElementById("hero-slideshow");

const heroImages = [
  "Zhou Fan Magic Emperor.jfif",
  "Zhuo Fan.jfif",
  "Zhuo Yi-Fan DEMONIC EMPEROR (1).jfif",
  "Magic Emperor.jfif"
];

let currentHeroImage = 0;

if (heroSlideshow && heroImages.length > 1) {
  // เปลี่ยนภาพทุก 3 วินาที
  setInterval(() => {
    heroSlideshow.classList.add("fade-out");

    setTimeout(() => {
      currentHeroImage =
        (currentHeroImage + 1) % heroImages.length;

      const nextImage = new Image();

      nextImage.onload = () => {
        heroSlideshow.src = heroImages[currentHeroImage];
        heroSlideshow.classList.remove("fade-out");
      };

      nextImage.onerror = () => {
        console.error(
          "ไม่พบรูปภาพ:",
          heroImages[currentHeroImage]
        );

        heroSlideshow.classList.remove("fade-out");
      };

      nextImage.src = heroImages[currentHeroImage];
    }, 600);
  }, 3000);
}
