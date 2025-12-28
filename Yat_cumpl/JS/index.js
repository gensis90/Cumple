// ================= CONFIG =================
let n = 3;
let modoFondo = "letras";

const texto = document.getElementById("texto");
const img1 = document.getElementById("img1");

const canvas = document.getElementById("fondo");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ================= MATRIZ =================
const frase = "TE   AMO";
const letras = frase.split("");
const fontSize = 16;
const columnas = Math.floor(canvas.width / fontSize);
const caidas = Array(columnas).fill(0).map(() => Math.random() * canvas.height);

function dibujarMatriz() {
  ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#256B34";
  ctx.font = fontSize + "px monospace";

  caidas.forEach((y, i) => {
    ctx.fillText(letras[Math.floor(Math.random() * letras.length)], i * fontSize, y);
    caidas[i] = y > canvas.height ? 0 : y + fontSize;
  });
}

// ================= ESTRELLAS VISIBLES =================
const estrellas = Array.from({ length: 120 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  size: Math.random() * 6 + 6
}));

// ================= CORAZONES =================
const corazones = Array.from({ length: 35 }, () => ({
  x: Math.random() * canvas.width,
  y: canvas.height + Math.random() * canvas.height,
  speed: Math.random() * 0.6 + 0.3
}));

function dibujarEstrellasYCorazones() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // ⭐ ESTRELLAS (CRUCES BLANCAS — IMPOSIBLE QUE NO SE VEAN)
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;

  estrellas.forEach(e => {
    ctx.beginPath();
    ctx.moveTo(e.x - e.size, e.y);
    ctx.lineTo(e.x + e.size, e.y);
    ctx.moveTo(e.x, e.y - e.size);
    ctx.lineTo(e.x, e.y + e.size);
    ctx.stroke();
  });

  // ❤️ CORAZONES
  ctx.font = "16px Arial";
  ctx.textAlign = "center";

  corazones.forEach(c => {
    ctx.fillText("❤️", c.x, c.y);
    c.y -= c.speed;
    if (c.y < -20) {
      c.y = canvas.height + 20;
      c.x = Math.random() * canvas.width;
    }
  });
}

// ================= LOOP =================
function animar() {
  modoFondo === "letras" ? dibujarMatriz() : dibujarEstrellasYCorazones();
  requestAnimationFrame(animar);
}
animar();

// ================= TEXTO =================
function mostrarTexto(t, ms) {
  setTimeout(() => {
    texto.style.opacity = 0;
    setTimeout(() => {
      texto.textContent = t;
      texto.style.opacity = 1;
    }, 300);
  }, ms);
}

// ================= CARTA =================
const carta = document.createElement("div");
carta.textContent = "💌";
Object.assign(carta.style, {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontSize: "80px",
  display: "none",
  cursor: "pointer",
  zIndex: 20
});
document.body.appendChild(carta);

const textoCarta = document.createElement("div");
textoCarta.innerHTML = "TE AMO MI AMORCITA, PRECIOSA ❤️<br><br>YATZI ✨";
Object.assign(textoCarta.style, {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "rgba(0,0,0,0.85)",
  color: "white",
  padding: "25px",
  borderRadius: "15px",
  display: "none",
  zIndex: 21
});
document.body.appendChild(textoCarta);

carta.onclick = () => {
  carta.style.display = "none";
  textoCarta.style.display = "block";
};

// ================= SECUENCIA =================
const intervalo = setInterval(() => {
  if (n > 1) {
    texto.textContent = --n;
  } else {
    clearInterval(intervalo);

    mostrarTexto("FELIIIZ", 0);
    mostrarTexto("CUMPLEAÑOOOOS", 1000);
    mostrarTexto("MIIIII", 2000);
    mostrarTexto("VIDAAAAAA", 3000);
    mostrarTexto("❤️❤️❤️", 4000);

    setTimeout(() => {
      texto.style.display = "none";
      modoFondo = "estrellas";
      img1.style.display = "block";
    }, 5200);

    setTimeout(() => {
      carta.style.display = "block";
    }, 9500);
  }
}, 1000);

// ================= RESIZE =================
window.onresize = () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
};0