const App = {
  drawer: null,
  overlay: null,
  menuButton: null,

  init() {

    this.drawer =
      document.querySelector(".side-drawer");

    this.overlay =
      document.querySelector(".drawer-overlay");

    this.menuButton =
      document.getElementById("menuToggle");

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
        !this.menuButton.contains(event.target)
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
