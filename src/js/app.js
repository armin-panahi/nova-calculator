const App = {

  drawer: null,
  overlay: null,
  menuButtons: [],
  closeButton: null,

  historyPanel: null,
  historyButton: null,

  scientificPanel: null,
  scientificToggle: null,

  init() {

    this.cacheDOM();

    this.bindEvents();

    this.handleResize();

  },

  cacheDOM() {

    this.drawer =
      document.querySelector(".side-drawer");

    this.overlay =
      document.querySelector(".drawer-overlay");

    this.menuButtons = [

      document.getElementById(
        "menuToggle"
      ),

      document.getElementById(
        "converterMenuToggle"
      )

    ].filter(Boolean);

    this.closeButton =
      document.getElementById("drawerClose");

    this.historyPanel =
      document.getElementById("historyPanel");

    this.historyButton =
      document.getElementById("historyToggle");

    this.scientificPanel =
      document.getElementById("scientificPanel");

    this.scientificToggle =
      document.getElementById("scientificToggle");

  },

  bindEvents() {

    this.menuButtons.forEach(
      button => {

        button.addEventListener(
          "click",
          () => this.toggleDrawer()
        );

      }
    );

    this.closeButton?.addEventListener(
      "click",
      () => this.closeDrawer()
    );

    this.overlay?.addEventListener(
      "click",
      () => this.closeDrawer()
    );

    this.historyButton?.addEventListener(
      "click",
      (e) => {

        e.stopPropagation();

        this.toggleHistory();

      }
    );

    this.scientificToggle?.addEventListener(
      "click",
      () => {

        this.toggleScientific();

        this.closeDrawer();

      }
    );

    document.addEventListener(
      "click",
      (event) => {

        if (
          this.historyPanel &&
          !this.historyPanel.contains(event.target) &&
          !this.historyButton?.contains(event.target)
        ) {

          this.closeHistory();

        }

      }
    );

    window.addEventListener(
      "resize",
      () => this.handleResize()
    );

  },

  toggleDrawer() {

    this.drawer?.classList.toggle("open");

    this.overlay?.classList.toggle("active");

  },

  closeDrawer() {

    this.drawer?.classList.remove("open");

    this.overlay?.classList.remove("active");

  },

  toggleHistory() {

    this.historyPanel?.classList.toggle("open");

  },

  closeHistory() {

    this.historyPanel?.classList.remove("open");

  },

  toggleScientific() {

    this.scientificPanel?.classList.toggle("open");

  },

  closeScientific() {

    this.scientificPanel?.classList.remove("open");

  },

  handleResize() {

    if (window.innerWidth >= 1200) {

      this.closeDrawer();

    }

  }

};

document.addEventListener(
  "DOMContentLoaded",
  () => {

    App.init();

  }
);
