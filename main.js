// main.js
// Controller da interface.

import { Transformacoes2D } from "./transformacoes/Transformacoes2D.js";
import { Transformacoes3D } from "./transformacoes/Transformacoes3D.js";

// ===== Tema (claro/escuro)
const body = document.body;
const toggleTemaBtn = document.getElementById("toggle-tema");
function atualizaTextoTema() {
  const escuroAtivo = body.classList.contains("modo-escuro");
  toggleTemaBtn.textContent = escuroAtivo ? "Modo claro" : "Modo escuro";
}
toggleTemaBtn.addEventListener("click", () => {
  body.classList.toggle("modo-escuro");
  atualizaTextoTema();
});
atualizaTextoTema();

// ===== Tabs simples (2D/3D)
const tabBtns = document.querySelectorAll(".tab-btn");
tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    tabBtns.forEach(b => b.classList.remove("ativo"));
    btn.classList.add("ativo");
    document.querySelectorAll("section.card").forEach(sec => sec.style.display = "none");
    document.querySelector(btn.dataset.alvo).style.display = "block";
  });
});

// ===== Helpers
function criaInputNumero(id, label, valor = 0, step = "any") {
  const wrap = document.createElement("div");
  wrap.className = "linha";
  const lab = document.createElement("label");
  lab.textContent = label + ":";
  lab.setAttribute("for", id);
  const inp = document.createElement("input");
  inp.type = "number";
  inp.step = step;
  inp.value = valor;
  inp.id = id;
  wrap.appendChild(lab);
  wrap.appendChild(inp);
  return { wrap, input: inp };
}

function limpar(el) { while (el.firstChild) el.removeChild(el.firstChild); }

// ===== Painel 2D
const x2d = document.getElementById("x2d");
const y2d = document.getElementById("y2d");
const op2d = document.getElementById("op2d");
const params2d = document.getElementById("params2d");
const saida2d = document.getElementById("saida2d");

function renderParams2D() {
  limpar(params2d);
  const op = op2d.value;
  if (op === "Transladar2D") {
    const dx = criaInputNumero("dx2d", "dx", 1);
    const dy = criaInputNumero("dy2d", "dy", 1);
    params2d.append(dx.wrap, dy.wrap);
  } else if (op === "Rotacionar2D") {
    const ang = criaInputNumero("ang2d", "Ângulo (graus)", 45);
    params2d.append(ang.wrap);
  } else if (op === "Cisalhar2D") {
    const kx = criaInputNumero("kx2d", "kx", 1);
    const ky = criaInputNumero("ky2d", "ky", 0);
    params2d.append(kx.wrap, ky.wrap);
  } else {
    const dica = document.createElement("small");
    dica.textContent = "Sem parâmetros.";
    params2d.appendChild(dica);
  }
}
op2d.addEventListener("change", renderParams2D);
renderParams2D();

document.getElementById("aplicar2d").addEventListener("click", () => {
  const v = [parseFloat(x2d.value), parseFloat(y2d.value)];
  const op = op2d.value;
  let res;
  try {
    switch (op) {
      case "Transladar2D": {
        const dx = parseFloat(document.getElementById("dx2d").value);
        const dy = parseFloat(document.getElementById("dy2d").value);
        res = Transformacoes2D.Transladar2D(v, dx, dy);
        break;
      }
      case "Rotacionar2D": {
        const ang = parseFloat(document.getElementById("ang2d").value);
        res = Transformacoes2D.Rotacionar2D(v, ang);
        break;
      }
      case "Refletir2DEixoX":
        res = Transformacoes2D.Refletir2DEixoX(v); break;
      case "Refletir2DEixoY":
        res = Transformacoes2D.Refletir2DEixoY(v); break;
      case "Projetar2DEixoX":
        res = Transformacoes2D.Projetar2DEixoX(v); break;
      case "Projetar2DEixoY":
        res = Transformacoes2D.Projetar2DEixoY(v); break;
      case "Cisalhar2D": {
        const kx = parseFloat(document.getElementById("kx2d").value);
        const ky = parseFloat(document.getElementById("ky2d").value);
        res = Transformacoes2D.Cisalhar2D(v, kx, ky);
        break;
      }
      default: throw new Error("Operação 2D inválida.");
    }
    saida2d.textContent = `[ ${res.map(n => Number(n.toFixed(6))).join(", ")} ]`;
  } catch (e) {
    saida2d.textContent = "Erro: " + e.message;
  }
});

// ===== Painel 3D
const x3d = document.getElementById("x3d");
const y3d = document.getElementById("y3d");
const z3d = document.getElementById("z3d");
const op3d = document.getElementById("op3d");
const params3d = document.getElementById("params3d");
const saida3d = document.getElementById("saida3d");

function renderParams3D() {
  limpar(params3d);
  const op = op3d.value;
  if (op === "Transladar3D") {
    const dx = criaInputNumero("dx3d", "dx", 1);
    const dy = criaInputNumero("dy3d", "dy", 2);
    const dz = criaInputNumero("dz3d", "dz", -1);
    params3d.append(dx.wrap, dy.wrap, dz.wrap);
  } else if (op.startsWith("Rotacionar3DEixo")) {
    const ang = criaInputNumero("ang3d", "Ângulo (graus)", 90);
    params3d.append(ang.wrap);
  } else {
    const dica = document.createElement("small");
    dica.textContent = "Sem parâmetros.";
    params3d.appendChild(dica);
  }
}
op3d.addEventListener("change", renderParams3D);
renderParams3D();

document.getElementById("aplicar3d").addEventListener("click", () => {
  const v = [parseFloat(x3d.value), parseFloat(y3d.value), parseFloat(z3d.value)];
  const op = op3d.value;
  let res;
  try {
    switch (op) {
      case "Transladar3D": {
        const dx = parseFloat(document.getElementById("dx3d").value);
        const dy = parseFloat(document.getElementById("dy3d").value);
        const dz = parseFloat(document.getElementById("dz3d").value);
        res = Transformacoes3D.Transladar3D(v, dx, dy, dz);
        break;
      }
      case "Rotacionar3DEixoX": {
        const ang = parseFloat(document.getElementById("ang3d").value);
        res = Transformacoes3D.Rotacionar3DEixoX(v, ang);
        break;
      }
      case "Rotacionar3DEixoY": {
        const ang = parseFloat(document.getElementById("ang3d").value);
        res = Transformacoes3D.Rotacionar3DEixoY(v, ang);
        break;
      }
      case "Rotacionar3DEixoZ": {
        const ang = parseFloat(document.getElementById("ang3d").value);
        res = Transformacoes3D.Rotacionar3DEixoZ(v, ang);
        break;
      }
      case "Refletir3DEixoX":
        res = Transformacoes3D.Refletir3DEixoX(v); break;
      case "Refletir3DEixoY":
        res = Transformacoes3D.Refletir3DEixoY(v); break;
      case "Refletir3DEixoZ":
        res = Transformacoes3D.Refletir3DEixoZ(v); break;
      case "Projetar3DEixoX":
        res = Transformacoes3D.Projetar3DEixoX(v); break;
      case "Projetar3DEixoY":
        res = Transformacoes3D.Projetar3DEixoY(v); break;
      case "Projetar3DEixoZ":
        res = Transformacoes3D.Projetar3DEixoZ(v); break;
      default: throw new Error("Operação 3D inválida.");
    }
    saida3d.textContent = `[ ${res.map(n => Number(n.toFixed(6))).join(", ")} ]`;
  } catch (e) {
    saida3d.textContent = "Erro: " + e.message;
  }
});
