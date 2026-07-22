// ==========================================================================
// ROUTER — navigation par hash (#accueil, #services, #devis, ...)
// ==========================================================================

const ROUTES = ["accueil", "services", "realisations", "devis", "apropos", "faq", "contact"];

function renderRoute() {
    let hash = (location.hash || "#accueil").replace("#", "");
    let [route, param] = hash.split("?");
    if (!ROUTES.includes(route)) route = "accueil";

    const app = document.getElementById("app");
    const renderers = {
        accueil: renderAccueil,
        services: renderServices,
        realisations: renderRealisations,
        devis: renderDevis,
        apropos: renderApropos,
        faq: renderFaq,
        contact: renderContact,
    };
    app.innerHTML = renderers[route](param);
    updateActiveNav(route);
    window.scrollTo({ top: 0, behavior: "instant" });

    // Init spécifique à la page
    if (route === "realisations") initRealisationsTabs();
    if (route === "devis") initDevisForm(param);
    if (route === "faq") initAccordion();
    if (route === "contact") initContactForm();

    closeMobileMenu();
}

function updateActiveNav(route) {
    document.querySelectorAll(".nav-menu a").forEach((a) => {
        a.classList.toggle("active", a.dataset.route === route);
    });
}

// ============ ACCUEIL ============
function renderAccueil() {
    return `
  <section class="hero">
    <div class="container hero-grid">
      <div>
        <span class="badge"><i class="bx bxs-star"></i> Sites vitrine, flyers & cartes</span>
        <h1>Donnez à votre image la <span class="accent">présence digitale</span> qu'elle mérite</h1>
        <p class="lead">Je conçois des sites web vitrine modernes et responsives, ainsi que des flyers, cartes de visite, cartes de mariage et cartes d'obsèques — pensés pour marquer les esprits.</p>
        <div class="hero-actions">
          <a href="#devis" class="btn btn-primary"><i class='bx bx-file'></i> DEMANDER UN DEVIS</a>
          <a href="#realisations" class="btn btn-outline">Voir mes réalisations</a>
        </div>
      </div>
      <div class="hero-visual">
        <i class='bx bx-code-alt'></i>
        <div class="hero-mini-icons">
          <i class='bx bxs-id-card'></i>
          <i class='bx bxs-heart'></i>
          <i class='bx bxs-file-image'></i>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="stats-bar">
        <div class="stat"><i class='bx bxs-check-shield'></i><div><strong>100%</strong><span>Sites responsives</span></div></div>
        <div class="stat"><i class='bx bxs-time-five'></i><div><strong>7-14j</strong><span>Délai de livraison</span></div></div>
        <div class="stat"><i class='bx bxs-code-block'></i><div><strong>HTML/CSS/JS</strong><span>Code pur & rapide</span></div></div>
        <div class="stat"><i class='bx bxs-badge-check'></i><div><strong>SEO</strong><span>Optimisé référencement</span></div></div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Mes services</span>
        <h2>Tout ce qu'il faut pour votre communication</h2>
        <p>Du site web à la carte imprimée, une seule adresse pour vos supports professionnels.</p>
      </div>
      <div class="grid grid-3">
        ${SERVICES.slice(0, 3).map(cardService).join("")}
      </div>
      <div class="text-center" style="margin-top:32px">
        <a href="#services" class="btn btn-outline">Voir tous les services <i class='bx bx-right-arrow-alt'></i></a>
      </div>
    </div>
  </section>
  `;
}

function cardService(s) {
    return `
  <div class="card">
    <div class="card-icon"><i class='bx ${s.icon}'></i></div>
    <h3>${s.title}</h3>
    <p>${s.desc}</p>
    <a href="#devis?cat=${s.id}" class="card-link">Demander un devis <i class='bx bx-right-arrow-alt'></i></a>
  </div>`;
}

// ============ SERVICES ============
function renderServices() {
    return `
  <section class="section">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Ce que je propose</span>
        <h2>Mes services</h2>
        <p>Des solutions sur mesure, adaptées à votre budget et à vos objectifs.</p>
      </div>
      <div class="grid grid-3">
        ${SERVICES.map(cardService).join("")}
      </div>
    </div>
  </section>`;
}

// ============ RÉALISATIONS ============
function renderRealisations() {
    return `
  <section class="section">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Portfolio</span>
        <h2>Mes réalisations</h2>
        <p>Un aperçu de projets livrés à mes clients.</p>
      </div>
      <div class="tabs">
        <button class="tab-btn active" data-tab="sitesWeb">Sites web vitrine</button>
        <button class="tab-btn" data-tab="flyers">Flyers</button>
        <button class="tab-btn" data-tab="cartes">Cartes</button>
      </div>
      <div id="realisations-content"></div>
    </div>
  </section>`;
}

function initRealisationsTabs() {
    const tabs = document.querySelectorAll(".tab-btn");
    tabs.forEach((btn) => {
        btn.addEventListener("click", () => {
            tabs.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            renderRealisationsContent(btn.dataset.tab);
        });
    });
    renderRealisationsContent("sitesWeb");
}

function renderRealisationsContent(type) {
    const el = document.getElementById("realisations-content");
    const data = REALISATIONS[type];
    if (!data || data.length === 0) {
        el.innerHTML = `<div class="empty-state"><i class='bx bx-folder-open'></i><p>Aucune réalisation ajoutée pour le moment dans cette catégorie.</code>.</p></div>`;
        return;
    }
    if (type === "sitesWeb") {
        el.innerHTML = `<div class="grid grid-3">${data
      .map(
        (r) => `
      <div class="realisation-card">
        <div class="realisation-media"><i class='bx bx-globe'></i></div>
        <div class="realisation-body">
          <h3>${r.titre}</h3>
          <p class="client"><i class='bx bxs-briefcase'></i> ${r.client}</p>
          <a href="${r.lien}" target="_blank" rel="noopener" class="btn btn-outline btn-sm btn-block">Visiter le site <i class='bx bx-link-external'></i></a>
        </div>
      </div>`
      )
      .join("")}</div>`;
  } else {
    el.innerHTML = `<div class="grid grid-3">${data
      .map(
        (r) => `
      <div class="realisation-card">
        <div class="realisation-media">${r.image ? `<img src="${r.image}" alt="${r.titre}">` : `<i class='bx bxs-image'></i>`}</div>
        <div class="realisation-body">
          <h3>${r.titre}</h3>
          <p class="client"><i class='bx bxs-briefcase'></i> ${r.client}</p>
        </div>
      </div>`
      )
      .join("")}</div>`;
  }
}

// ============ DEVIS ============
function renderDevis(param) {
  const preselect = (param || "").replace("cat=", "") || "site-vitrine";
  return `
  <section class="section">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Devis en ligne</span>
        <h2>Demander un devis</h2>
        <p>Choisissez une prestation, remplissez le formulaire, et recevez votre devis en PDF.</p>
      </div>

      <div class="devis-steps" id="devis-cats">
        ${Object.keys(DEVIS_PLANS)
          .map(
            (key) => `
          <button class="devis-cat-btn ${key === preselect ? "active" : ""}" data-cat="${key}">
            <i class='bx ${iconForCat(key)}'></i> ${DEVIS_PLANS[key].label}
          </button>`
          )
          .join("")}
      </div>

      <div class="plan-grid" id="devis-plans"></div>

      <form class="form-card" id="devis-form" novalidate>
        <div class="form-summary" id="devis-summary"></div>
        <div class="form-row">
          <div class="field">
            <label>Nom complet *</label>
            <input type="text" name="nom" required>
            <div class="field-error">Merci d'indiquer votre nom.</div>
          </div>
          <div class="field">
            <label>Téléphone / WhatsApp *</label>
            <input type="tel" name="telephone" required placeholder="6XX XXX XXX">
            <div class="field-error">Merci d'indiquer un numéro valide.</div>
          </div>
        </div>
        <div class="field">
          <label>Email</label>
          <input type="email" name="email">
        </div>
        <div class="field">
          <label>Description de votre projet *</label>
          <textarea name="description" required placeholder="Parlez-moi de votre activité, vos couleurs, vos contenus..."></textarea>
          <div class="field-error">Merci de décrire votre projet.</div>
        </div>
        <button type="submit" class="btn btn-primary btn-block"><i class='bx bx-file-blank'></i> Générer mon devis (PDF)</button>
      </form>
    </div>
  </section>

  <div class="modal-overlay" id="devis-modal">
    <div class="modal-box">
      <i class='bx bxs-check-circle modal-icon'></i>
      <h3>Votre devis est prêt !</h3>
      <p>Le PDF a été téléchargé sur votre appareil. Choisissez comment me l'envoyer pour finaliser votre demande :</p>
      <div class="modal-social-grid" id="devis-social-links"></div>
      <button class="btn btn-outline btn-block" style="margin-top:16px" id="devis-modal-close">Fermer</button>
    </div>
  </div>
  `;
}

function iconForCat(key) {
  return {
    "site-vitrine": "bx-laptop",
    flyers: "bxs-file-image",
    "cartes-mariage": "bxs-heart",
    "cartes-obseques": "bxs-flower",
  }[key] || "bx-file";
}

let devisState = { cat: null, plan: null };

function initDevisForm(param) {
  const preselect = (param || "").replace("cat=", "") || "site-vitrine";
  const cat = DEVIS_PLANS[preselect] ? preselect : "site-vitrine";
  devisState = { cat, plan: null };

  document.querySelectorAll(".devis-cat-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".devis-cat-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      devisState.cat = btn.dataset.cat;
      devisState.plan = null;
      renderPlans();
    });
  });

  renderPlans();

  document.getElementById("devis-form").addEventListener("submit", onDevisSubmit);
  document.getElementById("devis-modal-close").addEventListener("click", () => {
    document.getElementById("devis-modal").classList.remove("show");
  });
}

function renderPlans() {
  const catData = DEVIS_PLANS[devisState.cat];
  const wrap = document.getElementById("devis-plans");
  if (catData.plans.length === 1) devisState.plan = catData.plans[0].id;
  wrap.innerHTML = catData.plans
    .map(
      (p) => `
    <div class="plan-card ${p.id === devisState.plan ? "selected" : ""}" data-plan="${p.id}">
      <h4>${p.label}</h4>
      <!--<div class="plan-price">${p.min === p.max ? p.min.toLocaleString("fr-FR") : p.min.toLocaleString("fr-FR") + " - " + p.max.toLocaleString("fr-FR")} <span>${catData.unit}</span></div>-->
      <p>${p.desc}</p>
    </div>`
    )
    .join("");
  document.querySelectorAll(".plan-card").forEach((card) => {
    card.addEventListener("click", () => {
      devisState.plan = card.dataset.plan;
      document.querySelectorAll(".plan-card").forEach((c) => c.classList.remove("selected"));
      card.classList.add("selected");
      renderSummary();
    });
  });
  renderSummary();
}

function renderSummary() {
  const catData = DEVIS_PLANS[devisState.cat];
  const plan = catData.plans.find((p) => p.id === devisState.plan) || catData.plans[0];
  const summary = document.getElementById("devis-summary");
  summary.innerHTML = `
    <span><strong>${catData.label}</strong> — ${plan.label}</span>
    <!---<span class="price">${plan.min === plan.max ? plan.min.toLocaleString("fr-FR") : plan.min.toLocaleString("fr-FR") + " - " + plan.max.toLocaleString("fr-FR")} ${catData.unit}</span>--->
  `;
}

function onDevisSubmit(e) {
  e.preventDefault();
  const form = e.target;
  let valid = true;
  ["nom", "telephone", "description"].forEach((name) => {
    const field = form.querySelector(`[name="${name}"]`).closest(".field");
    if (!form[name].value.trim()) {
      field.classList.add("error");
      valid = false;
    } else field.classList.remove("error");
  });
  if (!valid) return;

  const catData = DEVIS_PLANS[devisState.cat];
  const plan = catData.plans.find((p) => p.id === devisState.plan) || catData.plans[0];

  genererDevisPDF({
    categorie: catData.label,
    planLabel: plan.label,
    prixMin: plan.min,
    prixMax: plan.max,
    unite: catData.unit,
    nom: form.nom.value,
    telephone: form.telephone.value,
    email: form.email.value,
    description: form.description.value,
  });

  renderSendSocialLinks("devis-social-links", `Bonjour, je viens de générer un devis (${catData.label} — ${plan.label}) sur cabrel.dev. Voici le PDF en pièce jointe.`);
  document.getElementById("devis-modal").classList.add("show");
}

function renderSendSocialLinks(containerId, message) {
  const msg = encodeURIComponent(message);
  const links = [
    { name: "WhatsApp", icon: "bxl-whatsapp", url: `https://wa.me/237${SOCIALS.whatsappNumber}?text=${msg}` },
    { name: "Telegram", icon: "bxl-telegram", url: SOCIALS.telegram },
    { name: "Facebook", icon: "bxl-facebook", url: SOCIALS.facebook },
    { name: "Instagram", icon: "bxl-instagram", url: SOCIALS.instagram },
    { name: "LinkedIn", icon: "bxl-linkedin", url: SOCIALS.linkedin },
  ];
  document.getElementById(containerId).innerHTML = links
    .map((l) => `<a href="${l.url}" target="_blank" rel="noopener"><i class='bx ${l.icon}'></i>${l.name}</a>`)
    .join("");
}

// ============ À PROPOS ============
function renderApropos() {
  return `
  <section class="section">
    <div class="container about-grid">
      <div class="about-photo"><i class='bx bxs-user-detail'></i></div>
      <div>
        <div class="about-block">
          <h3><i class='bx bxs-user'></i> Qui suis-je ?</h3>
          <p>Je suis Cabrel, concepteur de sites web vitrine et designer graphique, formé par Léonel Ngoya. J'accompagne les entreprises, commerces, associations et particuliers dans la création de supports de communication professionnels, modernes et adaptés à leurs besoins.</p>
        </div>
        <div class="about-block">
          <h3><i class='bx bxs-briefcase-alt'></i> Mon expérience</h3>
          <p>Je conçois des sites web vitrine modernes, performants et entièrement responsives en HTML, CSS et JavaScript — des interfaces élégantes et rapides, adaptées à tous les appareils. En complément, je réalise des flyers, cartes de visite, cartes de mariage et cartes d'obsèques, avec une attention particulière à la lisibilité et à l'identité visuelle de chaque client. J'accorde une grande importance à la qualité et à une collaboration basée sur l'écoute.</p>
        </div>
        <div class="about-block">
          <h3><i class='bx bxs-group'></i> Types de clients</h3>
          <div class="client-tags">
            ${["Entreprises et PME","Commerçants et boutiques","Restaurants et traiteurs","Hôtels et établissements touristiques","Cabinets, agences et bureaux","Écoles et centres de formation","Entrepreneurs et artisans","Professionnels libéraux","Particuliers (mariage, obsèques...)"].map(t => `<span>${t}</span>`).join("")}
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="section section-alt">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Pourquoi moi</span>
        <h2>Pourquoi me choisir</h2>
      </div>
      <div class="why-list" style="max-width:700px;margin:0 auto">
        ${["Design moderne et professionnel","Site responsive (ordinateur, tablette et smartphone)","Écoute et accompagnement tout au long du projet","Délais de livraison respectés (7 à 14 jours)","Tarifs compétitifs","Possibilité de modifications selon les besoins","Support après la livraison"].map(t => `<div class="why-item"><i class='bx bxs-check-circle'></i><span>${t}</span></div>`).join("")}
      </div>
    </div>
  </section>`;
}

// ============ FAQ ============
function renderFaq() {
  return `
  <section class="section">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Questions fréquentes</span>
        <h2>FAQ</h2>
        <p>Tout ce que vous devez savoir avant de démarrer votre projet.</p>
      </div>
      <div class="accordion">
        ${FAQS.map(
          (f, i) => `
        <div class="acc-item" data-i="${i}">
          <div class="acc-head"><span>${f.q}</span><i class='bx bx-chevron-down'></i></div>
          <div class="acc-body"><div class="acc-body-inner">${f.r}</div></div>
        </div>`
        ).join("")}
      </div>
    </div>
  </section>`;
}

function initAccordion() {
  document.querySelectorAll(".acc-item").forEach((item) => {
    item.querySelector(".acc-head").addEventListener("click", () => {
      const body = item.querySelector(".acc-body");
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".acc-item").forEach((i) => {
        i.classList.remove("open");
        i.querySelector(".acc-body").style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add("open");
        body.style.maxHeight = body.scrollHeight + "px";
      }
    });
  });
}

// ============ CONTACT ============
function renderContact() {
  return `
  <section class="section">
    <div class="container contact-grid">
      <div class="contact-info-card">
        <h3>Restons en contact</h3>
        <div class="contact-row"><i class='bx bxs-phone'></i><span>${SOCIALS.whatsappNumber}</span></div>
        <div class="contact-row"><i class='bx bxs-envelope'></i><span>${SOCIALS.email}</span></div>
        <div class="contact-row"><i class='bx bxs-map'></i><span>Bafoussam, Cameroun</span></div>
        <div class="social-row">
          <a href="${SOCIALS.whatsapp}" target="_blank" rel="noopener"><i class='bx bxl-whatsapp'></i></a>
          <a href="${SOCIALS.instagram}" target="_blank" rel="noopener"><i class='bx bxl-instagram'></i></a>
          <a href="${SOCIALS.telegram}" target="_blank" rel="noopener"><i class='bx bxl-telegram'></i></a>
          <a href="${SOCIALS.facebook}" target="_blank" rel="noopener"><i class='bx bxl-facebook'></i></a>
          <a href="${SOCIALS.linkedin}" target="_blank" rel="noopener"><i class='bx bxl-linkedin'></i></a>
        </div>
      </div>
      <form class="form-card" id="contact-form" novalidate style="margin:0">
        <div class="field">
          <label>Nom complet *</label>
          <input type="text" name="nom" required>
          <div class="field-error">Merci d'indiquer votre nom.</div>
        </div>
        <div class="field">
          <label>Email ou téléphone *</label>
          <input type="text" name="contactVia" required>
          <div class="field-error">Merci d'indiquer un moyen de vous contacter.</div>
        </div>
        <div class="field">
          <label>Message *</label>
          <textarea name="message" required placeholder="Comment puis-je vous aider ?"></textarea>
          <div class="field-error">Merci d'écrire un message.</div>
        </div>
        <button type="submit" class="btn btn-primary btn-block"><i class='bx bx-send'></i> Envoyer le message</button>
      </form>
    </div>
  </section>

  <div class="modal-overlay" id="contact-modal">
    <div class="modal-box">
      <i class='bx bxs-message-detail modal-icon'></i>
      <h3>Comment souhaitez-vous m'envoyer ce message ?</h3>
      <p>Choisissez le canal qui vous convient — votre message sera pré-rempli.</p>
      <div class="modal-social-grid" id="contact-social-links"></div>
      <button class="btn btn-outline btn-block" style="margin-top:16px" id="contact-modal-close">Fermer</button>
    </div>
  </div>`;
}

function initContactForm() {
  document.getElementById("contact-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    let valid = true;
    ["nom", "contactVia", "message"].forEach((name) => {
      const field = form.querySelector(`[name="${name}"]`).closest(".field");
      if (!form[name].value.trim()) {
        field.classList.add("error");
        valid = false;
      } else field.classList.remove("error");
    });
    if (!valid) return;
    const msg = `Bonjour Cabrel, je suis ${form.nom.value}. ${form.message.value}`;
    renderSendSocialLinks("contact-social-links", msg);
    document.getElementById("contact-modal").classList.add("show");
  });
  document.getElementById("contact-modal-close").addEventListener("click", () => {
    document.getElementById("contact-modal").classList.remove("show");
  });
}
