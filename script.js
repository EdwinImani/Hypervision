const translations = {
  en: {
    navHome: "Home",
    navActions: "Pillars",
    navServices: "Services",
    navDemo: "Demo",
    navUseCases: "Use cases",
    navMethod: "Method",
    navTrust: "Trust",
    navContact: "Contact",
    diagnosticCta: "Technical assessment",
    menuLabel: "Open navigation",
    heroKicker: "Electrical engineering, BMS and supervision",
    heroTitle: "Smarter buildings, better controlled and more efficient.",
    heroSubtitle:
      "Hypervision integrates electrical systems, BMS and supervision to make buildings clearer, controllable and efficient.",
    heroPrimary: "Request an assessment",
    heroSecondary: "View interactive demo",
    signalElectrical: "Electrical",
    signalBms: "BMS / BEMS",
    signalSupervision: "Supervision",
    heroDemoKicker: "Supervision interface",
    heroDemoTitle: "South building",
    controlLights: "Light",
    controlClimate: "HVAC",
    controlBlinds: "Blinds",
    controlSecurity: "Security",
    controlEco: "Eco",
    actionsEyebrow: "Value",
    actionsTitle: "Control, supervise, optimize.",
    actionControlTitle: "Control",
    actionControlText: "Useful commands that are clear and quick to activate.",
    actionSuperviseTitle: "Supervise",
    actionSuperviseText: "Statuses, alarms and consumption visible in the right place.",
    actionOptimizeTitle: "Optimize",
    actionOptimizeText: "Adjusted scenarios to limit operational drift.",
    servicesEyebrow: "Services",
    servicesTitle: "Six fields of expertise for a clearer building.",
    serviceElectricalTitle: "Technical electrical work",
    serviceElectricalText: "Electrical installations and renovations designed for operation.",
    serviceBmsTitle: "BMS / BEMS",
    serviceBmsText: "Centralized control of the building's technical systems.",
    serviceSupervisionTitle: "Supervision",
    serviceSupervisionText: "Clear synoptics to monitor statuses, alarms and commands.",
    serviceAutomationTitle: "Automation",
    serviceAutomationText: "Coherent and testable control logic.",
    serviceEnergyTitle: "Energy monitoring",
    serviceEnergyText: "Metering, visualization and drift monitoring.",
    serviceEboTitle: "EBO assistance",
    serviceEboText: "Support for EBO, BACnet, Modbus and commissioning.",
    demoEyebrow: "Interactive demo",
    demoTitle: "Control a building in a few gestures.",
    demoText: "Activate technical systems and watch the impact on the building.",
    metricComfort: "Comfort",
    metricEnergy: "Energy",
    metricMode: "Mode",
    demoPanelKicker: "Live supervision",
    demoPanelTitle: "Operations level",
    switchLightsTitle: "Light",
    switchClimateTitle: "HVAC / climate",
    switchBlindsTitle: "Blinds",
    switchSecurityTitle: "Security",
    switchEcoTitle: "Eco mode",
    floatingEnergy: "Energy",
    floatingTemp: "Ambience",
    useCasesEyebrow: "Use cases",
    useCasesTitle: "Concrete problems, clear technical answers.",
    solutionLabel: "Solution",
    useCase1Title: "Control a building remotely",
    useCase1Text: "Commands, statuses, alarms and centralized supervision.",
    useCase2Title: "Understand consumption",
    useCase2Text: "Metering, energy visualization and drift detection.",
    useCase3Title: "Modernize an installation",
    useCase3Text: "Electrical systems, automation and supervision designed together.",
    useCase4Title: "Support an integrator",
    useCase4Text: "EBO, BACnet, Modbus, synoptics and commissioning support.",
    useCase5Title: "Simplify maintenance",
    useCase5Text: "Structured points, readable alarms and clear documentation.",
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
    trustEyebrow: "Technical trust",
    trustTitle: "Credibility based on method.",
    credibilityBlock1: "Real field analysis",
    credibilityBlock2: "Functional tests",
    credibilityBlock3: "Clear documentation",
    credibilityBlock4: "Maintainable solutions",
    contactEyebrow: "Contact",
    contactTitle: "Let's discuss your technical project.",
    contactText:
      "Installation, renovation, BMS, supervision or EBO assistance: describe your need and we will reply with a first clear analysis.",
    contactCta: "Request a technical assessment",
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
    formSubmit: "Send by email",
    formFallback:
      "No backend is configured: submission opens your email client. You can also write to",
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
      security: "S\u00e9curis\u00e9e",
      eco: "Actif"
    },
    inactive: {
      lights: "\u00c9teinte",
      climate: "Veille",
      blinds: "Ferm\u00e9s",
      security: "Veille",
      eco: "Inactif"
    },
    comfort: {
      optimal: "Optimal",
      adjusted: "Ajust\u00e9",
      standby: "Veille"
    },
    mode: {
      presence: "Pr\u00e9sence",
      eco: "Eco actif",
      standby: "Veille"
    },
    temperature: {
      regulated: "21.5 C",
      eco: "20.8 C",
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
      security: "Secured",
      eco: "Active"
    },
    inactive: {
      lights: "Off",
      climate: "Standby",
      blinds: "Closed",
      security: "Standby",
      eco: "Inactive"
    },
    comfort: {
      optimal: "Optimal",
      adjusted: "Adjusted",
      standby: "Standby"
    },
    mode: {
      presence: "Presence",
      eco: "Eco active",
      standby: "Standby"
    },
    temperature: {
      regulated: "21.5 C",
      eco: "20.8 C",
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
  security: true,
  eco: true
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
  const ecoAdjustment = smartDemoState.eco ? -5.4 : 0;
  return Math.max(12, baseLoad + lightingLoad + climateLoad + securityLoad + blindAdjustment + ecoAdjustment).toFixed(1);
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
  const modeKey = smartDemoState.eco ? "eco" : smartDemoState.security ? "presence" : "standby";
  const temp = smartDemoState.climate
    ? smartDemoState.eco
      ? copy.temperature.eco
      : copy.temperature.regulated
    : copy.temperature.passive;

  demoRoots.forEach((root) => {
    root.classList.toggle("is-lights-on", smartDemoState.lights);
    root.classList.toggle("is-climate-on", smartDemoState.climate);
    root.classList.toggle("is-blinds-open", smartDemoState.blinds);
    root.classList.toggle("is-security-on", smartDemoState.security);
    root.classList.toggle("is-eco-on", smartDemoState.eco);
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

const revealVisibleElements = () => {
  revealElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const isNearViewport = rect.top < window.innerHeight + 120 && rect.bottom > -120;
    if (isNearViewport) {
      element.classList.add("is-visible");
    }
  });
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

window.addEventListener("load", revealVisibleElements);
window.addEventListener("hashchange", () => {
  window.setTimeout(revealVisibleElements, 120);
});
window.setTimeout(revealVisibleElements, 250);

if (leadForm) {
  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const contactEmail = "contact@hypervision-solution.fr";
    const submitButton = leadForm.querySelector(".form-submit");
    const formData = new FormData(leadForm);
    const needSelect = leadForm.querySelector("#need");
    const needLabel = needSelect?.selectedOptions?.[0]?.textContent.trim() || "";
    const name = formData.get("name") || "";
    const company = formData.get("company") || "";
    const email = formData.get("email") || "";
    const phone = formData.get("phone") || "";
    const message = formData.get("message") || "";
    const subjectPrefix = currentLanguage === "fr" ? "Demande de diagnostic technique" : "Technical assessment request";
    const subjectDetail = company || name || "Hypervision";
    const subject = `${subjectPrefix} - ${subjectDetail}`;
    const bodyLabels =
      currentLanguage === "fr"
        ? ["Nom", "Entreprise", "Email", "T\u00e9l\u00e9phone", "Besoin", "Message"]
        : ["Name", "Company", "Email", "Phone", "Need", "Message"];
    const body = [
      `${bodyLabels[0]}: ${name}`,
      `${bodyLabels[1]}: ${company}`,
      `${bodyLabels[2]}: ${email}`,
      `${bodyLabels[3]}: ${phone}`,
      `${bodyLabels[4]}: ${needLabel}`,
      "",
      `${bodyLabels[5]}:`,
      message
    ].join("\n");

    if (submitButton) {
      submitButton.textContent = currentLanguage === "fr" ? "Ouverture de l'email..." : "Opening email...";
      window.setTimeout(() => {
        submitButton.textContent = currentLanguage === "fr" ? submitButton.dataset.frText : translations.en.formSubmit;
      }, 1800);
    }

    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

let initialLanguage = "fr";
try {
  initialLanguage = localStorage.getItem("hypervision-language") || "fr";
} catch (error) {
  initialLanguage = "fr";
}

applyLanguage(initialLanguage === "en" ? "en" : "fr");
