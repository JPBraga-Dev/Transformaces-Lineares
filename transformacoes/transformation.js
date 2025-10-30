import { Transformacoes2D } from "./Transformacoes2D.js";
import { Transformacoes3D } from "./Transformacoes3D.js";

// Classe que delega para as implementações com os nomes do enunciado.
export class Tranformations {
  // Secao 2D delegando para Transformacoes2D.
  static translate2D(vector, dx, dy) {
    return Transformacoes2D.Transladar2D(vector, dx, dy);
  }

  static roration2D(vector, angle) {
    return Transformacoes2D.Rotacionar2D(vector, angle);
  }

  static reflection2DX(vector) {
    return Transformacoes2D.Refletir2DEixoX(vector);
  }

  static reflection2DY(vector) {
    return Transformacoes2D.Refletir2DEixoY(vector);
  }

  static projection2DX(vector) {
    return Transformacoes2D.Projetar2DEixoX(vector);
  }

  static projection2DY(vector) {
    return Transformacoes2D.Projetar2DEixoY(vector);
  }

  static shearing(vector, kx, ky) {
    return Transformacoes2D.Cisalhar2D(vector, kx, ky);
  }

  // Secao 3D delegando para Transformacoes3D.
  static translate3D(vector, dx, dy, dz) {
    return Transformacoes3D.Transladar3D(vector, dx, dy, dz);
  }

  static rotation3DX(vector, angle) {
    return Transformacoes3D.Rotacionar3DEixoX(vector, angle);
  }

  static rotation3DY(vector, angle) {
    return Transformacoes3D.Rotacionar3DEixoY(vector, angle);
  }

  static rotation3DZ(vector, angle) {
    return Transformacoes3D.Rotacionar3DEixoZ(vector, angle);
  }

  static reflection3DX(vector) {
    return Transformacoes3D.Refletir3DEixoX(vector);
  }

  static reflection3DY(vector) {
    return Transformacoes3D.Refletir3DEixoY(vector);
  }

  static reflection3DZ(vector) {
    return Transformacoes3D.Refletir3DEixoZ(vector);
  }

  static projection3DX(vector) {
    return Transformacoes3D.Projetar3DEixoX(vector);
  }

  static projection3DY(vector) {
    return Transformacoes3D.Projetar3DEixoY(vector);
  }

  static projection3DZ(vector) {
    return Transformacoes3D.Projetar3DEixoZ(vector);
  }
}
