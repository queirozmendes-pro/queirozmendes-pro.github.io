/* (Pt) DADOS — só o conteúdo. Para adicionar ou editar uma tecnologia, mexa apenas aqui.
   category: "atec" | "estagio" | "estudando"  (cores em css/style.css, nomes em js/i18n.js)
   desc: texto em cada idioma. Para um idioma novo, acrescente a chave aqui e em js/i18n.js.
   A ordem da lista é a ordem da trilha no tabuleiro. 
   (En) DATA — content only. To add or edit a technology, modify only here.
   category: "atec" | "estagio" | "estudando" (colors in css/style.css, names in js/i18n.js)
   desc: text in each language. For a new language, add the key here and in js/i18n.js.
   The list order is the order of the track on the board. */

const TECHNOLOGIES = [
  // Formação ATEC / ATEC training
  { name: "HTML", category: "atec", desc: {
      pt: "Estruturação semântica de páginas web, foco em acessibilidade e boas práticas de marcação.",
      en: "Semantic page structure, with a focus on accessibility and good markup practices." } },
  { name: "CSS", category: "atec", desc: {
      pt: "Estilização avançada com Flexbox, CSS Grid, animações fluidas e design responsivo.",
      en: "Advanced styling with Flexbox, CSS Grid, fluid animations, and responsive design." } },
  { name: "JavaScript", category: "atec", desc: {
      pt: "Manipulação de DOM, programação assíncrona (Fetch/Async-Await) e lógica interativa.",
      en: "DOM manipulation, asynchronous programming (Fetch/Async-Await), and interactive logic." } },
  { name: "Python", category: "atec", desc: {
      pt: "Desenvolvimento de scripts de automação, manipulação de dados e lógica essencial.",
      en: "Automation scripts, data handling, and core programming logic." } },
  { name: "Linux", category: "atec", desc: {
      pt: "Navegação por terminal, controlo de permissões de ficheiros e gestão de sistema.",
      en: "Terminal navigation, file permission control, and system management." } },
  { name: "SQL", category: "atec", desc: {
      pt: "Criação de consultas relacionais, junções (JOINs), filtros e gestão de dados.",
      en: "Relational queries, JOINs, filters, and data management." } },
  { name: "GitHub", category: "atec", desc: {
      pt: "Controlo de versões com Git, gestão de branches, pull requests e deploy no GitHub Pages.",
      en: "Version control with Git, branch management, pull requests, and deployment on GitHub Pages." } },
  { name: "React", category: "atec", desc: {
      pt: "Criação de componentes reutilizáveis, gestão de estados com Hooks e arquitetura moderna de UI.",
      en: "Reusable components, state management with Hooks, and modern UI architecture." } },
  { name: "Next.js", category: "atec", desc: {
      pt: "Estruturação de aplicações React otimizadas, renderização e gestão de rotas.",
      en: "Optimized React applications, rendering, and route management." } },
  { name: "Laravel 12", category: "atec", desc: {
      pt: "Desenvolvimento web backend em PHP sob a arquitetura MVC, rotas e Eloquent ORM.",
      en: "Backend web development in PHP using the MVC architecture, routing, and Eloquent ORM." } },

  // Estágio / Internship
  { name: "Power BI", category: "estagio", desc: {
      pt: "Desenvolvimento de dashboards analíticos e transformação de dados.",
      en: "Building analytics dashboards and transforming data." } },
  { name: "DAX", category: "estagio", desc: {
      pt: "Criação de métricas, colunas calculadas e apresentando dados mais direcionados a necessidade da análise.",
      en: "Creation of metrics, calculated columns, and presenting data more tailored to the analysis needs." } },
  { name: "Power Automate", category: "estagio", desc: {
      pt: "Automação de fluxos de trabalho a partir da extração de dados de um Power BI e gerar um ficheiro .csv.",
      en: "Workflow automation from extracting data from Power BI and generating a .csv file." } },

  // Estudando / Studying
  { name: "SAP", category: "estudando", desc: {
      pt: "Curso Learning Item ADM005_BR_Col01 na plataforma SAP Learning, curso introdutório ao sistema.",
      en: "Learning Item ADM005_BR_Col01 course on the SAP Learning platform, introductory course to the system" } },
  { name: "IBM BOB", category: "estudando", desc: {
      pt: "Bootcamp na plataforma DIO para utilizar e criar projetos com IBM BOB que age em todo o SDLC.",
      en: "Bootcamp on the DIO platform to use and create projects with IBM BOB, which acts throughout the SDLC." } },

  // Outros / Others
  { name: {pt:"Idiomas", en:"Languages"}, category: "outros", desc: {
      pt: "Neste momento estou empenhada em aprimorar meu inglês e espanhol, iniciando o mandarim também. ",
      en: "Right now, I am committed to improving my English and Spanish, and also starting Mandarin" } }
];