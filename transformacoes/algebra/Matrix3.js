// Matriz 3x3 para coordenadas homogeneas em 2D.
export class Matrix3 {
  constructor(values) {
    if (!Array.isArray(values) || values.length !== 9) {
      throw new Error("Matrix3 requer exatamente 9 valores.");
    }
    this.m = values.map(Number);
  }

  static identidade() {
    return new Matrix3([
      1, 0, 0,
      0, 1, 0,
      0, 0, 1
    ]);
  }

  static multiplicar(a, b) {
    const am = a.m, bm = b.m;
    const r = new Array(9).fill(0);
    for (let linha = 0; linha < 3; linha++) {
      for (let coluna = 0; coluna < 3; coluna++) {
        let soma = 0;
        for (let k = 0; k < 3; k++) {
          soma += am[linha*3 + k] * bm[k*3 + coluna];
        }
        r[linha*3 + coluna] = soma;
      }
    }
    return new Matrix3(r);
  }

  // Aplica a matriz em vetor 2D utilizando coordenadas homogeneas.
  aplicarEmVetor2([x, y]) {
    const m = this.m;
    const X = m[0]*x + m[1]*y + m[2]*1;
    const Y = m[3]*x + m[4]*y + m[5]*1;
    const W = m[6]*x + m[7]*y + m[8]*1;
    const w = (W === 0 ? 1 : W);
    return [X / w, Y / w];
  }
}
