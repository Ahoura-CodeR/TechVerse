const glow = document.querySelector(".cursor-glow");

if (glow) {
  let targetX = 0;
  let targetY = 0;
  let x = 0;
  let y = 0;
  window.addEventListener("mousemove", (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
    if (!glow.classList.contains("visible")) {
      // Start under the pointer instead of sliding in from the corner.
      x = targetX;
      y = targetY;
      glow.classList.add("visible");
    }
  });

  // Hovered elements can live inside shadow roots, so check the whole event path.
  document.addEventListener("pointerover", (event) => {
    const interactive = event
      .composedPath()
      .some((node) => node.matches?.("button, a, .product-card"));
    glow.classList.toggle("active", interactive);
  });

  const follow = () => {
    x += (targetX - x) * 0.12;
    y += (targetY - y) * 0.12;
    glow.style.left = `${x}px`;
    glow.style.top = `${y}px`;
    requestAnimationFrame(follow);
  };
  follow();
}
