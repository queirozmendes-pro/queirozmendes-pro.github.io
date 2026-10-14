// Lista de Tecnologias organizadas por Categoria e Descrições do que você sabe
const technologies = [
  // Formação ATEC
  { name: "HTML", category: "atec", categoryLabel: "Formação ATEC", desc: "Estruturação semântica de páginas web, SEO básico e acessibilidade." },
  { name: "CSS", category: "atec", categoryLabel: "Formação ATEC", desc: "Estilização moderna, Flexbox, CSS Grid, animações e layouts responsivos." },
  { name: "JavaScript", category: "atec", categoryLabel: "Formação ATEC", desc: "Manipulação de DOM, consumo de APIs (Fetch/Async-Await) e lógica de programação." },
  { name: "Python", category: "atec", categoryLabel: "Formação ATEC", desc: "Sintaxe essencial, automação de rotinas, manipulação de dados e scripts." },
  { name: "Linux", category: "atec", categoryLabel: "Formação ATEC", desc: "Navegação por terminal, gestão de permissões, comandos de sistema e automação básica." },
  { name: "SQL", category: "atec", categoryLabel: "Formação ATEC", desc: "Criação de consultas (SELECT, JOINs, WHERE, GROUP BY) e modelagem relacional de dados." },
  { name: "GitHub", category: "atec", categoryLabel: "Formação ATEC", desc: "Controle de versão com Git, commits, branches, pull requests e GitHub Pages." },
  { name: "React", category: "atec", categoryLabel: "Formação ATEC", desc: "Desenvolvimento de interfaces dinâmicas com componentes, estado (hooks) e rotas." },
  { name: "Next.js", category: "atec", categoryLabel: "Formação ATEC", desc: "Renderização do lado do servidor (SSR/SSG), roteamento e otimização de aplicações React." },
  { name: "Laravel 12", category: "atec", categoryLabel: "Formação ATEC", desc: "Desenvolvimento web backend em PHP utilizando a arquitetura MVC, rotas e Eloquent ORM." },

  // Estágio
  { name: "Power BI", category: "estagio", categoryLabel: "Estágio", desc: "Construção de dashboards interativos, modelagem de dados e relatórios corporativos." },
  { name: "DAX", category: "estagio", categoryLabel: "Estágio", desc: "Criação de medidas calculadas, colunas e análises avançadas no Power BI." },
  { name: "Power Automate", category: "estagio", categoryLabel: "Estágio", desc: "Automação de fluxos de trabalho corporativos e integração entre ferramentas Microsoft." },

  // Estudando
  { name: "SAP", category: "estudando", categoryLabel: "Estudando", desc: "Exploração de módulos empresariais e entendimento dos processos de gestão ERP." },
  { name: "IBM BOB", category: "estudando", categoryLabel: "Estudando", desc: "Aprofundamento nas ferramentas e soluções empresariais da linha IBM." }
];

// Elementos DOM
const board = document.getElementById("board");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const techTitle = document.getElementById("techTitle");
const techCategory = document.getElementById("techCategory");
const techDescription = document.getElementById("techDescription");

// Renderizar o tabuleiro
function renderBoard() {
  board.innerHTML = "";
  
  technologies.forEach((tech) => {
    const tile = document.createElement("div");
    tile.classList.add("tile", tech.category);
    tile.innerText = tech.name;
    
    tile.addEventListener("click", () => openTechModal(tech));
    board.appendChild(tile);
  });
}

// Abrir o Modal de Detalhes
function openTechModal(tech) {
  techTitle.innerText = tech.name;
  techCategory.innerText = tech.categoryLabel;
  techDescription.innerText = tech.desc;
  
  // Ajustar estilo do badge de categoria no modal
  techCategory.className = "tech-category-badge " + tech.category;
  
  modal.classList.remove("hidden");
}

// Fechar Modal
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});

// Inicialização
renderBoard();