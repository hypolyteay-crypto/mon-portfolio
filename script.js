/* ==========================================================================
   1. Données des projets
   Ajoutez ou modifiez les éléments de cette liste pour actualiser la galerie.
   ========================================================================== */

const projects = [
  {
    title: "Studio Créatif",
    category: "Site vitrine",
    description:
      "Un site élégant et responsive pour un studio indépendant, avec une galerie de réalisations et une navigation fluide.",
    tags: ["HTML", "CSS", "JavaScript"],
    mark: "✳",
    background: "linear-gradient(135deg, #dedaff 0%, #f5e8ff 100%)",
    markColor: "#6659dd",
    codeUrl: "https://github.com/votre-pseudo/studio-creatif",
    demoUrl: "https://votre-pseudo.github.io/studio-creatif/"
  },
  {
    title: "Tableau de bord",
    category: "Application web",
    description:
      "Une interface de suivi qui rassemble les indicateurs essentiels dans un tableau de bord clair et facile à parcourir.",
    tags: ["JavaScript", "API REST", "CSS Grid"],
    mark: "▦",
    background: "linear-gradient(135deg, #d6f5ee 0%, #e7f2ff 100%)",
    markColor: "#218f7b",
    codeUrl: "https://github.com/votre-pseudo/tableau-de-bord",
    demoUrl: "https://votre-pseudo.github.io/tableau-de-bord/"
  },
  {
    title: "Carnet de voyage",
    category: "Projet personnel",
    description:
      "Un carnet numérique pour organiser ses escapades, conserver ses adresses préférées et partager ses itinéraires.",
    tags: ["React", "Node.js", "PostgreSQL"],
    mark: "⌖",
    background: "linear-gradient(135deg, #ffe6d4 0%, #fff2cb 100%)",
    markColor: "#c56e3f",
    codeUrl: "https://github.com/votre-pseudo/carnet-de-voyage",
    demoUrl: "https://votre-pseudo.github.io/carnet-de-voyage/"
  }
];

/* ==========================================================================
   2. Génération des cartes de projets
   Le contenu texte est ajouté avec textContent pour éviter d’interpréter du HTML.
   ========================================================================== */

const projectsGrid = document.querySelector("#projects-grid");

function createProjectCard(project) {
  const article = document.createElement("article");
  article.className = "project-card reveal";

  const visual = document.createElement("div");
  visual.className = "project-card__visual";
  visual.setAttribute("aria-hidden", "true");
  visual.style.setProperty("--project-background", project.background);
  visual.style.setProperty("--project-mark-color", project.markColor);

  const visualMark = document.createElement("span");
  visualMark.className = "project-card__visual-mark";
  visualMark.textContent = project.mark;
  visual.append(visualMark);

  const content = document.createElement("div");
  content.className = "project-card__content";

  const category = document.createElement("p");
  category.className = "project-card__category";
  category.textContent = project.category;

  const title = document.createElement("h3");
  title.className = "project-card__title";
  title.textContent = project.title;

  const description = document.createElement("p");
  description.className = "project-card__description";
  description.textContent = project.description;

  const tags = document.createElement("ul");
  tags.className = "project-card__tags";
  tags.setAttribute("aria-label", `Technologies utilisées pour ${project.title}`);

  project.tags.forEach((tag) => {
    const item = document.createElement("li");
    item.className = "project-card__tag";
    item.textContent = tag;
    tags.append(item);
  });

  const links = document.createElement("div");
  links.className = "project-card__links";

  const codeLink = createProjectLink(project.codeUrl, "Code source");
  const demoLink = createProjectLink(project.demoUrl, "Démo live");

  links.append(codeLink, demoLink);
  content.append(category, title, description, tags, links);
  article.append(visual, content);

  return article;
}

function createProjectLink(url, label) {
  const link = document.createElement("a");
  link.className = "project-card__link";
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  const text = document.createElement("span");
  text.textContent = label;

  const arrow = document.createElement("span");
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "↗";

  link.append(text, arrow);
  return link;
}

if (projectsGrid) {
  const fragment = document.createDocumentFragment();
  projects.forEach((project) => fragment.append(createProjectCard(project)));
  projectsGrid.replaceChildren(fragment);
}

/* ==========================================================================
   3. Thème clair / sombre
   Le choix est conservé dans le stockage local quand celui-ci est disponible.
   ========================================================================== */

const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-toggle__icon");
const themeStorageKey = "portfolio-theme";

function readSavedTheme() {
  try {
    const savedTheme = window.localStorage.getItem(themeStorageKey);
    return savedTheme === "dark" || savedTheme === "light" ? savedTheme : null;
  } catch {
    return null;
  }
}

function applyTheme(theme, persist = false) {
  root.dataset.theme = theme;

  if (themeToggle && themeIcon) {
    const isDark = theme === "dark";
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Activer le thème clair" : "Activer le thème sombre"
    );
    themeIcon.textContent = isDark ? "☀" : "☾";
  }

  if (persist) {
    try {
      window.localStorage.setItem(themeStorageKey, theme);
    } catch {
      // Le thème reste actif pour cette page même si le stockage est indisponible.
    }
  }
}

applyTheme(readSavedTheme() || "light");

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme, true);
});

/* ==========================================================================
   4. Menu mobile accessible
   ========================================================================== */

const menuToggle = document.querySelector(".site-header__menu-toggle");
const navigation = document.querySelector(".site-header__navigation");
const mobileBreakpoint = window.matchMedia("(max-width: 700px)");

function setMenuOpen(isOpen) {
  if (!menuToggle || !navigation) {
    return;
  }

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
  navigation.classList.toggle("site-header__navigation--open", isOpen);
}

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  setMenuOpen(!isOpen);
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuOpen(false);
  }
});

mobileBreakpoint.addEventListener("change", (event) => {
  if (!event.matches) {
    setMenuOpen(false);
  }
});

/* ==========================================================================
   5. En-tête compact au défilement
   ========================================================================== */

const siteHeader = document.querySelector("#site-header");

function updateHeaderOnScroll() {
  siteHeader?.classList.toggle("site-header--scrolled", window.scrollY > 24);
}

window.addEventListener("scroll", updateHeaderOnScroll, { passive: true });
updateHeaderOnScroll();

/* ==========================================================================
   6. Apparition progressive avec IntersectionObserver
   ========================================================================== */

const revealElements = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if ("IntersectionObserver" in window && !prefersReducedMotion.matches) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal--visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("reveal--visible"));
}

/* ==========================================================================
   7. Formulaire de contact
   Valide les champs côté client et prépare un e-mail via l’application locale.
   ========================================================================== */

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const contactEmail = "bonjour@votrenom.fr";

contactForm?.addEventListener("input", (event) => {
  const field = event.target;

  if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
    field.setCustomValidity("");
  }
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!(contactForm instanceof HTMLFormElement) || !formStatus) {
    return;
  }

  const formData = new FormData(contactForm);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const subject = String(formData.get("subject") || "").trim();
  const message = String(formData.get("message") || "").trim();

  const nameField = contactForm.elements.namedItem("name");
  const subjectField = contactForm.elements.namedItem("subject");
  const messageField = contactForm.elements.namedItem("message");

  if (nameField instanceof HTMLInputElement) {
    nameField.setCustomValidity(name.length >= 2 ? "" : "Veuillez saisir au moins 2 caractères.");
  }

  if (subjectField instanceof HTMLInputElement) {
    subjectField.setCustomValidity(subject.length >= 3 ? "" : "Veuillez saisir un sujet d’au moins 3 caractères.");
  }

  if (messageField instanceof HTMLTextAreaElement) {
    messageField.setCustomValidity(message.length >= 10 ? "" : "Votre message doit contenir au moins 10 caractères.");
  }

  if (!contactForm.reportValidity()) {
    formStatus.textContent = "";
    return;
  }

  const emailSubject = encodeURIComponent(subject);
  const emailBody = encodeURIComponent(
    `Bonjour,\n\n${message}\n\nCordialement,\n${name}\n${email}`
  );

  formStatus.textContent =
    "Votre application de messagerie va s’ouvrir avec le message prérempli.";

  window.location.href =
    `mailto:${contactEmail}?subject=${emailSubject}&body=${emailBody}`;
});

/* ==========================================================================
   8. Année du copyright
   ========================================================================== */

const currentYear = document.querySelector("#current-year");

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}