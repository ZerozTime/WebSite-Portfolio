// --- ส่วนที่ 1: นับยอดผู้เข้าชมอัตโนมัติทันทีที่เปิดเว็บ ---
fetch('https://api.countapi.xyz/hit/zeroztime-portfolio/visits')
  .then(response => response.json())
  .then(data => {
    const visitElement = document.getElementById('visit-count');
    if (visitElement) {
      visitElement.innerText = data.value.toLocaleString();
    }
  })
  .catch(error => {
    const visitElement = document.getElementById('visit-count');
    if (visitElement) {
      visitElement.innerText = 'N/A';
    }
  });


// --- ส่วนที่ 2: ฟังก์ชันเมื่อคลิกที่การ์ดโปรเจกต์ ---
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => {
    const title = card.querySelector("h3").textContent;
    console.log("Selected project:", title);
    
    // ถ้าคุณต้องการให้คลิกแล้วลิงก์ไปหน้าอื่น หรือทำอย่างอื่นต่อ สามารถใส่เพิ่มตรงนี้ได้ครับ
  });
});