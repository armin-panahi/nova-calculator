const ConverterHistory = {

history: [],

list: null,

clearButton: null,

init() {


this.list =
  document.getElementById(
    "converterHistoryList"
  );

this.clearButton =
  document.getElementById(
    "clearConverterHistory"
  );

this.history =
  Storage.loadConverterHistory();

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


this.history.unshift(item);

if (
  this.history.length > 20
) {

  this.history =
    this.history.slice(0, 20);

}

Storage.saveConverterHistory(
  this.history
);

this.render();


},

clear() {


this.history = [];

Storage.saveConverterHistory([]);

this.render();


},

render() {


if (!this.list) return;

if (!this.history.length) {

  this.list.innerHTML =
    `<div class="converter-empty">
      No conversions yet
    </div>`;

  return;

}

this.list.innerHTML =
  this.history.map(
    (item) => `
      <div
        class="converter-history-item"
      >
        <strong>
          ${item.value}
        </strong>

        ${item.from}
        →

        ${item.result}
        ${item.to}
      </div>
    `
  ).join("");


}

};

document.addEventListener(
"DOMContentLoaded",
() => {


ConverterHistory.init();


}
);
