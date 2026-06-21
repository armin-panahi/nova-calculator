const Navigation = {

currentView: "calculator",

views: {},

menuItems: [],

init() {

this.views = {

calculator:
document.getElementById(
"calculatorView"
),

converter:
document.getElementById(
"converterView"
),

currency:
document.getElementById(
"currencyView"
)

};

this.menuItems =
document.querySelectorAll(
".drawer-item[data-page]"
);

this.bindEvents();

this.restore();

},

bindEvents() {

this.menuItems.forEach(
(item) => {

item.addEventListener(
"click",
() => {

const page =
item.dataset.page;

this.show(page);

if (
typeof App !==
"undefined"
) {

App.closeDrawer();

}

}
);

}
);

},

show(viewName) {

if (
!this.views[viewName]
) {
return;
}

Object.values(
this.views
).forEach(
(view) => {

view?.classList.remove(
"active"
);

}
);

this.views[
viewName
]?.classList.add(
"active"
);

this.menuItems.forEach(
(item) => {

item.classList.toggle(
"active",
item.dataset.page ===
viewName
);

}
);

this.currentView =
viewName;

localStorage.setItem(
"nova_view",
viewName
);

},

restore() {

const saved =
localStorage.getItem(
"nova_view"
);

if (
saved &&
this.views[saved]
) {

this.show(saved);

} else {

this.show(
"calculator"
);

}

}

};

document.addEventListener(
"DOMContentLoaded",
() => {

Navigation.init();

}
);
