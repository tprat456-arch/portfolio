/* Main JS for portfolio */

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scroll handled by CSS scroll-smooth; add offset if needed

// Render helpers
function createProjectCard(p) {
  const div = document.createElement('div');
  div.className = 'rounded-xl border border-white/10 bg-white/5 p-5 hover:border-white/20 transition';
  div.innerHTML = `
    <div class="flex items-center justify-between">
      <h3 class="font-semibold">${p.title}</h3>
      <span class="text-xs text-neutral-400">${p.year || ''}</span>
    </div>
    <p class="text-neutral-300 text-sm mt-2">${p.description || ''}</p>
    <div class="mt-3 flex gap-2 flex-wrap">
      ${(p.tags || []).map(t => `<span class='text-xs px-2 py-1 rounded bg-white/10 border border-white/10'>${t}</span>`).join('')}
    </div>
    ${(p.link) ? `<a class="inline-flex items-center gap-2 text-sm text-primary-400 hover:text-primary-300 mt-3" href="${p.link}" target="_blank" rel="noopener">Voir le projet →</a>` : ''}
  `;
  return div;
}

function createVeilleItem(v) {
  const div = document.createElement('div');
  div.className = 'rounded-xl border border-white/10 bg-white/5 p-5 hover:border-white/20 transition';
  div.innerHTML = `
    <div class="flex items-center justify-between gap-4">
      <h3 class="font-semibold">${v.title}</h3>
      <span class="text-xs text-neutral-400">${v.date || ''}</span>
    </div>
    <p class="text-neutral-400 text-xs mt-1">${v.source || ''}${v.theme ? ' • ' + v.theme : ''}</p>
    <p class="text-neutral-300 text-sm mt-2">${v.summary || ''}</p>
    ${(v.link) ? `<a class="inline-flex items-center gap-2 text-sm text-primary-400 hover:text-primary-300 mt-3" href="${v.link}" target="_blank" rel="noopener">Lire l'article →</a>` : ''}
  `;
  return div;
}

async function loadJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Erreur de chargement: ' + url);
  return res.json();
}

async function bootstrap() {
  // CV embed: prefer image if available (works even without server), else try PDF when served over http(s)
  try {
    const iframe = document.getElementById('cv-embed');
    const img = document.getElementById('cv-image');
    const placeholder = document.getElementById('cv-placeholder');

    const testImg = new Image();
    testImg.onload = () => {
      if (img) img.classList.remove('hidden');
      if (placeholder) placeholder.classList.add('hidden');
    };
    testImg.onerror = async () => {
      // If running from local file protocol, just show the PDF iframe and let the browser try to render it
      if (location.protocol === 'file:') {
        if (iframe) iframe.classList.remove('hidden');
        if (placeholder) placeholder.classList.add('hidden');
      } else if (location.protocol.startsWith('http')) {
        try {
          const pdfRes = await fetch('./CV%20Design%20Web.pdf', { method: 'HEAD' });
          if (pdfRes.ok) {
            if (iframe) iframe.classList.remove('hidden');
            if (placeholder) placeholder.classList.add('hidden');
          }
        } catch (err) {
          console.warn('PDF check failed', err);
        }
      }
    };
    testImg.src = './assets/cv.jpg';
  } catch (e) {
    console.warn('CV display check failed', e);
  }

  // Load and render projects
  try {
    const projects = await loadJSON('./data/projects.json');
    const grid = document.getElementById('projects-grid');
    if (projects.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'col-span-full text-neutral-400 text-sm border border-dashed border-white/10 rounded-xl p-6 text-center';
      empty.textContent = 'Aucun projet pour le moment. Revenez bientôt !';
      grid.appendChild(empty);
    } else {
      projects.forEach(p => grid.appendChild(createProjectCard(p)));
    }
  } catch (e) {
    console.warn('Projects load failed', e);
  }

  // Load and render veille (with fallback mirroring reference)
  const list = document.getElementById('veille-list');
  function renderVeille(data) {
    list.innerHTML = '';
    const order = [
      'Définition',
      'Objectifs',
      'Outils',
      'Sujet & problématique',
      'Thème 1 — IA au grand public',
      'Thème 2 — Innovations 2025',
      'Thème 3 — Tech éthique'
    ];
    order.forEach(theme => {
      const items = data.filter(i => i.theme === theme);
      if (items.length > 0) {
        const h = document.createElement('h3');
        h.className = 'col-span-full text-lg font-semibold mt-6 first:mt-0';
        h.textContent = theme;
        list.appendChild(h);
        items.forEach(v => list.appendChild(createVeilleItem(v)));
      }
    });
  }
  const veilleFallback = [
    {
      title: "Qu'est-ce que la veille technologique ?",
      date: "",
      source: "",
      theme: "Définition",
      summary: "La veille technologique consiste à surveiller les évolutions techniques et les innovations d’un secteur, à sélectionner les informations les plus pertinentes et récentes pour gagner du temps, et à organiser la collecte, le partage et la diffusion des informations afin d’anticiper les changements.",
      link: ""
    },
    {
      title: "Quel est le but d'une veille technologique ?",
      date: "",
      source: "",
      theme: "Objectifs",
      summary: "- Suivre les évolutions techniques\n- Être informé des inventions et innovations des concurrents\n- Diminuer les coûts de production\n- Augmenter les compétences",
      link: ""
    },
    {
      title: "Quels sont les outils de ma veille ?",
      date: "",
      source: "",
      theme: "Outils",
      summary: "Google Actualités & Alertes (se tenir informé des dernières technologies), Feedly (agrégateur de flux RSS complet), Twitter/X (suivre les dernières innovations).",
      link: ""
    },
    {
      title: "Quel a été le sujet de ma veille ?",
      date: "",
      source: "",
      theme: "Sujet & problématique",
      summary: "J’ai traité du sujet de l’IA et des dernières innovations technologiques. Problématique: Quelles avancées technologiques récentes façonnent notre avenir ? Thèmes: 1) L’ouverture de l’IA au grand public 2) Les innovations 2025 3) Une technologie éthique est-elle possible ?",
      link: ""
    },
    {
      title: "OpenAI va sortir un nouveau modèle open source",
      date: "2025-04-07",
      source: "GoodTech.info",
      theme: "Thème 1 — IA au grand public",
      summary: "OpenAI prévoit un modèle à poids ouverts, rendant ses technologies plus accessibles au public et à la recherche.",
      link: "https://www.lespecialiste.be/fr/actualites/e-health/ces-2025-un-apercu-des-avancees-technologiques-pour-la-sante.html?utm_source=chatgpt.com"
    },
    {
      title: "Un appel pour une IA plus responsable et locale",
      date: "2025-04-07",
      source: "GoodTech.info",
      theme: "Thème 1 — IA au grand public",
      summary: "Des experts appellent à des IA locales, personnalisables et open source pour protéger les données et démocratiser l’accès.",
      link: ""
    },
    {
      title: "Une main bionique ultra-réaliste",
      date: "2025-04-03",
      source: "EconomieDuSavoir / PSYONIC",
      theme: "Thème 2 — Innovations 2025",
      summary: "Une main bionique offrant un retour sensoriel précis et un contrôle naturel.",
      link: ""
    },
    {
      title: "Un capteur de glucose non-invasif",
      date: "2025-04-03",
      source: "EconomieDuSavoir / Abbott",
      theme: "Thème 2 — Innovations 2025",
      summary: "Biocapteur qui surveille le glucose en continu sans piqûre.",
      link: ""
    },
    {
      title: "Une technologie éthique est-elle possible ?",
      date: "2025-03-22",
      source: "VaticanNews",
      theme: "Thème 3 — Tech éthique",
      summary: "Réflexions sur la gouvernance, responsabilité et transparence.",
      link: ""
    }
  ];

  try {
    const veille = await loadJSON('./data/veille.json');
    const data = Array.isArray(veille) && veille.length > 0 ? veille : veilleFallback;
    renderVeille(data);
  } catch (e) {
    console.warn('Veille load failed, rendering fallback', e);
    renderVeille(veilleFallback);
  }
}

bootstrap();
