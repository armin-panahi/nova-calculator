const ConverterFavorites = {

STORAGE_KEY:
"nova_converter_favorites",

favorites: [],

list: null,

clearButton: null,

init() {


this.list =
  document.getElementById(
    "favoriteList"
  );

this.clearButton =
  document.getElementById(
    "clearFavorites"
  );

this.load();

this.render();

this.bindEvents();


},

bindEvents() {


this.clearButton?.addEventListener(
  "click",
  () => {

    this.clear();

  }
);


},

add(item) {


const exists =
  this.favorites.some(
    fav =>
      fav.category ===
        item.category &&
      fav.from === item.from &&
      fav.to === item.to
  );

if (exists) {
  return;
}

this.favorites.unshift(item);

if (
  this.favorites.length > 12
) {

  this.favorites =
    this.favorites.slice(0, 12);

}

this.save();

this.render();


},

clear() {


this.favorites = [];

this.save();

this.render();


},

save() {


localStorage.setItem(
  this.STORAGE_KEY,
  JSON.stringify(
    this.favorites
  )
);


},

load() {


try {

  const data =
    localStorage.getItem(
      this.STORAGE_KEY
    );

  this.favorites =
    data
      ? JSON.parse(data)
      : [];

} catch {

  this.favorites = [];

}


},

render() {


if (!this.list)
  return;

if (
  !this.favorites.length
) {

  this.list.innerHTML =
    `<div class="converter-empty">
      No favorites yet
    </div>`;

  return;

}

this.list.innerHTML =
  this.favorites.map(
    item => `
      <button
        class="favorite-card"
        data-category="${item.category}"
        data-from="${item.from}"
        data-to="${item.to}"
      >

        ${item.from}
        →

        ${item.to}

      </button>
    `
  ).join("");

this.attachEvents();


},

attachEvents() {


document
  .querySelectorAll(
    ".favorite-card"
  )
  .forEach(card => {

    card.addEventListener(
      "click",
      () => {

        if (
          typeof UnitConverter ===
          "undefined"
        ) {
          return;
        }

        UnitConverter.currentCategory =
          card.dataset.category;

        UnitConverter.categorySelect.value =
          card.dataset.category;

        UnitConverter.populateUnits();

        UnitConverter.fromSelect.value =
          card.dataset.from;

        UnitConverter.toSelect.value =
          card.dataset.to;

        UnitConverter.convert();

      }
    );

  });


}

};

document.addEventListener(
"DOMContentLoaded",
() => {


ConverterFavorites.init();


}
);
