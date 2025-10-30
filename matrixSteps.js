// Funções utilitárias para construir matrizes de transformação e registar
// passo-a-passo a aplicação da matriz a um vetor (2D/3D em coordenadas homogéneas).

const DECIMALS = 2;

function fmt(n) {
  if (typeof n !== "number" || !isFinite(n)) return n;
  return Number(n).toFixed(DECIMALS);
}

export function logMatrix(name, M) {
  console.groupCollapsed(`${name} (dim: ${M.length}x${M[0]?.length ?? 0})`);
  try {
    // formata cada elemento para mostrar apenas DECIMALS casas
    const formatted = M.map((row) =>
      row.map((v) => (typeof v === "number" ? fmt(v) : v))
    );
    console.table(formatted);
  } catch (e) {
    console.log(M);
  }
  console.groupEnd();
}

// Converte array plano em matriz por linhas (útil para construções mais simples)
function toRows(arr, rows, cols) {
  const M = [];
  for (let r = 0; r < rows; r++) M.push(arr.slice(r * cols, (r + 1) * cols));
  return M;
}

// Builders 2D (matrizes 3x3, coordenadas homogéneas)
export function buildTranslate2D(dx, dy) {
  return toRows([1, 0, dx, 0, 1, dy, 0, 0, 1], 3, 3);
}

export function buildRotation2D(angleDeg) {
  const t = (angleDeg * Math.PI) / 180;
  const c = Math.cos(t),
    s = Math.sin(t);
  return toRows([c, -s, 0, s, c, 0, 0, 0, 1], 3, 3);
}

export function buildReflection2DX() {
  return toRows([1, 0, 0, 0, -1, 0, 0, 0, 1], 3, 3);
}
export function buildReflection2DY() {
  return toRows([-1, 0, 0, 0, 1, 0, 0, 0, 1], 3, 3);
}
export function buildProjection2DX() {
  return toRows([1, 0, 0, 0, 0, 0, 0, 0, 1], 3, 3);
}
export function buildProjection2DY() {
  return toRows([0, 0, 0, 0, 1, 0, 0, 0, 1], 3, 3);
}
export function buildShearing2D(kx = 0, ky = 0) {
  return toRows([1, kx, 0, ky, 1, 0, 0, 0, 1], 3, 3);
}

// Builders 3D (matrizes 4x4, coordenadas homogéneas)
export function buildTranslate3D(dx, dy, dz) {
  return toRows([1, 0, 0, dx, 0, 1, 0, dy, 0, 0, 1, dz, 0, 0, 0, 1], 4, 4);
}
export function buildRotation3DX(angleDeg) {
  const t = (angleDeg * Math.PI) / 180;
  const c = Math.cos(t),
    s = Math.sin(t);
  return toRows([1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1], 4, 4);
}
export function buildRotation3DY(angleDeg) {
  const t = (angleDeg * Math.PI) / 180;
  const c = Math.cos(t),
    s = Math.sin(t);
  return toRows([c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1], 4, 4);
}
export function buildRotation3DZ(angleDeg) {
  const t = (angleDeg * Math.PI) / 180;
  const c = Math.cos(t),
    s = Math.sin(t);
  return toRows([c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], 4, 4);
}

export function buildReflection3DX() {
  return toRows([-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], 4, 4);
}
export function buildReflection3DY() {
  return toRows([1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], 4, 4);
}
export function buildReflection3DZ() {
  return toRows([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1], 4, 4);
}

export function buildProjection3DX() {
  return toRows([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 4, 4);
}
export function buildProjection3DY() {
  return toRows([0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 4, 4);
}
export function buildProjection3DZ() {
  return toRows([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], 4, 4);
}

// Aplica matriz a vetor (homog.) e regista passo-a-passo (-- suporta 3x3 e 4x4)
export function logApplyMatrix(M, vec, label = "Aplicar matriz") {
  console.group(label);
  logMatrix("Matriz", M);
  const n = M.length;
  const hom = Array.from(vec);
  // completar coordenada homogênea
  if (n === 3) hom.push(1); // [x,y,1]
  else if (n === 4) hom.push(1); // [x,y,z,1]
  else throw new Error("Matriz com dimensão não suportada: " + n);

  console.log(
    "Vetor entrada (homog.):",
    hom.map((h) => (typeof h === "number" ? fmt(h) : h))
  );
  const res = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    const terms = [];
    let sum = 0;
    for (let j = 0; j < n; j++) {
      const a = M[i][j];
      const b = hom[j] ?? 0;
      const term = a * b;
      terms.push(`${fmt(a)}*${fmt(b)}`);
      sum += term;
    }
    console.log(`R[${i}] = ${terms.join(" + ")} = ${fmt(sum)}`);
    res[i] = sum;
  }

  // remover coordenada homogénea antes de apresentar (para 2D/3D)
  const visible = res.slice(0, Math.max(2, vec.length));
  console.log(
    "Resultado (antes de normalizar homog.):",
    res.map((r) => (typeof r === "number" ? fmt(r) : r))
  );
  // logMatrix já formata por si
  logMatrix("Resultado (componentes visíveis)", [visible]);
  console.groupEnd();
  return visible;
}

// Pequenos helpers para registar diretamente por operação (facilita uso)
export function logTranslate2D(vec, dx, dy) {
  return logApplyMatrix(
    buildTranslate2D(dx, dy),
    vec,
    `Translate2D dx=${dx} dy=${dy}`
  );
}
export function logRotation2D(vec, ang) {
  return logApplyMatrix(buildRotation2D(ang), vec, `Rotation2D ${ang}°`);
}
export function logShearing2D(vec, kx, ky) {
  return logApplyMatrix(
    buildShearing2D(kx, ky),
    vec,
    `Shearing2D kx=${kx} ky=${ky}`
  );
}
export function logReflection2DX(vec) {
  return logApplyMatrix(buildReflection2DX(), vec, `Reflection2D X`);
}
export function logReflection2DY(vec) {
  return logApplyMatrix(buildReflection2DY(), vec, `Reflection2D Y`);
}
export function logProjection2DX(vec) {
  return logApplyMatrix(buildProjection2DX(), vec, `Projection2D X`);
}
export function logProjection2DY(vec) {
  return logApplyMatrix(buildProjection2DY(), vec, `Projection2D Y`);
}

export function logTranslate3D(vec, dx, dy, dz) {
  return logApplyMatrix(
    buildTranslate3D(dx, dy, dz),
    vec,
    `Translate3D dx=${dx} dy=${dy} dz=${dz}`
  );
}
export function logRotation3DX(vec, ang) {
  return logApplyMatrix(buildRotation3DX(ang), vec, `Rotation3DX ${ang}°`);
}
export function logRotation3DY(vec, ang) {
  return logApplyMatrix(buildRotation3DY(ang), vec, `Rotation3DY ${ang}°`);
}
export function logRotation3DZ(vec, ang) {
  return logApplyMatrix(buildRotation3DZ(ang), vec, `Rotation3DZ ${ang}°`);
}
export function logReflection3DX(vec) {
  return logApplyMatrix(buildReflection3DX(), vec, `Reflection3D X`);
}
export function logReflection3DY(vec) {
  return logApplyMatrix(buildReflection3DY(), vec, `Reflection3D Y`);
}
export function logReflection3DZ(vec) {
  return logApplyMatrix(buildReflection3DZ(), vec, `Reflection3D Z`);
}
export function logProjection3DX(vec) {
  return logApplyMatrix(buildProjection3DX(), vec, `Projection3D X`);
}
export function logProjection3DY(vec) {
  return logApplyMatrix(buildProjection3DY(), vec, `Projection3D Y`);
}
export function logProjection3DZ(vec) {
  return logApplyMatrix(buildProjection3DZ(), vec, `Projection3D Z`);
}
