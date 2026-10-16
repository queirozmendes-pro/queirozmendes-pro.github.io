/* (Pt) PISTA — desenha o SVG do tabuleiro (estrada, circuito decorativo, logo do GitHub).
   O traçado é calculado a partir de LAYOUT, então acompanha qualquer mudança de posição.
   (En) TRACK — draws the SVG board (road, decorative circuit, GitHub logo).
   The track is calculated from LAYOUT, so it follows any position change. */

const GITHUB_MARK_PATH = "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z";

/** (Pt) Linhas finas de circuito nas faixas abertas (puramente decorativas): 4 por faixa.
 *  (En) Thin circuit lines in the open bands (purely decorative): 4 per band. */
function circuitTraces() {
  const paths = [];
  const nodes = [];
  BANDS.forEach(b => {
    const yA = b.y + 25;
    const yB = b.y + b.h - 35;
    const xl = b.x;
    const xr = b.x + b.w;
    paths.push(`M${xl},${yA} H${xl + 150} L${xl + 175},${yA + 25} H${xl + 370}`);
    paths.push(`M${xr},${yA} H${xr - 90} L${xr - 115},${yA + 25} H${xr - 210}`);
    paths.push(`M${xl},${yB} H${xl + 80} L${xl + 105},${yB - 25} H${xl + 250}`);
    paths.push(`M${xr},${yB} H${xr - 150} L${xr - 175},${yB + 25} H${xr - 290}`);
    nodes.push([xl, yA], [xr, yA], [xl, yB], [xr, yB]);
  });
  return { paths, nodes };
}

/** (Pt) Traçado da estrada: fileiras ligadas por semicírculos alternados (direita, esquerda).
 *  A última fileira termina na última casa, mesmo que esteja incompleta.
 *  (En) Road path: rows joined by alternating semicircles (right, left).
 *  The last row ends at the last space, even if it is incomplete. */
function trackPathD() {
  const { xs, rowsY, arcRx } = LAYOUT;
  const xl = xs[0];
  const xr = xs[xs.length - 1];
  const lastX = coordsOf(TECHNOLOGIES.length - 1).x;

  let d = `M${xl},${rowsY[0]}`;
  rowsY.forEach((y, r) => {
    const forward = r % 2 === 0;
    const isLastRow = r === rowsY.length - 1;
    const endX = isLastRow ? lastX : (forward ? xr : xl);
    d += ` H${endX}`;
    if (!isLastRow) {
      const ry = (rowsY[r + 1] - y) / 2;
      d += ` A${arcRx},${ry} 0 0 ${forward ? 1 : 0} ${endX},${rowsY[r + 1]}`;
    }
  });
  return d;
}

function buildTrack(svg) {
  const { w, h } = LAYOUT.view;
  svg.setAttribute("viewBox", `0 0 ${w} ${h}`);

  const circuit = circuitTraces();
  const traces = circuit.paths.map(d => `<path d="${d}" />`).join("");
  const nodes = circuit.nodes.map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="4" />`).join("");

  svg.innerHTML = `
    <defs>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="7" />
      </filter>
      <path id="trackPath" d="${trackPathD()}" />
    </defs>

    <g class="traces">${traces}${nodes}</g>

    <use href="#trackPath" class="road road-glow" filter="url(#glow)" />
    <use href="#trackPath" class="road road-edge" />
    <use href="#trackPath" class="road road-base" />
    <use href="#trackPath" class="road road-seams" />
    <use href="#trackPath" class="road road-dash" />

    <g class="gh-mark" transform="translate(${w - 56},${h - 48}) scale(1.6)">
      <circle cx="8" cy="8" r="13" />
      <path d="${GITHUB_MARK_PATH}" />
    </g>
  `;
}