const App = {

  menuButton:
    document.getElementById(
      "menuToggle"
    ),

  historyButton:
    document.getElementById(
      "historyToggle"
    ),

  drawer:
    document.querySelector(
      ".side-drawer"
    ),

  overlay:
    document.querySelector(
      ".drawer-overlay"
    ),

  historyPanel:
    document.getElementById(
      "historyPanel"
    ),

  init() {

    this.bindEvents();

    this.handleResize();

  },

  bindEvents() {

    this.menuButton?.addEventListener(
      "click",
      () => {

        this.toggleDrawer();

      }
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
      () => {

        this.toggleHistory();

      }
    );

    window.addEventListener(
      "resize",
      () => {

        this.handleResize();

      }
    );

  },

  toggleDrawer() {

    this.drawer?.classList.toggle(
      "open"
    );

    this.overlay?.classList.toggle(
      "active"
    );

  },

  closeDrawer() {

    this.drawer?.classList.remove(
      "open"
    );

    this.overlay?.classList.remove(
      "active"
    );

  },

  toggleHistory() {

    if (!this.historyPanel)
      return;

    const isOpen =
      this.historyPanel.classList.contains(
        "open"
      );

    if (isOpen) {

      this.closeHistory();

    } else {

      this.openHistory();

    }

  },

  openHistory() {

    this.historyPanel?.classList.add(
      "open"
    );

  },

  closeHistory() {

    this.historyPanel?.classList.remove(
      "open"
    );

  },

  handleResize() {

    if (
      window.innerWidth >= 1024
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
