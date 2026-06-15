const App = {
  drawer: document.querySelector(".side-drawer"),
  overlay: document.querySelector(".drawer-overlay"),
  menuButton: document.getElementById("menuToggle"),

  init() {
    this.bindEvents();
    this.handleResize();
  },

  bindEvents() {
    this.menuButton?.addEventListener("click", () => {
      this.toggleDrawer();
    });

    this.overlay?.addEventListener("click", () => {
      this.closeDrawer();
    });

    window.addEventListener("resize", () => {
      this.handleResize();
    });
  },

  toggleDrawer() {
    this.drawer?.classList.toggle("open");
    this.overlay?.classList.toggle("show");
  },

  closeDrawer() {
    this.drawer?.classList.remove("open");
    this.overlay?.classList.remove("show");
  },

  handleResize() {
    if (window.innerWidth >= 1200) {
      this.closeDrawer();
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  App.init();
});