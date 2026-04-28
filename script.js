const revealElements = document.querySelectorAll('.reveal');
const navToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const yearElement = document.getElementById('year');
const langButtons = document.querySelectorAll('.lang-btn');

const translations = {
  fr: {
    navAbout: 'À propos',
    navServices: 'Services',
    navEbo: 'EBO / GTB',
    navProcess: 'Méthode',
    navProjects: 'Projets',
    navContact: 'Contact',
    heroEyebrow: 'Rénovation premium + technologies intelligentes',
    heroTitle: 'Rénovation moderne. Espaces intelligents.',
    heroSubtitle:
      'Hypervision transforme les logements et espaces professionnels grâce à une rénovation de qualité et à l’intégration de technologies intelligentes.',
    heroCtaPrimary: 'Demander un devis',
    heroCtaSecondary: 'Découvrir nos solutions',
    dashboardTitle: 'Supervision bâtiment',
    dashboardLive: 'En direct',
    metricLight: 'Éclairage',
    metricLightText: 'Scénarios intelligents par zone',
    metricHeat: 'Chauffage',
    metricHeatText: 'Régulation adaptative',
    metricEnergy: 'Énergie',
    metricEnergyText: 'Optimisation en continu',
    metricAccess: 'Accès',
    metricAccessText: 'Contrôle connecté',
    aboutTitle: 'Une expertise complète: rénovation, design, automatisme et GTB.',
    aboutText:
      'Hypervision combine rénovation intérieure, design fonctionnel, domotique, supervision technique et technologies smart building. Notre objectif est de créer des espaces esthétiques, confortables, connectés, performants sur le plan énergétique et prêts pour les usages futurs.',
    servicesTitle: 'Nos services de rénovation intelligente',
    servicesSubtitle:
      'Nous réalisons des projets haut de gamme qui associent qualité d’exécution, automatisation et supervision technique.',
    service1Title: 'Rénovation intérieure',
    service1Text: 'Transformation premium des espaces résidentiels et professionnels.',
    service2Title: 'Éclairage intelligent',
    service2Text: 'Pilotage lumineux par scénarios pour le confort et l’efficacité.',
    service3Title: 'Régulation chauffage et optimisation énergétique',
    service3Text: 'Gestion thermique intelligente pour améliorer la performance énergétique.',
    service4Title: 'Domotique et automatisme bâtiment',
    service4Text: 'Automatisation des fonctions clés pour un usage fluide et moderne.',
    service5Title: 'Supervision GTB / GTC',
    service5Text: 'Vision centralisée des équipements techniques et des performances.',
    service6Title: 'Interfaces graphiques et tableaux de bord',
    service6Text: 'Synoptiques modernes et dashboards clairs pour piloter vos installations.',
    service7Title: 'Sécurité connectée et contrôle d’accès',
    service7Text: 'Gestion sécurisée des accès et de la supervision de sûreté.',
    service8Title: 'Programmation EBO et assistance technique GTB',
    service8Text: 'Support expert pour les entreprises sur les projets EBO, automatisme et supervision.',
    eboEyebrow: 'Service dédié entreprises',
    eboTitle: 'Programmation EBO et assistance GTB pour les entreprises',
    eboText:
      'Hypervision accompagne les entreprises, intégrateurs et bureaux techniques dans leurs projets de supervision et d’automatisation bâtiment. Nous pouvons intervenir sur la programmation EBO, la création de synoptiques, l’intégration BACnet/Modbus, l’analyse des points, les alarmes, les commandes, les tests et la mise en service.',
    eboCta: 'Nous contacter pour une assistance technique',
    eboItem1: 'Programmation EBO',
    eboItem2: 'Création et modification de synoptiques',
    eboItem3: 'Intégration BACnet et Modbus',
    eboItem4: 'Analyse des listes de points',
    eboItem5: 'Support d’analyse fonctionnelle',
    eboItem6: 'Configuration d’alarmes',
    eboItem7: 'Logiques de commande et statuts',
    eboItem8: 'Support tests et mise en service',
    eboItem9: 'Dépannage et assistance technique',
    eboItem10: 'Support projets automatisme et supervision',
    whyTitle: 'Pourquoi choisir Hypervision',
    why1: 'Approche moderne et premium',
    why2: 'Expertise en rénovation et technologies intelligentes',
    why3: 'Compétences en GTB, supervision et automatisme',
    why4: 'Solutions personnalisées',
    why5: 'Design propre et professionnel',
    why6: 'Confort, performance énergétique et évolutivité',
    why7: 'Assistance technique pour entreprises',
    processTitle: 'Notre méthode projet',
    process1: 'Échange et compréhension du besoin',
    process2: 'Analyse technique',
    process3: 'Proposition de solution',
    process4: 'Rénovation et intégration',
    process5: 'Programmation et configuration',
    process6: 'Tests, mise en service et accompagnement',
    projectsTitle: 'Projets & références',
    project1Title: 'Rénovation d’un appartement connecté',
    project1Text: 'Éclairage, chauffage et pilotage intelligent centralisé.',
    project2Title: 'Bureau intelligent avec supervision',
    project2Text: 'Espace de travail modernisé avec supervision GTB en temps réel.',
    project3Title: 'Villa optimisée en énergie',
    project3Text: 'Rénovation premium et optimisation énergétique multi-systèmes.',
    project4Title: 'Interface de supervision GTB',
    project4Text: 'Conception de synoptiques clairs pour le pilotage bâtiment.',
    project5Title: 'Assistance EBO pour intégrateur',
    project5Text: 'Support programmation, alarmes et mise en service sur projet tertiaire.',
    contactTitle: 'Parlons de votre projet de rénovation intelligente.',
    contactText:
      'Notre équipe vous propose une solution adaptée pour rénover, automatiser et superviser vos espaces de façon durable.',
    formName: 'Nom',
    formEmail: 'Email',
    formPhone: 'Téléphone',
    formProjectType: 'Type de projet',
    formSelectPlaceholder: 'Sélectionnez un type de projet',
    formOption1: 'Rénovation résidentielle intelligente',
    formOption2: 'Modernisation de bureaux / tertiaire',
    formOption3: 'Projet GTB / supervision',
    formOption4: 'Assistance EBO et programmation technique',
    formMessage: 'Message',
    formCta: 'Démarrer votre projet',
    footerText: '© {year} Hypervision. Rénovation moderne, technologies intelligentes et expertise GTB.'
  },
  en: {
    navAbout: 'About',
    navServices: 'Services',
    navEbo: 'EBO / BMS',
    navProcess: 'Process',
    navProjects: 'Projects',
    navContact: 'Contact',
    heroEyebrow: 'Premium renovation + smart technologies',
    heroTitle: 'Modern Renovation. Smart Spaces.',
    heroSubtitle:
      'Hypervision transforms homes and professional spaces through premium renovation and integrated intelligent technologies.',
    heroCtaPrimary: 'Request a quote',
    heroCtaSecondary: 'Discover our solutions',
    dashboardTitle: 'Building supervision',
    dashboardLive: 'Live',
    metricLight: 'Lighting',
    metricLightText: 'Smart scenarios by zone',
    metricHeat: 'Heating',
    metricHeatText: 'Adaptive control',
    metricEnergy: 'Energy',
    metricEnergyText: 'Continuous optimization',
    metricAccess: 'Access',
    metricAccessText: 'Connected control',
    aboutTitle: 'Complete expertise: renovation, design, automation and BMS.',
    aboutText:
      'Hypervision combines interior renovation, functional design, smart home systems, technical supervision and smart building technologies. Our goal is to deliver spaces that are elegant, comfortable, connected, energy-efficient and future-ready.',
    servicesTitle: 'Our smart renovation services',
    servicesSubtitle:
      'We deliver premium projects that combine high-quality execution, automation and technical supervision.',
    service1Title: 'Interior renovation',
    service1Text: 'Premium transformation of residential and professional spaces.',
    service2Title: 'Smart lighting control',
    service2Text: 'Scenario-based lighting control for comfort and efficiency.',
    service3Title: 'Heating control and energy optimization',
    service3Text: 'Intelligent thermal management to improve energy performance.',
    service4Title: 'Smart home and building automation',
    service4Text: 'Automation of key functions for smooth and modern daily use.',
    service5Title: 'BMS / BEMS supervision',
    service5Text: 'Centralized view of technical systems and performance.',
    service6Title: 'Graphical interfaces and dashboards',
    service6Text: 'Modern synoptics and clear dashboards for operational control.',
    service7Title: 'Connected security and access control',
    service7Text: 'Secure control of access and connected safety supervision.',
    service8Title: 'EBO programming and BMS technical assistance',
    service8Text: 'Expert support for companies on EBO, automation and supervision projects.',
    eboEyebrow: 'Dedicated service for companies',
    eboTitle: 'EBO programming and BMS assistance for companies',
    eboText:
      'Hypervision supports companies, system integrators and engineering offices on building supervision and automation projects. We can contribute to EBO programming, synoptic graphics, BACnet/Modbus integration, point list analysis, alarms, control logic, testing and commissioning.',
    eboCta: 'Contact us for technical assistance',
    eboItem1: 'EBO programming',
    eboItem2: 'Creation and update of supervision graphics',
    eboItem3: 'BACnet and Modbus integration',
    eboItem4: 'Point list analysis',
    eboItem5: 'Functional analysis support',
    eboItem6: 'Alarm configuration',
    eboItem7: 'Command and status logic',
    eboItem8: 'Testing and commissioning support',
    eboItem9: 'Troubleshooting and technical assistance',
    eboItem10: 'Support for automation and supervision projects',
    whyTitle: 'Why choose Hypervision',
    why1: 'Modern and premium approach',
    why2: 'Expertise in renovation and smart technologies',
    why3: 'Skills in BMS, supervision and automation',
    why4: 'Custom solutions',
    why5: 'Clean and professional design',
    why6: 'Comfort, energy performance and scalability',
    why7: 'Technical support for professional companies',
    processTitle: 'Our project method',
    process1: 'Discussion and needs understanding',
    process2: 'Technical analysis',
    process3: 'Solution proposal',
    process4: 'Renovation and integration',
    process5: 'Programming and configuration',
    process6: 'Testing, commissioning and support',
    projectsTitle: 'Projects & portfolio',
    project1Title: 'Connected apartment renovation',
    project1Text: 'Centralized smart control for lighting and heating.',
    project2Title: 'Smart office with supervision',
    project2Text: 'Modernized workspace with real-time building supervision.',
    project3Title: 'Energy-optimized villa',
    project3Text: 'Premium renovation with multi-system energy optimization.',
    project4Title: 'BMS supervision interface',
    project4Text: 'Clear synoptics designed for building operations.',
    project5Title: 'EBO support for integrator',
    project5Text: 'Programming, alarms and commissioning support on tertiary project.',
    contactTitle: 'Let’s discuss your smart renovation project.',
    contactText:
      'Our team prepares tailored solutions to renovate, automate and supervise your spaces in a sustainable way.',
    formName: 'Name',
    formEmail: 'Email',
    formPhone: 'Phone',
    formProjectType: 'Project type',
    formSelectPlaceholder: 'Select a project type',
    formOption1: 'Smart residential renovation',
    formOption2: 'Office / commercial modernization',
    formOption3: 'BMS / supervision project',
    formOption4: 'EBO assistance and technical programming',
    formMessage: 'Message',
    formCta: 'Start your project',
    footerText: '© {year} Hypervision. Modern renovation, smart technologies and BMS expertise.'
  }
};

const applyLanguage = (lang) => {
  const dictionary = translations[lang] || translations.fr;

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    if (!dictionary[key]) return;

    if (key === 'footerText') {
      element.innerHTML = dictionary[key].replace('{year}', String(new Date().getFullYear()));
      return;
    }

    element.textContent = dictionary[key];
  });

  document.documentElement.lang = lang;
  langButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.lang === lang);
  });
};

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  { threshold: 0.18 }
);

revealElements.forEach((element) => observer.observe(element));

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

langButtons.forEach((button) => {
  button.addEventListener('click', () => applyLanguage(button.dataset.lang));
});

applyLanguage('fr');
