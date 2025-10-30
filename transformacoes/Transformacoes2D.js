// Utilidades 2D em coordenadas homogeneas (matriz 3x3).

import { Matrix3 } from "./algebra/Matrix3.js";

const grausParaRadianos = anguloGraus => (anguloGraus * Math.PI) / 180;

export class Transformacoes2D {
  // Matriz de translacao basica.
  static Transladar2D([x, y], dx, dy) {
    const T = new Matrix3([
      1, 0, dx,
      0, 1, dy,
      0, 0, 1
    ]);
    return T.aplicarEmVetor2([x, y]);
  }

  // Rotacao anti-horaria em graus.
  static Rotacionar2D([x, y], anguloGraus) {
    const t = grausParaRadianos(anguloGraus);
    const c = Math.cos(t), s = Math.sin(t);
    const R = new Matrix3([
       c, -s, 0,
       s,  c, 0,
       0,  0, 1
    ]);
    return R.aplicarEmVetor2([x, y]);
  }

  // Reflexoes nos eixos principais.
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

  // Projecoes que zeram um dos eixos.
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

  // Cisalhamento simples com kx e ky.
  static Cisalhar2D([x, y], kx = 0, ky = 0) {
    const S = new Matrix3([
      1, kx, 0,
      ky, 1, 0,
      0,  0, 1
    ]);
    return S.aplicarEmVetor2([x, y]);
  }
}
