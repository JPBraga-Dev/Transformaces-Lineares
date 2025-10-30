# Transformações Lineares 2D/3D

Projeto acadêmico para demonstrar transformações lineares em coordenadas homogêneas, com interface interativa em HTML/JS e implementação modular das operações em 2D e 3D.

## 📦 Estrutura Principal

```
├── index.html               # Interface interativa
├── main.js                  # Lógica da UI e desenho dos planos 2D/3D
├── transformacoes/
│   ├── Transformacoes2D.js  # Transformações em 2D usando Matrix3
│   ├── Transformacoes3D.js  # Transformações em 3D usando Matrix4
│   ├── algebra/
│   │   ├── Matrix3.js       # Matriz 3x3 para coordenadas homogêneas
│   │   └── Matrix4.js       # Matriz 4x4 para coordenadas homogêneas
│   └── transformation.js    # Classe `Tranformations` que delega para 2D/3D
└── Anotações/
    └── Resumão.js           # Código comentado das operações para estudos/slides
```

## 🧮 Transformações Implementadas

### 2D
- `translate2D(vector, dx, dy)`
- `rotation2D(vector, angle)`
- `reflection2DX(vector)`
- `reflection2DY(vector)`
- `projection2DX(vector)`
- `projection2DY(vector)`
- `shearing(vector, kx, ky)`

### 3D
- `translate3D(vector, dx, dy, dz)`
- `rotation3DX(vector, angle)`
- `rotation3DY(vector, angle)`
- `rotation3DZ(vector, angle)`
- `reflection3DX(vector)`
- `reflection3DY(vector)`
- `reflection3DZ(vector)`
- `projection3DX(vector)`
- `projection3DY(vector)`
- `projection3DZ(vector)`

Todas as funções recebem vetores no sistema cartesiano e retornam vetores cartesianos, realizando internamente os cálculos em coordenadas homogêneas.

## 🚀 Como Usar

1. Abra `index.html` em um navegador moderno.
2. Escolha 2D ou 3D na interface.
3. Informe o vetor inicial e selecione uma transformação.
4. Ajuste os parâmetros (quando necessário) e clique em **Aplicar**.
5. Veja o resultado numérico e a visualização no plano correspondente.

## 🎓 Material de Apoio

O arquivo `Anotações/Resumão.js` lista cada transformação com seus trechos de código comentados, facilitando a montagem de slides ou revisões rápidas.

---

Projeto desenvolvido para a disciplina de Álgebra Linear, foco em compreensão e visualização de transformações lineares em 2D e 3D.
