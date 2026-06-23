const ThemeManager = {

  currentTheme: "dark",

  buttons: [],

  init() {

    this.buttons = [

      document.getElementById(
        "themeToggle"
      ),

      document.getElementById(
        "converterThemeToggle"
      )

    ].filter(Boolean);

    this.loadTheme();

    this.bindEvents();

    this.applyTheme(
      this.currentTheme
    );

  },

  bindEvents() {

    this.buttons.forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            this.toggleTheme();

          }
        );

      }
    );

  },

  toggleTheme() {

    this.applyTheme(

      this.currentTheme === "dark"
        ? "light"
        : "dark"

    );

  },

  applyTheme(theme) {

    this.currentTheme = theme;

    document.body.setAttribute(
      "data-theme",
      theme
    );

    if (
      typeof Storage !==
      "undefined"
    ) {

      Storage.saveTheme(
        theme
      );

    }

    this.updateIcons();

  },

  loadTheme() {

    if (
      typeof Storage !==
      "undefined"
    ) {

      this.currentTheme =
        Storage.loadTheme() ||
        "dark";

    }

  },

  updateIcons() {

    const icon =

      this.currentTheme === "dark"
        ? "sun"
        : "moon";

    this.buttons.forEach(
      button => {

        button.innerHTML =

          `<i data-lucide="${icon}"></i>`;

      }
    );

    lucide.createIcons();

  }

};

document.addEventListener(
  "DOMContentLoaded",
  () => {

    ThemeManager.init();

  }
);