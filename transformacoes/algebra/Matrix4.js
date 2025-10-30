// Matriz 4x4 para coordenadas homogeneas em 3D.
export class Matrix4 {
  constructor(values) {
    if (!Array.isArray(values) || values.length !== 16) {
      throw new Error("Matrix4 requer exatamente 16 valores.");
    }
    this.m = values.map(Number);
  }

  static identidade() {
    return new Matrix4([
      1,0,0,0,
      0,1,0,0,
      0,0,1,0,
      0,0,0,1
    ]);
  }

  static multiplicar(a, b) {
    const am = a.m, bm = b.m;
    const r = new Array(16).fill(0);
    for (let linha = 0; linha < 4; linha++) {
      for (let coluna = 0; coluna < 4; coluna++) {
        let soma = 0;
        for (let k = 0; k < 4; k++) {
          soma += am[linha*4 + k] * bm[k*4 + coluna];
        }
        r[linha*4 + coluna] = soma;
      }
    }
    return new Matrix4(r);
  }

  // Aplica a matriz em vetor 3D utilizando coordenadas homogeneas.
  aplicarEmVetor3([x, y, z]) {
    const m = this.m;
    const X = m[0]*x + m[1]*y + m[2]*z + m[3]*1;
    const Y = m[4]*x + m[5]*y + m[6]*z + m[7]*1;
    const Z = m[8]*x + m[9]*y + m[10]*z + m[11]*1;
    const W = m[12]*x + m[13]*y + m[14]*z + m[15]*1;
    const w = (W === 0 ? 1 : W);
    return [X / w, Y / w, Z / w];
  }
}
