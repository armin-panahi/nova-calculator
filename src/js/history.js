const HistoryManager = {
  items: [],

  historyList:
    document.getElementById("historyList"),

  historyPanel:
    document.getElementById("historyPanel"),

  toggleButton:
    document.getElementById("historyToggle"),

  init() {
    this.items =
      Storage.loadHistory();

    this.bindEvents();

    this.render();
  },

  bindEvents() {
    this.toggleButton?.addEventListener(
      "click",
      () => {
        this.historyPanel.classList.toggle(
          "open"
        );
      }
    );
  },

  add(expression, result) {
    const entry = {
      id: Date.now(),
      expression,
      result
    };

    this.items.unshift(entry);

    if (this.items.length > 50) {
      this.items.pop();
    }

    Storage.saveHistory(this.items);

    this.render();
  },

  render() {
    if (!this.historyList) return;

    this.historyList.innerHTML = "";

    if (this.items.length === 0) {
      this.historyList.innerHTML = `
        <div class="history-empty">
          No history yet
        </div>
      `;
      return;
    }

    this.items.forEach(item => {
      const div =
        document.createElement("div");

      div.className =
        "history-item";

      div.innerHTML = `
        ${item.expression}
        <br>
        = ${item.result}
      `;

      div.addEventListener(
        "click",
        () => {
          calculator.loadHistoryItem(
            item.expression,
            item.result
          );

          this.historyPanel.classList.remove(
            "open"
          );
        }
      );

      this.historyList.appendChild(div);
    });
  }
};

document.addEventListener(
  "DOMContentLoaded",
  () => {
    HistoryManager.init();
  }
);