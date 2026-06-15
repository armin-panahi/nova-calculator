const HistoryManager = {

  maxItems: 50,

  items: [],

  historyList:
    document.getElementById(
      "historyList"
    ),

  init() {

    this.load();

    this.render();

  },

  load() {

    if (
      typeof Storage ===
      "undefined"
    ) {
      return;
    }

    this.items =
      Storage.loadHistory();

  },

  save() {

    if (
      typeof Storage ===
      "undefined"
    ) {
      return;
    }

    Storage.saveHistory(
      this.items
    );

  },

  add(
    expression,
    result
  ) {

    const entry = {

      id: Date.now(),

      expression,

      result,

      createdAt:
        new Date().toISOString()

    };

    this.items.unshift(
      entry
    );

    if (
      this.items.length >
      this.maxItems
    ) {

      this.items.length =
        this.maxItems;

    }

    this.save();

    this.render();

  },

  clear() {

    this.items = [];

    this.save();

    this.render();

  },

  remove(id) {

    this.items =
      this.items.filter(
        item =>
          item.id !== id
      );

    this.save();

    this.render();

  },

  render() {

    if (
      !this.historyList
    ) {
      return;
    }

    this.historyList.innerHTML =
      "";

    if (
      this.items.length === 0
    ) {

      this.historyList.innerHTML =
        `
        <div class="history-empty">
          No history yet
        </div>
      `;

      return;

    }

    const fragment =
      document.createDocumentFragment();

    this.items.forEach(
      (item) => {

        const element =
          document.createElement(
            "div"
          );

        element.className =
          "history-item";

        element.dataset.id =
          item.id;

        element.innerHTML =
          `
          <div class="history-expression">
            ${item.expression}
          </div>

          <div class="history-result">
            = ${item.result}
          </div>
        `;

        element.addEventListener(
          "click",
          () => {

            if (
              typeof calculator !==
              "undefined"
            ) {

              calculator.loadHistoryItem(
                item.expression,
                item.result
              );

            }

          }
        );

        fragment.appendChild(
          element
        );

      }
    );

    this.historyList.appendChild(
      fragment
    );

  }

};

HistoryManager.init();
