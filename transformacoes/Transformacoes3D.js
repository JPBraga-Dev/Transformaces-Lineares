// src/Transformacoes3D.js
// Transformações 3D com coordenadas homogêneas (matriz 4×4).

import { Matrix4 } from "./algebra/Matrix4.js";
import { GrausParaRadianos } from "./utils.js";

export class Transformacoes3D {
  // Translação
  static Transladar3D([x, y, z], dx, dy, dz) {
    const T = new Matrix4([
      1,0,0,dx,
      0,1,0,dy,
      0,0,1,dz,
      0,0,0, 1
    ]);
    return T.aplicarEmVetor3([x, y, z]);
  }

  // Rotações (graus, anti-horário, mão direita)
  static Rotacionar3DEixoX([x, y, z], anguloGraus) {
    const t = GrausParaRadianos(anguloGraus);
    const c = Math.cos(t), s = Math.sin(t);
    const R = new Matrix4([
      1, 0, 0, 0,
      0, c,-s, 0,
      0, s, c, 0,
      0, 0, 0, 1
    ]);
    return R.aplicarEmVetor3([x, y, z]);
  }

  static Rotacionar3DEixoY([x, y, z], anguloGraus) {
    const t = GrausParaRadianos(anguloGraus);
    const c = Math.cos(t), s = Math.sin(t);
    const R = new Matrix4([
       c, 0, s, 0,
       0, 1, 0, 0,
      -s, 0, c, 0,
       0, 0, 0, 1
    ]);
    return R.aplicarEmVetor3([x, y, z]);
  }

  static Rotacionar3DEixoZ([x, y, z], anguloGraus) {
    const t = GrausParaRadianos(anguloGraus);
    const c = Math.cos(t), s = Math.sin(t);
    const R = new Matrix4([
       c,-s, 0, 0,
       s, c, 0, 0,
       0, 0, 1, 0,
       0, 0, 0, 1
    ]);
    return R.aplicarEmVetor3([x, y, z]);
  }

  // Reflexões
  static Refletir3DEixoX([x, y, z]) {
    const M = new Matrix4([
     -1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]);
    return M.aplicarEmVetor3([x, y, z]);
  }

  static Refletir3DEixoY([x, y, z]) {
    const M = new Matrix4([
      1, 0, 0, 0,
      0,-1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]);
    return M.aplicarEmVetor3([x, y, z]);
  }

  static Refletir3DEixoZ([x, y, z]) {
    const M = new Matrix4([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0,-1, 0,
      0, 0, 0, 1
    ]);
    return M.aplicarEmVetor3([x, y, z]);
  }

  // Projeções "no eixo": mantém apenas o componente daquele eixo
  static Projetar3DEixoX([x, y, z]) {
    const Mask = new Matrix4([
      1,0,0,0,
      0,0,0,0,
      0,0,0,0,
      0,0,0,1
    ]);
    return Mask.aplicarEmVetor3([x, y, z]);
  }

  static Projetar3DEixoY([x, y, z]) {
    const Mask = new Matrix4([
      0,0,0,0,
      0,1,0,0,
      0,0,0,0,
      0,0,0,1
    ]);
    return Mask.aplicarEmVetor3([x, y, z]);
  }

  static Projetar3DEixoZ([x, y, z]) {
    const Mask = new Matrix4([
      0,0,0,0,
      0,0,0,0,
      0,0,1,0,
      0,0,0,1
    ]);
    return Mask.aplicarEmVetor3([x, y, z]);
  }
}
