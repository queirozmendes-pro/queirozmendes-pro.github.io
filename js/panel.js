/* (Pt) PAINEL — a explicação que abre na faixa livre do tabuleiro. 
  (En) PANEL — the explanation that opens in the open band of the board. */

/** (Pt)Monta o painel dentro de `container`. `onClose` é chamado pelo botão ×. 
 * (En)Builds the panel inside `container`. `onClose` is called by the × button.*/
function createPanel(container, onClose) {
  const el = document.createElement("section");
  el.className = "explain";
  el.hidden = true;
  el.setAttribute("aria-live", "polite");
  el.innerHTML = `
    <button type="button" class="explain-close">×</button>
    <div class="explain-head">
      <span class="tech-category-badge"></span>
      <h2></h2>
    </div>
    <div class="explain-body">
      <h3></h3>
      <p></p>
    </div>
  `;
  container.appendChild(el);

  const badge = el.querySelector(".tech-category-badge");
  const title = el.querySelector("h2");
  const heading = el.querySelector("h3");
  const text = el.querySelector("p");
  const closeBtn = el.querySelector(".explain-close");
  closeBtn.addEventListener("click", onClose);

  /** (Pt) Preenche os textos na língua atual (não mexe em posição nem animação). 
   * (En) Fills the texts in the current language (doesn't change position or animation).  */
  function fill(tech) {
    badge.textContent = t("cat." + tech.category);
    title.textContent = techName(tech);
    heading.textContent = t("panelHeading");
    text.textContent = localized(tech.desc);
    closeBtn.setAttribute("aria-label", t("close"));
  }

  /** (Pt)Abre o painel com os dados da casa `index`, na faixa correspondente.
   * (En)Opens the panel with the data of the cell `index`, in the corresponding band.
   */
  function open(index, tech) {
    const band = BANDS[bandOf(index)];

    fill(tech);
    el.className = `explain ${tech.category}`;
    placeBox(el, band);

    const { x, y } = coordsOf(index);
    const clamp = v => Math.min(100, Math.max(0, v));
    el.style.transformOrigin =
      `${clamp(((x - band.x) / band.w) * 100)}% ${clamp(((y - band.y) / band.h) * 100)}%`;

    el.hidden = false;
    void el.offsetWidth;          
    el.classList.add("open");
  }

  function update(tech) {
    fill(tech);
  }

  function close() {
    el.hidden = true;
    el.classList.remove("open");
  }

  return { open, update, close };
}