/* (Pt)I18N — idioma da página: textos da interface, troca PT/EN e memória da escolha.
   Para ajustar um texto da interface, edite o dicionário abaixo.
   Descrições das tecnologias ficam em js/data.js.
   (En)I18N — page language: interface texts, PT/EN switch and memory of choice.
   To adjust an interface text, edit the dictionary below.
   Descriptions of technologies are in js/data.js. */

const I18N = {
  pt: {
    htmlLang: "pt-BR",
    pageTitle: "Minha trilha de estudos",
    title: "Minha trilha de estudos",
    subtitle: "Um registro honesto da jornada — não um mapa do que domino",
    "cat.atec": "formação ATEC",
    "cat.estagio": "estágio",
    "cat.estudando": "estudando",
    "cat.outros": "outros",
    panelHeading: "💡 Conhecimento & Prática",
    close: "Fechar explicação",
    langLabel: "Idioma",
    tileAria: (n, name, cat) => `Casa ${n}: ${name} (${cat})`
  },
  en: {
    htmlLang: "en",
    pageTitle: "My study trail",
    title: "My study trail",
    subtitle: "An honest record of the journey — not a map of what I master",
    "cat.atec": "ATEC training",
    "cat.estagio": "internship",
    "cat.estudando": "studying",
    "cat.outros": "others",
    panelHeading: "💡 Knowledge & Practice",
    close: "Close explanation",
    langLabel: "Language",
    tileAria: (n, name, cat) => `Square ${n}: ${name} (${cat})`
  }
};

const LANG_KEY = "trilha-lang";
const DEFAULT_LANG = "pt";
let currentLang = loadLang();
const langListeners = [];

function loadLang() {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved && I18N[saved]) return saved;
  } catch (e) { /* armazenamento indisponível: segue com o padrão */ }
  return DEFAULT_LANG;
}

/** (PT)Texto da interface na língua atual. Valores-função recebem os argumentos extras. 
 * (EN)Interface text in the current language. Function values receive the extra arguments.*/
function t(key, ...args) {
  const value = I18N[currentLang][key];
  return typeof value === "function" ? value(...args) : value;
}

/** (Pt) Escolhe a língua atual dentro de um objeto { pt: "...", en: "..." }. 
 * (En) Choose the current language within an object { pt: "...", en: "..." }.*/
function localized(obj) {
  return obj[currentLang] ?? obj[DEFAULT_LANG];
}

/** (Pt) Nome da tecnologia: texto simples ("HTML") ou um por idioma ({ pt: "Idiomas", en: "Languages" }).
 * (En) Technology name: simple text ("HTML") or a per-language object ({ pt: "Languages", en: "Languages" }). */
function techName(tech) {
  return typeof tech.name === "string" ? tech.name : localized(tech.name);
}

/** (Pt) Atualiza tudo o que é texto fixo no HTML (elementos com data-i18n) e o estado do botão. 
 * (En) Updates everything that is fixed text in the HTML (elements with data-i18n) and the state of the button.*/
function applyStaticTexts() {
  document.documentElement.lang = t("htmlLang");
  document.title = t("pageTitle");
  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach(el => {
    el.setAttribute("aria-label", t(el.dataset.i18nAria));
  });
  document.querySelectorAll(".lang-switch [data-lang]").forEach(btn => {
    btn.setAttribute("aria-pressed", String(btn.dataset.lang === currentLang));
  });
}

/** (Pt) Registra uma função para ser chamada sempre que a língua mudar. 
 * (En) Registers a function to be called every time the language changes.*/
function onLanguageChange(fn) {
  langListeners.push(fn);
}

function setLang(lang) {
  if (!I18N[lang] || lang === currentLang) return;
  currentLang = lang;
  try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* ignora */ }
  applyStaticTexts();
  langListeners.forEach(fn => fn());
}