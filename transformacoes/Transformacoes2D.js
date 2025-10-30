// src/Transformacoes2D.js
// Transformações 2D com coordenadas homogêneas (matriz 3×3).

import { Matrix3 } from "./algebra/Matrix3.js";
import { GrausParaRadianos } from "./utils.js";

export class Transformacoes2D {
  // Translação
  static Transladar2D([x, y], dx, dy) {
    const T = new Matrix3([
      1, 0, dx,
      0, 1, dy,
      0, 0, 1
    ]);
    return T.aplicarEmVetor2([x, y]);
  }

  // Rotação anti-horária (graus)
  static Rotacionar2D([x, y], anguloGraus) {
    const t = GrausParaRadianos(anguloGraus);
    const c = Math.cos(t), s = Math.sin(t);
    const R = new Matrix3([
       c, -s, 0,
       s,  c, 0,
       0,  0, 1
    ]);
    return R.aplicarEmVetor2([x, y]);
  }

  // Reflexões
  static Refletir2DEixoX([x, y]) {
    const M = new Matrix3([
      1, 0, 0,
      0,-1, 0,
      0, 0, 1
    ]);
    return M.aplicarEmVetor2([x, y]);
  }

  static Refletir2DEixoY([x, y]) {
    const M = new Matrix3([
     -1, 0, 0,
      0, 1, 0,
      0, 0, 1
    ]);
    return M.aplicarEmVetor2([x, y]);
  }

  // Projeções (no eixo)
  static Projetar2DEixoX([x, y]) {
    const P = new Matrix3([
      1, 0, 0,
      0, 0, 0,
      0, 0, 1
    ]);
    return P.aplicarEmVetor2([x, y]);
  }

  static Projetar2DEixoY([x, y]) {
    const P = new Matrix3([
      0, 0, 0,
      0, 1, 0,
      0, 0, 1
    ]);
    return P.aplicarEmVetor2([x, y]);
  }

  // Cisalhamento (shear)
  static Cisalhar2D([x, y], kx = 0, ky = 0) {
    const S = new Matrix3([
      1, kx, 0,
      ky, 1, 0,
      0,  0, 1
    ]);
    return S.aplicarEmVetor2([x, y]);
  }
}
