const cursorGlow = document.querySelector(".cursor-glow");

let mouseX = 0;
let mouseY = 0;

let currentX = 0;
let currentY = 0;

window.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

function animateCursor() {
  currentX += (mouseX - currentX) * 0.12;

  currentY += (mouseY - currentY) * 0.12;

  cursorGlow.style.left = `${currentX}px`;

  cursorGlow.style.top = `${currentY}px`;

  requestAnimationFrame(animateCursor);
}

animateCursor();


const interactiveElements = document.querySelectorAll(
  "button, a, .product-card",
);

interactiveElements.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    cursorGlow.classList.add("active");
  });

  element.addEventListener("mouseleave", () => {
    cursorGlow.classList.remove("active");
  });
});
