document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("banner");

  // Инициализация математических символов на фоне
  initMathBackground();

  // Обработчик клика для конфетти
  banner.addEventListener("click", handleBannerClick);

  // Автоматический запуск конфетти через 3 секунды
  setTimeout(launchAutoConfetti, 3000);
});

function initMathBackground() {
  const symbols = [
    "∫",
    "∑",
    "∏",
    "∂",
    "∇",
    "√",
    "∞",
    "π",
    "≈",
    "≠",
    "≤",
    "≥",
    "∈",
  ];
  const banner = document.getElementById("banner");

  for (let i = 0; i < 40; i++) {
    const symbol = document.createElement("div");
    symbol.className = "math-symbol";
    symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    symbol.style.left = `${Math.random() * 100}%`;
    symbol.style.top = `${Math.random() * 100}%`;
    symbol.style.transform = `rotate(${Math.random() * 360}deg)`;
    symbol.style.opacity = Math.random() * 0.3;
    symbol.style.fontSize = `${20 + Math.random() * 20}px`;
    banner.appendChild(symbol);
  }
}

function handleBannerClick(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  for (let i = 0; i < 50; i++) {
    createConfetti(x, y);
  }
}

// Обновленная функция создания конфетти
function createConfetti(x, y) {
  const shapes = ["circle", "rect"];
  const colors = [
    "#FFD700",
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#F033FF",
    "#33FFF0",
  ];

  const confetti = document.createElement("div");
  confetti.className = "confetti";
  confetti.style.backgroundColor =
    colors[Math.floor(Math.random() * colors.length)];
  confetti.style.left = `${x}px`;
  confetti.style.top = `${y}px`;

  // Разные формы конфетти
  const shape = shapes[Math.round(Math.random() * (shapes.length-1))];
  if (shape === "circle") {
    confetti.style.borderRadius = "50%";
  } else {
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
  }

  // Размеры
  const size = 6 + Math.random() * 10;
  confetti.style.width = `${size}px`;
  confetti.style.height = `${size}px`;

  document.getElementById("banner").appendChild(confetti);

  // Анимация
  const angle = Math.random() * Math.PI * 2;
  const velocity = 2 + Math.random() * 4;
  const rotationSpeed = (Math.random() - 0.5) * 30;
  let rotation = 0;

  let posX = x;
  let posY = y;
  let opacity = 1;

  const animate = () => {
    posX += Math.cos(angle) * velocity;
    posY += Math.sin(angle) * velocity + 1.5;
    opacity -= 0.01;
    rotation += rotationSpeed;

    confetti.style.left = `${posX}px`;
    confetti.style.top = `${posY}px`;
    confetti.style.opacity = opacity;
    confetti.style.transform = `rotate(${rotation}deg)`;

    if (opacity > 0 && posY < document.getElementById("banner").offsetHeight) {
      requestAnimationFrame(animate);
    } else {
      confetti.remove();
    }
  };

  requestAnimationFrame(animate);
}

function launchAutoConfetti() {
  const banner = document.getElementById("banner");
  const bannerWidth = banner.offsetWidth;
  const bannerHeight = banner.offsetHeight;

  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      createConfetti(
        Math.random() * bannerWidth,
        Math.random() * bannerHeight * 0.3
      );
    }, i * 100);
  }
}
