const App = {

  drawer: document.querySelector(".side-drawer"),

  overlay: document.querySelector(".drawer-overlay"),

  menuButton: document.getElementById("menuToggle"),

  historyButton: document.getElementById("historyToggle"),

  historyPanel: document.getElementById("historyPanel"),

  isDrawerOpen: false,

  isHistoryOpen: false,

  init() {

    this.bindEvents();

  },

  bindEvents() {

    this.menuButton?.addEventListener(
      "click",
      () => this.toggleDrawer()
    );

    this.overlay?.addEventListener(
      "click",
      () => {

        this.closeDrawer();
        this.closeHistory();

      }
    );

    this.historyButton?.addEventListener(
      "click",
      () => this.toggleHistory()
    );

    document.addEventListener(
      "keydown",
      (event) => {

        if (event.key !== "Escape")
          return;

        this.closeDrawer();
        this.closeHistory();

      }
    );

    window.addEventListener(
      "resize",
      () => this.handleResize()
    );

  },

  toggleDrawer() {

    if (this.isDrawerOpen) {

      this.closeDrawer();

    } else {

      this.openDrawer();

    }

  },

  openDrawer() {

    if (!this.drawer)
      return;

    this.drawer.classList.add("open");

    this.overlay?.classList.add(
      "active"
    );

    document.body.style.overflow =
      "hidden";

    this.isDrawerOpen = true;

  },

  closeDrawer() {

    if (!this.drawer)
      return;

    this.drawer.classList.remove(
      "open"
    );

    this.overlay?.classList.remove(
      "active"
    );

    document.body.style.overflow =
      "";

    this.isDrawerOpen = false;

  },

  toggleHistory() {

    if (!this.historyPanel)
      return;

    if (this.isHistoryOpen) {

      this.closeHistory();

    } else {

      this.openHistory();

    }

  },

  openHistory() {

    if (!this.historyPanel)
      return;

    this.historyPanel.style.display =
      "block";

    this.historyPanel.classList.remove(
      "fade-in"
    );

    void this.historyPanel.offsetWidth;

    this.historyPanel.classList.add(
      "fade-in"
    );

    this.isHistoryOpen = true;

  },

  closeHistory() {

    if (!this.historyPanel)
      return;

    this.historyPanel.style.display =
      "none";

    this.isHistoryOpen = false;

  },

  handleResize() {

    if (
      window.innerWidth >= 1200
    ) {

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