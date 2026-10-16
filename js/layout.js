/* (Pt) LAYOUT — a geometria do tabuleiro. Única fonte de verdade: a pista (track.js),
   as casas (tiles.js) e o painel (panel.js) leem tudo daqui.
   O número de fileiras é calculado pela quantidade de itens em js/data.js:
   para mudar quantas casas cabem por fileira, altere só `perRow`.
   Unidades: coordenadas do SVG (largura 1000), convertidas em % na hora de posicionar.
   (En) LAYOUT — the board geometry. Single source of truth: the track (track.js),
   the spaces (tiles.js) and the panel (panel.js) all read from here.
   The number of rows is calculated from the number of items in js/data.js:
   to change how many spaces fit per row, change only `perRow`. */

const LAYOUT = {
  width: 1000,        // (Pt) largura do tabuleiro em unidades do SVG      (En) board width in SVG units
  perRow: 5,          // (Pt) casas por fileira                            (En) spaces per row
  marginX: 110,       // (Pt) centro da primeira/última casa da fileira    (En) center of the first/last space in a row
  topY: 100,          // (Pt) posição vertical da primeira fileira         (En) vertical position of the first row
  rowGap: 240,        // (Pt) distância vertical entre fileiras            (En) vertical distance between rows
  tileW: 118,         // (Pt) largura de cada casa                         (En) width of each space
  arcRx: 70,          // (Pt) quanto as curvas das pontas se afastam       (En) how far the end curves bulge out
  bandHeight: 140,    // (Pt) altura da faixa aberta da explicação         (En) height of the open band for the explanation
  bandInset: 40       // (Pt) folga lateral do painel                      (En) side margin of the panel
};

// (Pt) Valores calculados a partir da quantidade de itens   (En) Values calculated from the number of items
const ROWS = Math.ceil(TECHNOLOGIES.length / LAYOUT.perRow);

LAYOUT.xs = Array.from({ length: LAYOUT.perRow }, (_, c) =>
  LAYOUT.marginX + (c * (LAYOUT.width - 2 * LAYOUT.marginX)) / (LAYOUT.perRow - 1));

LAYOUT.rowsY = Array.from({ length: ROWS }, (_, r) => LAYOUT.topY + r * LAYOUT.rowGap);

LAYOUT.view = { w: LAYOUT.width, h: 2 * LAYOUT.topY + (ROWS - 1) * LAYOUT.rowGap };

/** (Pt) Posição (x, y) da casa de índice i. Fileiras ímpares andam da direita para a esquerda.
 *  (En) Position (x, y) of the space with index i. Odd rows run right to left. */
function coordsOf(i) {
  const row = Math.floor(i / LAYOUT.perRow);
  const col = i % LAYOUT.perRow;
  const reversed = row % 2 === 1;
  const x = LAYOUT.xs[reversed ? LAYOUT.perRow - 1 - col : col];
  return { x, y: LAYOUT.rowsY[row] };
}

/** (Pt) Faixas abertas: uma entre cada par de fileiras, centrada no espaço livre.
 *  (En) Open bands: one between each pair of rows, centered in the free space. */
const BANDS = (() => {
  const { xs, rowsY, bandHeight, bandInset } = LAYOUT;
  const x = xs[0] + bandInset;
  const w = xs[xs.length - 1] - xs[0] - 2 * bandInset;
  return rowsY.slice(0, -1).map((y, i) => ({
    x, w, h: bandHeight,
    y: (y + rowsY[i + 1]) / 2 - bandHeight / 2
  }));
})();

/** (Pt) Em qual faixa a explicação da casa i abre: a faixa logo abaixo da fileira; a última fileira usa a faixa acima.
 *  (En) Which band the explanation of space i opens in: the band right below its row; the last row uses the band above. */
function bandOf(i) {
  return Math.min(Math.floor(i / LAYOUT.perRow), BANDS.length - 1);
}

/* ---------- (Pt) Utilitários de posicionamento / (En) Positioning helpers ---------- */
const toPct = (value, total) => (value / total) * 100 + "%";

function placeAt(el, { x, y }) {
  el.style.left = toPct(x, LAYOUT.view.w);
  el.style.top = toPct(y, LAYOUT.view.h);
}

function placeBox(el, { x, y, w, h }) {
  placeAt(el, { x, y });
  el.style.width = toPct(w, LAYOUT.view.w);
  el.style.height = toPct(h, LAYOUT.view.h);
}