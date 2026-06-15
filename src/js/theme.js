const ThemeManager = {

  currentTheme: "dark",

  themeButton:
    document.getElementById(
      "themeToggle"
    ),

  init() {

    this.loadTheme();

    this.bindEvents();

    this.applyTheme(
      this.currentTheme
    );

  },

  bindEvents() {

    this.themeButton?.addEventListener(
      "click",
      () => {

        this.toggleTheme();

      }
    );

  },

  toggleTheme() {

    const nextTheme =
      this.currentTheme ===
      "dark"
        ? "light"
        : "dark";

    this.applyTheme(
      nextTheme
    );

  },

  applyTheme(theme) {

    this.currentTheme =
      theme;

    document.body.setAttribute(
      "data-theme",
      theme
    );

    Storage.saveTheme(
      theme
    );

    this.updateIcon();

  },

  loadTheme() {

    const savedTheme =
      Storage.loadTheme();

    this.currentTheme =
      savedTheme || "dark";

  },

  updateIcon() {

    if (
      !this.themeButton
    ) {
      return;
    }

    const icon =
      this.currentTheme ===
      "dark"
        ? "sun"
        : "moon";

    this.themeButton.innerHTML =
      `<i data-lucide="${icon}"></i>`;

    lucide.createIcons();

  }

};

document.addEventListener(
  "DOMContentLoaded",
  () => {

    ThemeManager.init();

  }
);