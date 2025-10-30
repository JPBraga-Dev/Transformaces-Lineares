// Resumo das transformações lineares em coordenadas homogêneas.
// Organizado por tópicos para facilitar a captura em slides.

import { Matrix3 } from "../transformacoes/algebra/Matrix3.js";
import { Matrix4 } from "../transformacoes/algebra/Matrix4.js";

const grausParaRadianos = graus => (graus * Math.PI) / 180;

// ================================================================
// Transformações 2D
// ================================================================

// Translação (2D): desloca o ponto de entrada por (dx, dy).
export function translate2D([x, y], dx, dy) {
  const T = new Matrix3([
    1, 0, dx,
    0, 1, dy,
    0, 0, 1
  ]);
  return T.aplicarEmVetor2([x, y]);
}

// Rotação (2D): gira o ponto em torno da origem pelo ângulo (graus).
export function rotation2D([x, y], angle) {
  const t = grausParaRadianos(angle);
  const c = Math.cos(t);
  const s = Math.sin(t);
  const R = new Matrix3([
     c, -s, 0,
     s,  c, 0,
     0,  0, 1
  ]);
  return R.aplicarEmVetor2([x, y]);
}

// Reflexão em relação ao eixo X (2D).
export function reflection2DX([x, y]) {
  const M = new Matrix3([
    1, 0, 0,
    0,-1, 0,
    0, 0, 1
  ]);
  return M.aplicarEmVetor2([x, y]);
}

// Reflexão em relação ao eixo Y (2D).
export function reflection2DY([x, y]) {
  const M = new Matrix3([
   -1, 0, 0,
    0, 1, 0,
    0, 0, 1
  ]);
  return M.aplicarEmVetor2([x, y]);
}

// Projeção no eixo X (2D): mantém somente a componente X.
export function projection2DX([x, y]) {
  const P = new Matrix3([
    1, 0, 0,
    0, 0, 0,
    0, 0, 1
  ]);
  return P.aplicarEmVetor2([x, y]);
}

// Projeção no eixo Y (2D): mantém somente a componente Y.
export function projection2DY([x, y]) {
  const P = new Matrix3([
    0, 0, 0,
    0, 1, 0,
    0, 0, 1
  ]);
  return P.aplicarEmVetor2([x, y]);
}

// Cisalhamento (2D): aplica fatores kx e ky ao ponto.
export function shearing([x, y], kx = 0, ky = 0) {
  const S = new Matrix3([
    1, kx, 0,
    ky, 1, 0,
    0,  0, 1
  ]);
  return S.aplicarEmVetor2([x, y]);
}

// ================================================================
// Transformações 3D
// ================================================================

// Translação (3D): desloca o ponto por (dx, dy, dz).
export function translate3D([x, y, z], dx, dy, dz) {
  const T = new Matrix4([
    1,0,0,dx,
    0,1,0,dy,
    0,0,1,dz,
    0,0,0, 1
  ]);
  return T.aplicarEmVetor3([x, y, z]);
}

// Rotação em torno do eixo X (3D).
export function rotation3DX([x, y, z], angle) {
  const t = grausParaRadianos(angle);
  const c = Math.cos(t);
  const s = Math.sin(t);
  const R = new Matrix4([
    1, 0, 0, 0,
    0, c,-s, 0,
    0, s, c, 0,
    0, 0, 0, 1
  ]);
  return R.aplicarEmVetor3([x, y, z]);
}

// Rotação em torno do eixo Y (3D).
export function rotation3DY([x, y, z], angle) {
  const t = grausParaRadianos(angle);
  const c = Math.cos(t);
  const s = Math.sin(t);
  const R = new Matrix4([
     c, 0, s, 0,
     0, 1, 0, 0,
    -s, 0, c, 0,
     0, 0, 0, 1
  ]);
  return R.aplicarEmVetor3([x, y, z]);
}

// Rotação em torno do eixo Z (3D).
export function rotation3DZ([x, y, z], angle) {
  const t = grausParaRadianos(angle);
  const c = Math.cos(t);
  const s = Math.sin(t);
  const R = new Matrix4([
     c,-s, 0, 0,
     s, c, 0, 0,
     0, 0, 1, 0,
     0, 0, 0, 1
  ]);
  return R.aplicarEmVetor3([x, y, z]);
}

// Reflexão em relação ao plano perpendicular ao eixo X (3D).
export function reflection3DX([x, y, z]) {
  const M = new Matrix4([
   -1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]);
  return M.aplicarEmVetor3([x, y, z]);
}

// Reflexão em relação ao plano perpendicular ao eixo Y (3D).
export function reflection3DY([x, y, z]) {
  const M = new Matrix4([
    1, 0, 0, 0,
    0,-1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]);
  return M.aplicarEmVetor3([x, y, z]);
}

// Reflexão em relação ao plano perpendicular ao eixo Z (3D).
export function reflection3DZ([x, y, z]) {
  const M = new Matrix4([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0,-1, 0,
    0, 0, 0, 1
  ]);
  return M.aplicarEmVetor3([x, y, z]);
}

// Projeção no eixo X (3D): zera as componentes Y e Z.
export function projection3DX([x, y, z]) {
  const Mask = new Matrix4([
    1,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,1
  ]);
  return Mask.aplicarEmVetor3([x, y, z]);
}

// Projeção no eixo Y (3D): zera as componentes X e Z.
export function projection3DY([x, y, z]) {
  const Mask = new Matrix4([
    0,0,0,0,
    0,1,0,0,
    0,0,0,0,
    0,0,0,1
  ]);
  return Mask.aplicarEmVetor3([x, y, z]);
}

// Projeção no eixo Z (3D): zera as componentes X e Y.
export function projection3DZ([x, y, z]) {
  const Mask = new Matrix4([
    0,0,0,0,
    0,0,0,0,
    0,0,1,0,
    0,0,0,1
  ]);
  return Mask.aplicarEmVetor3([x, y, z]);
}
