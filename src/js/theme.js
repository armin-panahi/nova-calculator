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
      this.currentTheme,
      false
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
      this.currentTheme === "dark"
        ? "light"
        : "dark";

    this.applyTheme(
      nextTheme
    );

  },

  applyTheme(
    theme,
    save = true
  ) {

    this.currentTheme =
      theme;

    document.body.setAttribute(
      "data-theme",
      theme
    );

    if (
      save &&
      typeof Storage !==
        "undefined"
    ) {

      Storage.saveTheme(
        theme
      );

    }

    this.updateIcon();

  },

  loadTheme() {

    if (
      typeof Storage ===
      "undefined"
    ) {

      this.currentTheme =
        "dark";

      return;

    }

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
      `
      <i
        data-lucide="${icon}"
      ></i>
      `;

    if (
      typeof lucide !==
      "undefined"
    ) {

      lucide.createIcons();

    }

  }

};

document.addEventListener(
  "DOMContentLoaded",
  () => {

    ThemeManager.init();

  }
);