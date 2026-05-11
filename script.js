const translations = {
  en: {
    navHome: "Home",
    navActions: "Expertise",
    navServices: "Services",
    navDemo: "Demo",
    navMethod: "Method",
    navAbout: "About",
    navContact: "Contact",
    diagnosticCta: "Request an assessment",
    menuLabel: "Open navigation",
    heroKicker: "Electrical engineering, BMS and supervision",
    heroTitle: "Smarter buildings, better controlled and more efficient.",
    heroSubtitle:
      "Hypervision designs and integrates electrical, BMS and supervision solutions to make buildings clearer, more efficient and easier to operate.",
    heroPrimary: "Request an assessment",
    heroSecondary: "View the demo",
    heroDemoKicker: "Supervision interface",
    heroDemoTitle: "South building",
    controlLights: "Light",
    controlClimate: "HVAC",
    controlBlinds: "Blinds",
    controlSecurity: "Presence",
    actionsEyebrow: "What we do",
    actionsTitle: "Making technical installations clearer to operate.",
    actionControlTitle: "Control",
    actionControlText: "Centralize useful commands so teams can act quickly without complicating operations.",
    actionSuperviseTitle: "Supervise",
    actionSuperviseText: "View statuses, alarms and consumption in a readable interface.",
    actionOptimizeTitle: "Optimize",
    actionOptimizeText: "Detect drifts and adjust scenarios to improve performance.",
    servicesEyebrow: "Services",
    servicesTitle: "Precise, maintainable technical interventions.",
    serviceElectricalTitle: "Technical electrical work",
    serviceElectricalText:
      "Installation, renovation and integration of electrical equipment for professional buildings.",
    serviceBmsTitle: "BMS / BEMS",
    serviceBmsText: "Centralized control of technical equipment for a better-managed building.",
    serviceSupervisionTitle: "Supervision",
    serviceSupervisionText: "Clear visual interfaces to monitor statuses, alarms and commands.",
    serviceAutomationTitle: "Automation",
    serviceAutomationText: "Coherent control logic to simplify building operation.",
    serviceEnergyTitle: "Energy monitoring",
    serviceEnergyText: "Measurement, visualization and detection of consumption drifts.",
    serviceEboTitle: "EBO assistance",
    serviceEboText: "Technical support for integrators and companies on programming and supervision.",
    demoEyebrow: "Interactive demo",
    demoTitle: "Control a building in a few gestures.",
    demoText: "A clear interface makes it possible to view and control building equipment in a few gestures.",
    metricComfort: "Comfort",
    metricEnergy: "Energy",
    metricMode: "Mode",
    demoPanelKicker: "Live supervision",
    demoPanelTitle: "Operations level",
    switchLightsTitle: "Light",
    switchClimateTitle: "HVAC / climate",
    switchBlindsTitle: "Blinds",
    switchSecurityTitle: "Presence",
    floatingEnergy: "Energy",
    floatingTemp: "Ambience",
    methodEyebrow: "Method",
    methodTitle: "A simple path, from field analysis to commissioning.",
    methodStep1Title: "Analysis",
    methodStep1Text: "Understand the installation, uses and real constraints.",
    methodStep2Title: "Structuring",
    methodStep2Text: "Organize points, alarms, commands and scenarios clearly.",
    methodStep3Title: "Integration",
    methodStep3Text: "Connect equipment and program useful logic.",
    methodStep4Title: "Commissioning",
    methodStep4Text: "Test statuses, commands, alarms and field feedback.",
    aboutEyebrow: "Hypervision",
    aboutTitle: "A technical, readable and field-aware approach.",
    aboutText:
      "Hypervision works at the intersection of electrical engineering, automation, BMS and supervision. The goal: deliver serious, maintainable and genuinely operational solutions.",
    aboutAudience: "Professional and tertiary buildings, integrators, installers and premium private clients.",
    credibilityBlock1: "Real field analysis",
    credibilityBlock2: "Maintainable solutions",
    credibilityBlock3: "Functional tests",
    credibilityBlock4: "Clear approach",
    contactEyebrow: "Contact",
    contactTitle: "Let's discuss your technical project",
    contactText: "Installation, renovation, BMS, supervision or technical assistance: let's discuss your need.",
    contactCta: "Request an assessment",
    formName: "Name",
    formCompany: "Company",
    formEmail: "Email",
    formPhone: "Phone",
    formNeed: "Type of need",
    formNeedPlaceholder: "Select the main need",
    formOptionElectrical: "Technical electrical work",
    formOptionBms: "BMS / supervision",
    formOptionAutomation: "Automation",
    formOptionEnergy: "Energy monitoring",
    formOptionEbo: "EBO / integrator assistance",
    formOptionOther: "Other technical request",
    formMessage: "Message",
    formSubmit: "Send request",
    footerTagline: "Electrical engineering, BMS and supervision for smart buildings.",
    footerCountry: "France",
    footerRights: "All rights reserved."
  }
};

const metaByLanguage = {
  fr: {
    title: "Hypervision - \u00c9lectricit\u00e9, GTB et supervision pour b\u00e2timents intelligents",
    description:
      "Hypervision con\u00e7oit et int\u00e8gre des solutions d'\u00e9lectricit\u00e9 technique, GTB, supervision, automatisation et suivi \u00e9nerg\u00e9tique pour rendre les b\u00e2timents plus lisibles et performants.",
    locale: "fr_FR"
  },
  en: {
    title: "Hypervision - Electrical engineering, BMS and supervision for smart buildings",
    description:
      "Hypervision designs and integrates electrical, BMS, supervision, automation and energy monitoring solutions for professional smart buildings.",
    locale: "en_US"
  }
};

const demoCopy = {
  fr: {
    summary(activeCount) {
      return activeCount === 0 ? "Veille technique" : `${activeCount} lots actifs`;
    },
    active: {
      lights: "Activ\u00e9e",
      climate: "R\u00e9gul\u00e9",
      blinds: "Ouverts",
      security: "S\u00e9curis\u00e9e"
    },
    inactive: {
      lights: "\u00c9teinte",
      climate: "Veille",
      blinds: "Ferm\u00e9s",
      security: "Veille"
    },
    comfort: {
      optimal: "Optimal",
      adjusted: "Ajust\u00e9",
      standby: "Veille"
    },
    mode: {
      presence: "Pr\u00e9sence",
      standby: "Veille"
    },
    temperature: {
      regulated: "21.5 C",
      passive: "23.8 C"
    }
  },
  en: {
    summary(activeCount) {
      return activeCount === 0 ? "Technical standby" : `${activeCount} active systems`;
    },
    active: {
      lights: "On",
      climate: "Regulated",
      blinds: "Open",
      security: "Secured"
    },
    inactive: {
      lights: "Off",
      climate: "Standby",
      blinds: "Closed",
      security: "Standby"
    },
    comfort: {
      optimal: "Optimal",
      adjusted: "Adjusted",
      standby: "Standby"
    },
    mode: {
      presence: "Presence",
      standby: "Standby"
    },
    temperature: {
      regulated: "21.5 C",
      passive: "23.8 C"
    }
  }
};

const translatableElements = document.querySelectorAll("[data-i18n]");
const langButtons = document.querySelectorAll(".lang-btn");
const navPanel = document.querySelector(".nav-panel");
const menuToggle = document.querySelector(".menu-toggle");
const header = document.querySelector(".site-header");
const yearElement = document.getElementById("year");
const revealElements = document.querySelectorAll(".reveal");
const demoRoots = document.querySelectorAll("[data-smart-demo]");
const demoControls = document.querySelectorAll("[data-demo-control]");
const leadForm = document.querySelector(".lead-form");

let currentLanguage = "fr";

const smartDemoState = {
  lights: true,
  climate: true,
  blinds: true,
  security: true
};

document.body.classList.add("can-reveal");

translatableElements.forEach((element) => {
  element.dataset.frText = element.textContent.trim();
});

const updateMeta = (lang) => {
  const meta = metaByLanguage[lang] || metaByLanguage.fr;
  const description = document.querySelector('meta[name="description"]');
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const ogLocale = document.querySelector('meta[property="og:locale"]');

  document.title = meta.title;
  if (description) description.setAttribute("content", meta.description);
  if (ogTitle) ogTitle.setAttribute("content", meta.title);
  if (ogDescription) ogDescription.setAttribute("content", meta.description);
  if (ogLocale) ogLocale.setAttribute("content", meta.locale);
};

const calculateEnergy = () => {
  const baseLoad = 18.4;
  const lightingLoad = smartDemoState.lights ? 4.8 : 0.6;
  const climateLoad = smartDemoState.climate ? 7.6 : 1.2;
  const securityLoad = smartDemoState.security ? 0.8 : 0.3;
  const blindAdjustment = smartDemoState.blinds ? -1.4 : 1.1;
  return Math.max(12, baseLoad + lightingLoad + climateLoad + securityLoad + blindAdjustment).toFixed(1);
};

const getComfortState = () => {
  const activeCount = Object.values(smartDemoState).filter(Boolean).length;
  if (activeCount === 0) return "standby";
  if (smartDemoState.climate && smartDemoState.lights) return "optimal";
  return "adjusted";
};

const renderSmartDemos = () => {
  const copy = demoCopy[currentLanguage] || demoCopy.fr;
  const activeCount = Object.values(smartDemoState).filter(Boolean).length;
  const energy = `${calculateEnergy()} kW`;
  const comfortKey = getComfortState();
  const modeKey = smartDemoState.security ? "presence" : "standby";
  const temp = smartDemoState.climate ? copy.temperature.regulated : copy.temperature.passive;

  demoRoots.forEach((root) => {
    root.classList.toggle("is-lights-on", smartDemoState.lights);
    root.classList.toggle("is-climate-on", smartDemoState.climate);
    root.classList.toggle("is-blinds-open", smartDemoState.blinds);
    root.classList.toggle("is-security-on", smartDemoState.security);
  });

  demoControls.forEach((control) => {
    const key = control.dataset.demoControl;
    const isActive = Boolean(smartDemoState[key]);
    control.setAttribute("aria-pressed", String(isActive));
    control.classList.toggle("is-active", isActive);
  });

  document.querySelectorAll("[data-control-state]").forEach((element) => {
    const key = element.dataset.controlState;
    element.textContent = smartDemoState[key] ? copy.active[key] : copy.inactive[key];
  });

  document.querySelectorAll("[data-status-summary]").forEach((element) => {
    element.textContent = copy.summary(activeCount);
  });

  document.querySelectorAll("[data-energy-value]").forEach((element) => {
    element.textContent = energy;
  });

  document.querySelectorAll("[data-temp-value]").forEach((element) => {
    element.textContent = temp;
  });

  document.querySelectorAll("[data-comfort-value]").forEach((element) => {
    element.textContent = copy.comfort[comfortKey];
  });

  document.querySelectorAll("[data-mode-value]").forEach((element) => {
    element.textContent = copy.mode[modeKey];
  });
};

const applyLanguage = (lang) => {
  currentLanguage = lang;

  translatableElements.forEach((element) => {
    const key = element.dataset.i18n;
    const value = lang === "fr" ? element.dataset.frText : translations.en[key];
    if (value) {
      element.textContent = value;
    }
  });

  document.documentElement.lang = lang;
  langButtons.forEach((button) => {
    const isActive = button.dataset.lang === lang;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  updateMeta(lang);
  renderSmartDemos();

  try {
    localStorage.setItem("hypervision-language", lang);
  } catch (error) {
    // Language persistence is optional; the switch still works without storage.
  }
};

const closeNavigation = () => {
  if (!navPanel || !menuToggle) return;
  navPanel.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("nav-open");
};

if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}

langButtons.forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.lang));
});

demoControls.forEach((control) => {
  control.addEventListener("click", () => {
    const key = control.dataset.demoControl;
    if (!(key in smartDemoState)) return;
    smartDemoState[key] = !smartDemoState[key];
    renderSmartDemos();
  });
});

if (menuToggle && navPanel) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navPanel.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open", isOpen);
  });

  navPanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNavigation);
  });
}

window.addEventListener("scroll", () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 8);
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

if (leadForm) {
  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const submitButton = leadForm.querySelector(".form-submit");
    if (!submitButton) return;
    const originalText = submitButton.dataset.originalText || submitButton.textContent.trim();
    submitButton.dataset.originalText = originalText;
    submitButton.textContent = currentLanguage === "fr" ? "Demande pr\u00eate \u00e0 envoyer" : "Request ready to send";
    window.setTimeout(() => {
      submitButton.textContent = translations.en.formSubmit && currentLanguage === "en" ? translations.en.formSubmit : originalText;
    }, 2200);
  });
}

let initialLanguage = "fr";
try {
  initialLanguage = localStorage.getItem("hypervision-language") || "fr";
} catch (error) {
  initialLanguage = "fr";
}

applyLanguage(initialLanguage === "en" ? "en" : "fr");
