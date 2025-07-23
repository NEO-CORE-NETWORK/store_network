const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    speed: Math.random() * 0.5 + 0.2
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  stars.forEach((star) => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();

    // move star
    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(draw);
}

draw();

function checkFadeOnScroll() {
  const elements = document.querySelectorAll('.fade-on-scroll');
  const windowHeight = window.innerHeight;

  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < windowHeight * 0.75 && rect.bottom > windowHeight * 0.25) {
      el.classList.remove('fade-out');
    } else {
      el.classList.add('fade-out');
    }
  });
}

window.addEventListener('scroll', checkFadeOnScroll);
window.addEventListener('resize', checkFadeOnScroll);
window.addEventListener('load', checkFadeOnScroll);

window.addEventListener("scroll", () => {
  const texts = document.querySelectorAll(".overlay-text");
  const windowHeight = window.innerHeight;

  texts.forEach((text) => {
    const rect = text.parentElement.getBoundingClientRect();
    if (rect.top < windowHeight / 2 && rect.bottom > 100) {
      text.classList.remove("fade-out");
    } else {
      text.classList.add("fade-out");
    }
  });
});
