// Arquivo principal da interface.

import { Tranformations } from "./transformacoes/transformation.js";

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
const canvas2d = document.getElementById("plot2d");
const canvas3d = document.getElementById("plot3d");
const ctx2d = canvas2d ? canvas2d.getContext("2d") : null;
const ctx3d = canvas3d ? canvas3d.getContext("2d") : null;
let ultimoResultado2D = null;
let ultimoResultado3D = null;

function prepararCanvas(canvas, ctx) {
  if (!canvas || !ctx) {
    return null;
  }
  const width = canvas.clientWidth || canvas.width;
  const height = canvas.clientHeight || canvas.height;
  if (!width || !height) {
    return null;
  }
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  return { width: canvas.width, height: canvas.height };
}

function desenharPlano2D(vetor) {
  if (!canvas2d || !ctx2d) {
    return;
  }
  const dims = prepararCanvas(canvas2d, ctx2d);
  if (!dims) {
    return;
  }
  const { width, height } = dims;
  const originX = width / 2;
  const originY = height / 2;

  ctx2d.strokeStyle = "rgba(31, 45, 68, 0.35)";
  ctx2d.lineWidth = 1.5;
  ctx2d.beginPath();
  ctx2d.moveTo(0, originY);
  ctx2d.lineTo(width, originY);
  ctx2d.moveTo(originX, 0);
  ctx2d.lineTo(originX, height);
  ctx2d.stroke();

  const dados = Array.isArray(vetor) ? vetor.map(Number) : [];
  const valido = dados.length === 2 && dados.every(Number.isFinite);
  const limite = valido ? Math.max(1, Math.abs(dados[0]), Math.abs(dados[1])) : 1;
  const padding = 28;
  const raio = Math.min(width, height) / 2 - padding;
  const escala = raio > 0 ? raio / limite : 0;
  if (escala <= 0) {
    return;
  }

  if (escala >= 16) {
    ctx2d.strokeStyle = "rgba(31, 45, 68, 0.2)";
    ctx2d.lineWidth = 1;
    ctx2d.beginPath();
    for (let i = 1; originX + i * escala < width; i++) {
      const x = originX + i * escala;
      ctx2d.moveTo(x, originY - 6);
      ctx2d.lineTo(x, originY + 6);
    }
    for (let i = 1; originX - i * escala > 0; i++) {
      const x = originX - i * escala;
      ctx2d.moveTo(x, originY - 6);
      ctx2d.lineTo(x, originY + 6);
    }
    for (let i = 1; originY + i * escala < height; i++) {
      const y = originY + i * escala;
      ctx2d.moveTo(originX - 6, y);
      ctx2d.lineTo(originX + 6, y);
    }
    for (let i = 1; originY - i * escala > 0; i++) {
      const y = originY - i * escala;
      ctx2d.moveTo(originX - 6, y);
      ctx2d.lineTo(originX + 6, y);
    }
    ctx2d.stroke();
  }

  const escuroAtivo = body.classList.contains("modo-escuro");
  ctx2d.fillStyle = escuroAtivo ? "#f4f7ff" : "rgba(31, 45, 68, 0.7)";
  ctx2d.font = "12px sans-serif";
  ctx2d.fillText("X", width - 14, originY - 8);
  ctx2d.fillText("Y", originX + 8, 14);

  ctx2d.fillStyle = "rgba(31, 45, 68, 0.9)";
  ctx2d.beginPath();
  ctx2d.arc(originX, originY, 3, 0, Math.PI * 2);
  ctx2d.fill();

  if (!valido) {
    return;
  }

  const px = originX + dados[0] * escala;
  const py = originY - dados[1] * escala;
  ctx2d.fillStyle = "#6f95ef";
  ctx2d.beginPath();
  ctx2d.arc(px, py, 6, 0, Math.PI * 2);
  ctx2d.fill();

  ctx2d.fillStyle = escuroAtivo ? "#ffffff" : "rgba(31, 45, 68, 0.85)";
  ctx2d.font = "12px sans-serif";
  ctx2d.fillText(`(${dados[0].toFixed(2)}, ${dados[1].toFixed(2)})`, px + 10, py - 10);
}

function desenharPlano3D(vetor) {
  if (!canvas3d || !ctx3d) {
    return;
  }
  const dims = prepararCanvas(canvas3d, ctx3d);
  if (!dims) {
    return;
  }
  const { width, height } = dims;
  const origemX = width / 2;
  const origemY = height / 2;
  const escuroAtivo = body.classList.contains("modo-escuro");
  const corPlano = escuroAtivo ? "rgba(54, 74, 116, 0.72)" : "rgba(142, 172, 235, 0.25)";
  const corGrade = escuroAtivo ? "rgba(160, 186, 255, 0.16)" : "rgba(60, 88, 150, 0.25)";
  const corOrigem = escuroAtivo ? "rgba(230, 236, 255, 0.9)" : "rgba(24, 36, 64, 0.85)";
  const corTexto = escuroAtivo ? "#dce6ff" : "#1f2d44";
  const corContornoPlano = escuroAtivo ? "rgba(160, 186, 255, 0.25)" : "rgba(84, 122, 204, 0.25)";

  const dados = Array.isArray(vetor) ? vetor.map(Number) : [];
  const valido = dados.length === 3 && dados.every(Number.isFinite);
  const limite = valido ? Math.max(1, Math.abs(dados[0]), Math.abs(dados[1]), Math.abs(dados[2])) : 1;
  const padding = 48;
  const raio = Math.min(width, height) / 2 - padding;
  const escala = raio > 0 ? raio / limite : 0;
  if (escala <= 0) {
    return;
  }

  const angulo = Math.PI / 6;
  const cos = Math.cos(angulo);
  const sin = Math.sin(angulo);
  const projetar = (x, y, z) => ([
    origemX + (x - z) * cos * escala,
    origemY - y * escala + (x + z) * sin * escala
  ]);

  const origem = projetar(0, 0, 0);
  const plano = [
    projetar(-limite, 0, -limite),
    projetar(limite, 0, -limite),
    projetar(limite, 0, limite),
    projetar(-limite, 0, limite)
  ];

  ctx3d.fillStyle = corPlano;
  ctx3d.beginPath();
  ctx3d.moveTo(plano[0][0], plano[0][1]);
  for (let i = 1; i < plano.length; i++) {
    ctx3d.lineTo(plano[i][0], plano[i][1]);
  }
  ctx3d.closePath();
  ctx3d.fill();
  ctx3d.strokeStyle = corContornoPlano;
  ctx3d.lineWidth = 1;
  ctx3d.stroke();

  ctx3d.lineWidth = 1;
  ctx3d.strokeStyle = corGrade;
  for (let i = -limite; i <= limite; i++) {
    const inicio = projetar(-limite, 0, i);
    const fim = projetar(limite, 0, i);
    ctx3d.beginPath();
    ctx3d.moveTo(inicio[0], inicio[1]);
    ctx3d.lineTo(fim[0], fim[1]);
    ctx3d.stroke();

    const inicioZ = projetar(i, 0, -limite);
    const fimZ = projetar(i, 0, limite);
    ctx3d.beginPath();
    ctx3d.moveTo(inicioZ[0], inicioZ[1]);
    ctx3d.lineTo(fimZ[0], fimZ[1]);
    ctx3d.stroke();
  }

  const desenharSeta = (a, b, cor) => {
    ctx3d.strokeStyle = cor;
    ctx3d.lineWidth = 2;
    ctx3d.beginPath();
    ctx3d.moveTo(a[0], a[1]);
    ctx3d.lineTo(b[0], b[1]);
    ctx3d.stroke();

    const ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
    const tamanho = 10;
    ctx3d.fillStyle = cor;
    ctx3d.beginPath();
    ctx3d.moveTo(b[0], b[1]);
    ctx3d.lineTo(b[0] - tamanho * Math.cos(ang - Math.PI / 6), b[1] - tamanho * Math.sin(ang - Math.PI / 6));
    ctx3d.lineTo(b[0] - tamanho * Math.cos(ang + Math.PI / 6), b[1] - tamanho * Math.sin(ang + Math.PI / 6));
    ctx3d.closePath();
    ctx3d.fill();
  };

  const eixos = [
    { label: "X", cor: escuroAtivo ? "#82a8ff" : "#3355aa", alvo: projetar(limite, 0, 0) },
    { label: "Y", cor: escuroAtivo ? "#55d0a0" : "#1d8f63", alvo: projetar(0, limite, 0) },
    { label: "Z", cor: escuroAtivo ? "#f2a0c5" : "#c4477f", alvo: projetar(0, 0, limite) }
  ];

  eixos.forEach(eixo => {
    desenharSeta(origem, eixo.alvo, eixo.cor);
    ctx3d.fillStyle = eixo.cor;
    ctx3d.font = "13px sans-serif";
    ctx3d.fillText(eixo.label, eixo.alvo[0] + 8, eixo.alvo[1] - 8);
  });

  ctx3d.fillStyle = corOrigem;
  ctx3d.beginPath();
  ctx3d.arc(origem[0], origem[1], 3, 0, Math.PI * 2);
  ctx3d.fill();

  if (!valido) {
    return;
  }

  const ponto = projetar(dados[0], dados[1], dados[2]);
  const projXY = projetar(dados[0], 0, dados[2]);
  const projXZ = projetar(dados[0], dados[1], 0);
  const projYZ = projetar(0, dados[1], dados[2]);

  ctx3d.setLineDash([6, 6]);
  ctx3d.lineWidth = 1.2;
  ctx3d.strokeStyle = escuroAtivo ? "rgba(255, 255, 255, 0.35)" : "rgba(40, 60, 100, 0.45)";
  [[ponto, projXY], [ponto, projXZ], [ponto, projYZ]].forEach(([a, b]) => {
    ctx3d.beginPath();
    ctx3d.moveTo(a[0], a[1]);
    ctx3d.lineTo(b[0], b[1]);
    ctx3d.stroke();
  });
  ctx3d.setLineDash([]);

  ctx3d.fillStyle = "#ff7a59";
  ctx3d.beginPath();
  ctx3d.arc(ponto[0], ponto[1], 6, 0, Math.PI * 2);
  ctx3d.fill();

  ctx3d.fillStyle = escuroAtivo ? "#ffffff" : corTexto;
  ctx3d.font = "12px sans-serif";
  const texto = `(${dados[0].toFixed(2)}, ${dados[1].toFixed(2)}, ${dados[2].toFixed(2)})`;
  const larguraTexto = ctx3d.measureText(texto).width;
  ctx3d.fillText(texto, ponto[0] - larguraTexto / 2, ponto[1] - 16);
}

desenharPlano2D(ultimoResultado2D);
desenharPlano3D(ultimoResultado3D);

window.addEventListener("resize", () => {
  desenharPlano2D(ultimoResultado2D);
  desenharPlano3D(ultimoResultado3D);
});

function renderParams2D() {
  limpar(params2d);
  const op = op2d.value;

  if (op === "translate2D") {
    const dx = criaCampoNumero("dx2d", "Delta X", 1);
    const dy = criaCampoNumero("dy2d", "Delta Y", 1);
    params2d.append(dx.wrapper, dy.wrapper);
  } else if (op === "rotation2D") {
    const ang = criaCampoNumero("ang2d", "Angulo (graus)", 45);
    params2d.append(ang.wrapper);
  } else if (op === "shearing") {
    const kx = criaCampoNumero("kx2d", "Fator kx", 1);
    const ky = criaCampoNumero("ky2d", "Fator ky", 0);
    params2d.append(kx.wrapper, ky.wrapper);
  } else {
    const dica = document.createElement("small");
    dica.textContent = "Sem parametros adicionais.";
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
      case "rotation2D": {
        const ang = parseFloat(document.getElementById("ang2d").value);
        resultado = Tranformations.rotation2D(vetor, ang);
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
    ultimoResultado2D = resultado;
    desenharPlano2D(ultimoResultado2D);
  } catch (erro) {
    saida2d.textContent = "Erro: " + erro.message;
    ultimoResultado2D = null;
    desenharPlano2D(ultimoResultado2D);
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
    const dx = criaCampoNumero("dx3d", "Delta X", 1);
    const dy = criaCampoNumero("dy3d", "Delta Y", 2);
    const dz = criaCampoNumero("dz3d", "Delta Z", -1);
    params3d.append(dx.wrapper, dy.wrapper, dz.wrapper);
  } else if (op === "rotation3DX" || op === "rotation3DY" || op === "rotation3DZ") {
    const ang = criaCampoNumero("ang3d", "Angulo (graus)", 90);
    params3d.append(ang.wrapper);
  } else {
    const dica = document.createElement("small");
    dica.textContent = "Sem parametros adicionais.";
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
    ultimoResultado3D = resultado;
    desenharPlano3D(ultimoResultado3D);
  } catch (erro) {
    saida3d.textContent = "Erro: " + erro.message;
    ultimoResultado3D = null;
    desenharPlano3D(ultimoResultado3D);
  }
});


