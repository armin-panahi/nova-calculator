const HistoryManager = {

  STORAGE_KEY: "nova_history",

  history: [],

  listElement:
    document.getElementById("historyList"),

  clearButton:
    document.getElementById("clearHistory"),

  init() {

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

  add(expression, result) {

    if (
      !expression ||
      !result ||
      result === "Error"
    ) {
      return;
    }

    this.history.unshift({
      expression,
      result,
      timestamp: Date.now()
    });

    if (this.history.length > 50) {

      this.history =
        this.history.slice(0, 50);

    }

    this.save();

    this.render();

  },

  clear() {

    this.history = [];

    this.save();

    this.render();

  },

  save() {

    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify(this.history)
    );

  },

  load() {

    try {

      const data =
        localStorage.getItem(
          this.STORAGE_KEY
        );

      this.history =
        data
          ? JSON.parse(data)
          : [];

    } catch {

      this.history = [];

    }

  },

  render() {

    if (!this.listElement)
      return;

    if (!this.history.length) {

      this.listElement.innerHTML = `
        <div class="history-empty">
          No history yet
        </div>
      `;

      return;

    }

    this.listElement.innerHTML =
      this.history
        .map(
          (item) => `
            <div
              class="history-item"
              data-expression="${item.expression}"
              data-result="${item.result}"
            >

              <div class="history-expression">
                ${item.expression}
              </div>

              <div class="history-result">
                = ${item.result}
              </div>

            </div>
          `
        )
        .join("");

    this.attachItemEvents();

  },

  attachItemEvents() {

    const items =
      document.querySelectorAll(
        ".history-item"
      );

    items.forEach((item) => {

      item.addEventListener(
        "click",
        () => {

          const expression =
            item.dataset.expression;

          const result =
            item.dataset.result;

          if (
            typeof calculator !==
            "undefined"
          ) {

            calculator.loadHistoryItem(
              expression,
              result
            );

          }

        }
      );

    });

  }

};

document.addEventListener(
  "DOMContentLoaded",
  () => {

    HistoryManager.init();

  }
);
