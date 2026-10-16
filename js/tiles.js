/* (Pt) CASAS — cria os chips das tecnologias e controla qual está ativo. 
  (En) TILES — creates chips for technologies and controls which one is active. */

function tileLabel(tech, i) {
  return t("tileAria", i + 1, techName(tech), t("cat." + tech.category));
}

/** (Pt) Cria um botão por tecnologia dentro de `container`. `onSelect(i)` é chamado ao clicar. 
 * (En) Creates a button for each technology inside `container`. `onSelect(i)` is called when clicked.*/
function renderTiles(container, technologies, onSelect) {
  return technologies.map((tech, i) => {
    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = `tile-node ${tech.category}`;
    tile.textContent = techName(tech);
    tile.setAttribute("aria-label", tileLabel(tech, i));
    tile.style.width = toPct(LAYOUT.tileW, LAYOUT.view.w);
    placeAt(tile, coordsOf(i));
    tile.addEventListener("click", () => onSelect(i));
    container.appendChild(tile);
    return tile;
  });
}

/** (Pt)Atualiza o nome e o texto de acessibilidade das casas (chamado quando a língua muda).
 * (En)Updates the name and accessibility text of the tiles (called when the language changes). */
function relabelTiles(tiles, technologies) {
  tiles.forEach((tile, i) => {
    tile.textContent = techName(technologies[i]);
    tile.setAttribute("aria-label", tileLabel(technologies[i], i));
  });
}

function setActiveTile(tiles, index) {
  tiles.forEach((tile, i) => tile.classList.toggle("active", i === index));
}