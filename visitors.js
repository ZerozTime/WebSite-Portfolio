
const WORKSPACE = "zeroztimes-team";
const COUNTER_NAME = "visitors";

// ใส่ API Token เฉพาะกรณีที่ยอมรับความเสี่ยง
// เพราะผู้เข้าชมสามารถดู Token ในไฟล์ JavaScript ได้
const ACCESS_TOKEN = "ut_Yg1iQeSWjEZjQZtBK4oFR6JSwRs8ssHS4IHKr3R3";

async function loadVisitorCounter() {
  const output = document.getElementById("visitor-total");

  if (!output) return;

  try {
    const options = {
      workspace: WORKSPACE,
      timeout: 10000
    };

    if (
      ACCESS_TOKEN &&
      ACCESS_TOKEN !== "ut_Yg1iQeSWjEZjQZtBK4oFR6JSwRs8ssHS4IHKr3R3"
    ) {
      options.accessToken = ACCESS_TOKEN;
    }

    const counter = new Counter(options);

    let alreadyCounted = false;

    try {
      alreadyCounted =
        sessionStorage.getItem("portfolio-visited") === "1";
    } catch (error) {
      console.warn("Session storage unavailable", error);
    }

    // เพิ่มยอดเฉพาะครั้งแรกใน Session
    // ถ้าเคยนับแล้วให้อ่านยอดโดยไม่เพิ่ม
    const result = alreadyCounted
      ? await counter.get(COUNTER_NAME)
      : await counter.up(COUNTER_NAME);

    if (
      typeof result.value !== "number" ||
      !Number.isFinite(result.value)
    ) {
      throw new Error("Invalid counter value");
    }

    output.textContent =
      result.value.toLocaleString("en-US");

    if (!alreadyCounted) {
      try {
        sessionStorage.setItem("portfolio-visited", "1");
      } catch (error) {
        console.warn("Unable to save session", error);
      }
    }
  } catch (error) {
    console.error("CounterAPI error:", error);
    output.textContent = "Unavailable";
  }
}

document.addEventListener(
  "DOMContentLoaded",
  loadVisitorCounter
);
