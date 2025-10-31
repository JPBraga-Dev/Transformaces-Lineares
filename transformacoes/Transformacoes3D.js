// Utilidades 3D em coordenadas homogeneas (matriz 4x4).

import { Matrix4 } from "./algebra/Matrix4.js";

const grausParaRadianos = (anguloGraus) => (anguloGraus * Math.PI) / 180;

export class Transformacoes3D {
  // Translacao simples em 3D.
  static Transladar3D([x, y, z], dx, dy, dz) {
    const T = new Matrix4([1, 0, 0, dx, 0, 1, 0, dy, 0, 0, 1, dz, 0, 0, 0, 1]);
    return T.aplicarEmVetor3([x, y, z]);
  }

  // Rotacoes nos eixos principais (graus).
  static Rotacionar3DEixoX([x, y, z], anguloGraus) {
    const t = grausParaRadianos(anguloGraus);
    const c = Math.cos(t),
      s = Math.sin(t);
    const R = new Matrix4([1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1]);
    return R.aplicarEmVetor3([x, y, z]);
  }

  static Rotacionar3DEixoY([x, y, z], anguloGraus) {
    const t = grausParaRadianos(anguloGraus);
    const c = Math.cos(t),
      s = Math.sin(t);
    const R = new Matrix4([c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1]);
    return R.aplicarEmVetor3([x, y, z]);
  }

  static Rotacionar3DEixoZ([x, y, z], anguloGraus) {
    const t = grausParaRadianos(anguloGraus);
    const c = Math.cos(t),
      s = Math.sin(t);
    const R = new Matrix4([c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    return R.aplicarEmVetor3([x, y, z]);
  }

  // Reflexoes nos planos coordenados.
  static Refletir3DEixoX([x, y, z]) {
    // Reflexão em torno do eixo X: mantém X, inverte Y e Z -> diag(1, -1, -1)
    const M = new Matrix4([1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1]);
    return M.aplicarEmVetor3([x, y, z]);
  }

  static Refletir3DEixoY([x, y, z]) {
    // Reflexão em torno do eixo Y: mantém Y, inverte X e Z -> diag(-1, 1, -1)
    const M = new Matrix4([-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1]);
    return M.aplicarEmVetor3([x, y, z]);
  }

  static Refletir3DEixoZ([x, y, z]) {
    // Reflexão em torno do eixo Z: mantém Z, inverte X e Y -> diag(-1, -1, 1)
    const M = new Matrix4([-1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    return M.aplicarEmVetor3([x, y, z]);
  }

  // Projecoes que preservam apenas um eixo.
  static Projetar3DEixoX([x, y, z]) {
    const Mask = new Matrix4([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
    return Mask.aplicarEmVetor3([x, y, z]);
  }

  static Projetar3DEixoY([x, y, z]) {
    const Mask = new Matrix4([0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
    return Mask.aplicarEmVetor3([x, y, z]);
  }

  static Projetar3DEixoZ([x, y, z]) {
    const Mask = new Matrix4([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    return Mask.aplicarEmVetor3([x, y, z]);
  }
}
