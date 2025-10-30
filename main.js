// Arquivo principal da interface.

import { Tranformations } from "./transformation/transformation.js";

// Alternância de tema claro/escuro.
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

// Controle das abas 2D e 3D.
const tabBtns = document.querySelectorAll(".tab-btn");
tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    tabBtns.forEach(b => b.classList.remove("ativo"));
    btn.classList.add("ativo");
    document.querySelectorAll("section.card").forEach(sec => {
      sec.style.display = "none";
    });
    document.querySelector(btn.dataset.alvo).style.display = "block";
  });
});

// Funções auxiliares para montar inputs.
function criaCampoNumero(id, label, valor = 0, step = "any") {
  const wrapper = document.createElement("div");
  wrapper.className = "campo";

  const lab = document.createElement("label");
  lab.textContent = label;
  lab.setAttribute("for", id);

  const input = document.createElement("input");
  input.type = "number";
  input.step = step;
  input.value = valor;
  input.id = id;

  wrapper.append(lab, input);
  return { wrapper, input };
}

function limpar(elemento) {
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
  }
}

function formatarVetor(resultado) {
  return `[ ${resultado.map(n => Number(n.toFixed(6))).join(", ")} ]`;
}

// Fluxo específico do painel 2D.
const x2d = document.getElementById("x2d");
const y2d = document.getElementById("y2d");
const op2d = document.getElementById("op2d");
const params2d = document.getElementById("params2d");
const saida2d = document.getElementById("saida2d");

function renderParams2D() {
  limpar(params2d);
  const op = op2d.value;

  if (op === "translate2D") {
    const dx = criaCampoNumero("dx2d", "Δx", 1);
    const dy = criaCampoNumero("dy2d", "Δy", 1);
    params2d.append(dx.wrapper, dy.wrapper);
  } else if (op === "roration2D") {
    const ang = criaCampoNumero("ang2d", "Ângulo (graus)", 45);
    params2d.append(ang.wrapper);
  } else if (op === "shearing") {
    const kx = criaCampoNumero("kx2d", "Fator kx", 1);
    const ky = criaCampoNumero("ky2d", "Fator ky", 0);
    params2d.append(kx.wrapper, ky.wrapper);
  } else {
    const dica = document.createElement("small");
    dica.textContent = "Sem parâmetros adicionais.";
    params2d.appendChild(dica);
  }
}

op2d.addEventListener("change", renderParams2D);
renderParams2D();

document.getElementById("aplicar2d").addEventListener("click", () => {
  const vetor = [parseFloat(x2d.value), parseFloat(y2d.value)];
  const op = op2d.value;
  let resultado;

  try {
    switch (op) {
      case "translate2D": {
        const dx = parseFloat(document.getElementById("dx2d").value);
        const dy = parseFloat(document.getElementById("dy2d").value);
        resultado = Tranformations.translate2D(vetor, dx, dy);
        break;
      }
      case "roration2D": {
        const ang = parseFloat(document.getElementById("ang2d").value);
        resultado = Tranformations.roration2D(vetor, ang);
        break;
      }
      case "reflection2DX":
        resultado = Tranformations.reflection2DX(vetor);
        break;
      case "reflection2DY":
        resultado = Tranformations.reflection2DY(vetor);
        break;
      case "projection2DX":
        resultado = Tranformations.projection2DX(vetor);
        break;
      case "projection2DY":
        resultado = Tranformations.projection2DY(vetor);
        break;
      case "shearing": {
        const kx = parseFloat(document.getElementById("kx2d").value);
        const ky = parseFloat(document.getElementById("ky2d").value);
        resultado = Tranformations.shearing(vetor, kx, ky);
        break;
      }
      default:
        throw new Error("Operação 2D inválida.");
    }

    saida2d.textContent = formatarVetor(resultado);
  } catch (erro) {
    saida2d.textContent = "Erro: " + erro.message;
  }
});

// Fluxo específico do painel 3D.
const x3d = document.getElementById("x3d");
const y3d = document.getElementById("y3d");
const z3d = document.getElementById("z3d");
const op3d = document.getElementById("op3d");
const params3d = document.getElementById("params3d");
const saida3d = document.getElementById("saida3d");

function renderParams3D() {
  limpar(params3d);
  const op = op3d.value;

  if (op === "translate3D") {
    const dx = criaCampoNumero("dx3d", "Δx", 1);
    const dy = criaCampoNumero("dy3d", "Δy", 2);
    const dz = criaCampoNumero("dz3d", "Δz", -1);
    params3d.append(dx.wrapper, dy.wrapper, dz.wrapper);
  } else if (op === "rotation3DX" || op === "rotation3DY" || op === "rotation3DZ") {
    const ang = criaCampoNumero("ang3d", "Ângulo (graus)", 90);
    params3d.append(ang.wrapper);
  } else {
    const dica = document.createElement("small");
    dica.textContent = "Sem parâmetros adicionais.";
    params3d.appendChild(dica);
  }
}

op3d.addEventListener("change", renderParams3D);
renderParams3D();

document.getElementById("aplicar3d").addEventListener("click", () => {
  const vetor = [parseFloat(x3d.value), parseFloat(y3d.value), parseFloat(z3d.value)];
  const op = op3d.value;
  let resultado;

  try {
    switch (op) {
      case "translate3D": {
        const dx = parseFloat(document.getElementById("dx3d").value);
        const dy = parseFloat(document.getElementById("dy3d").value);
        const dz = parseFloat(document.getElementById("dz3d").value);
        resultado = Tranformations.translate3D(vetor, dx, dy, dz);
        break;
      }
      case "rotation3DX": {
        const ang = parseFloat(document.getElementById("ang3d").value);
        resultado = Tranformations.rotation3DX(vetor, ang);
        break;
      }
      case "rotation3DY": {
        const ang = parseFloat(document.getElementById("ang3d").value);
        resultado = Tranformations.rotation3DY(vetor, ang);
        break;
      }
      case "rotation3DZ": {
        const ang = parseFloat(document.getElementById("ang3d").value);
        resultado = Tranformations.rotation3DZ(vetor, ang);
        break;
      }
      case "reflection3DX":
        resultado = Tranformations.reflection3DX(vetor);
        break;
      case "reflection3DY":
        resultado = Tranformations.reflection3DY(vetor);
        break;
      case "reflection3DZ":
        resultado = Tranformations.reflection3DZ(vetor);
        break;
      case "projection3DX":
        resultado = Tranformations.projection3DX(vetor);
        break;
      case "projection3DY":
        resultado = Tranformations.projection3DY(vetor);
        break;
      case "projection3DZ":
        resultado = Tranformations.projection3DZ(vetor);
        break;
      default:
        throw new Error("Operação 3D inválida.");
    }

    saida3d.textContent = formatarVetor(resultado);
  } catch (erro) {
    saida3d.textContent = "Erro: " + erro.message;
  }
});
