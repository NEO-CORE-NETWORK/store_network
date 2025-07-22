const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 150; // 🔧 ลดจำนวนดาวให้น้อยลง
let centerX = window.innerWidth / 2;
let centerY = window.innerHeight / 2;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function initStars() {
  stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: (Math.random() - 0.5) * canvas.width * 2, // 🔧 กระจายกว้างขึ้น
      y: (Math.random() - 0.5) * canvas.height * 2,
      z: Math.random() * canvas.width
    });
  }
}

function drawStars() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < numStars; i++) {
    let star = stars[i];

    star.z -= 0.3; // 🔧 ช้าลง

    if (star.z <= 0) {
      star.z = canvas.width;
      star.x = (Math.random() - 0.5) * canvas.width * 2;
      star.y = (Math.random() - 0.5) * canvas.height * 2;
    }

    let k = 128.0 / star.z;
    let px = star.x * k + centerX;
    let py = star.y * k + centerY;

    if (px >= 0 && px < canvas.width && py >= 0 && py < canvas.height) {
      let size = (1 - star.z / canvas.width) * 1.8; // 🔧 ลดขนาดดาว
      ctx.beginPath();
      ctx.arc(px, py, size, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
    }
  }

  requestAnimationFrame(drawStars);
}

window.onresize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  centerX = canvas.width / 2;
  centerY = canvas.height / 2;
  initStars();
};

initStars();
drawStars();
