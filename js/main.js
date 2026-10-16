/* (Pt) MAIN — liga as peças. Aqui fica só a coordenação: quem está aberto, idioma e como alternar. 
  (En) MAIN — turns the pieces. Here is the coordination: who is open, language and how to switch.*/

(function init() {
  const track = document.getElementById("boardTrack");
  track.style.aspectRatio = `${LAYOUT.view.w} / ${LAYOUT.view.h}`;

  applyStaticTexts();
  buildTrack(document.getElementById("trackSvg"));

  let activeIndex = null;
  const tiles = renderTiles(track, TECHNOLOGIES, toggle);
  const panel = createPanel(track, closeAll);

  function toggle(i) {
    if (activeIndex === i) return closeAll();
    activeIndex = i;
    setActiveTile(tiles, i);
    panel.open(i, TECHNOLOGIES[i]);
  }

  function closeAll() {
    activeIndex = null;
    setActiveTile(tiles, null);
    panel.close();
  }

  // (Pt) Troca de idioma: botões PT | EN / (En) Language switch: PT | EN buttons
  document.querySelectorAll(".lang-switch [data-lang]").forEach(btn => {
    btn.addEventListener("click", () => setLang(btn.dataset.lang));
  });

  onLanguageChange(() => {
    relabelTiles(tiles, TECHNOLOGIES);
    if (activeIndex !== null) panel.update(TECHNOLOGIES[activeIndex]);
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeAll();
  });
})();