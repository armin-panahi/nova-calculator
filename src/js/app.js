const App = {

  drawer: null,
  overlay: null,
  menuButton: null,
  closeButton: null,

  init() {

    this.drawer =
      document.querySelector(".side-drawer");

    this.overlay =
      document.querySelector(".drawer-overlay");

    this.menuButton =
      document.getElementById("menuToggle");

    this.closeButton =
      document.getElementById("drawerClose");

    this.bindEvents();

    this.handleResize();

  },

  bindEvents() {

    this.menuButton?.addEventListener(
      "click",
      (event) => {

        event.stopPropagation();

        this.toggleDrawer();

      }
    );

    this.closeButton?.addEventListener(
      "click",
      () => {

        this.closeDrawer();

      }
    );

    this.overlay?.addEventListener(
      "click",
      () => {

        this.closeDrawer();

      }
    );

    document.addEventListener(
      "click",
      (event) => {

        if (
          window.innerWidth < 1200 &&
          this.drawer?.classList.contains("open") &&
          !this.drawer.contains(event.target) &&
          !this.menuButton?.contains(event.target)
        ) {

          this.closeDrawer();

        }

      }
    );

    window.addEventListener(
      "resize",
      () => {

        this.handleResize();

      }
    );

    document.addEventListener(
      "keydown",
      (event) => {

        if (event.key === "Escape") {

          this.closeDrawer();

          const historyPanel =
            document.getElementById(
              "historyPanel"
            );

          historyPanel?.classList.remove(
            "open"
          );

        }

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
