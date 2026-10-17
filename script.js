
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
   Requires Netlify Function:
   /.netlify/functions/visitors
======================================== */
async function loadVisitorCounter() {
  const output = document.getElementById("visitor-total");

  // ถ้าไม่มีตัวนับใน HTML ให้หยุดทำงาน
  if (!output) return;

  const endpoint = "/.netlify/functions/visitors";

  try {
    let alreadyCounted = false;

    // ตรวจสอบว่าเคยนับใน session นี้หรือยัง
    try {
      alreadyCounted =
        sessionStorage.getItem("portfolio-visited") === "1";
    } catch (error) {
      console.warn("Session storage unavailable:", error);
    }

    let response;

    if (!alreadyCounted) {
      // นับการเข้าชมครั้งแรกใน session นี้
      response = await fetch(endpoint, {
        method: "POST"
      });

      if (response.ok) {
        try {
          sessionStorage.setItem("portfolio-visited", "1");
        } catch (error) {
          console.warn("Unable to save session:", error);
        }
      }
    } else {
      // อ่านยอดเดิมโดยไม่เพิ่มจำนวน
      response = await fetch(endpoint, {
        method: "GET"
      });
    }

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    if (Number.isFinite(data.total)) {
      output.textContent = data.total.toLocaleString("en-US");
    } else {
      throw new Error("Invalid visitor count");
    }
  } catch (error) {
    console.error("Visitor counter error:", error);
    output.textContent = "Unavailable";
  }
}

// เริ่มทำงานเมื่อเปิดหน้าเว็บ
loadVisitorCounter();

/* ========================================
   NAVBAR SMOOTH SCROLL
======================================== */
document.querySelectorAll('.navbar nav a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
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
document.querySelectorAll(".project-card img, .hero-image img, .logo img")
  .forEach((img) => {
    img.addEventListener("error", () => {
      console.error("Image failed to load:", img.getAttribute("src"));
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
