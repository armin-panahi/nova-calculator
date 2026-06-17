const App = {

drawer:
document.querySelector(".side-drawer"),

overlay:
document.querySelector(".drawer-overlay"),

menuButton:
document.getElementById("menuToggle"),

closeButton:
document.getElementById("drawerClose"),

historyPanel:
document.getElementById("historyPanel"),

historyButton:
document.getElementById("historyToggle"),

scientificPanel:
document.getElementById("scientificPanel"),

scientificToggle:
document.getElementById("scientificToggle"),

scientificClose:
document.getElementById("scientificClose"),

init() {


this.bindEvents();

this.handleResize();


},

bindEvents() {


/* =====================
   DRAWER
===================== */

this.menuButton?.addEventListener(
  "click",
  () => {

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

/* =====================
   HISTORY
===================== */

this.historyButton?.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();

    this.closeScientific();

    this.toggleHistory();

  }
);

/* =====================
   SCIENTIFIC
===================== */

this.scientificToggle?.addEventListener(
  "click",
  () => {

    this.closeHistory();

    this.toggleScientific();

    this.closeDrawer();

  }
);

this.scientificClose?.addEventListener(
  "click",
  () => {

    this.closeScientific();

  }
);

/* =====================
   OUTSIDE CLICK
===================== */

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

    if (
      this.scientificPanel &&
      !this.scientificPanel.contains(event.target) &&
      !this.scientificToggle?.contains(event.target)
    ) {

      this.closeScientific();

    }

  }
);

/* =====================
   RESIZE
===================== */

window.addEventListener(
  "resize",
  () => {

    this.handleResize();

  }
);


},

/* =====================
DRAWER
===================== */

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

/* =====================
HISTORY
===================== */

toggleHistory() {


this.historyPanel?.classList.toggle(
  "open"
);


},

closeHistory() {


this.historyPanel?.classList.remove(
  "open"
);


},

/* =====================
SCIENTIFIC
===================== */

toggleScientific() {


this.scientificPanel?.classList.toggle(
  "open"
);


},

closeScientific() {


this.scientificPanel?.classList.remove(
  "open"
);


},

/* =====================
RESPONSIVE
===================== */

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
