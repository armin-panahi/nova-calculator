const HistoryManager = {

  items: [],

  historyList:
    document.getElementById(
      "historyList"
    ),

  init() {

    this.items =
      Storage.loadHistory();

    this.render();

  },

  add(expression, result) {

    const entry = {

      id: Date.now(),

      expression,

      result

    };

    this.items.unshift(entry);

    if (
      this.items.length > 50
    ) {

      this.items.pop();

    }

    Storage.saveHistory(
      this.items
    );

    this.render();

  },

  render() {

    if (!this.historyList)
      return;

    this.historyList.innerHTML = "";

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

    this.items.forEach(item => {

      const div =
        document.createElement(
          "div"
        );

      div.className =
        "history-item";

      div.dataset.expression =
        item.expression;

      div.dataset.result =
        item.result;

      div.innerHTML =
        `
        ${item.expression}
        =
        ${item.result}
      `;

      div.addEventListener(
        "click",
        () => {

          calculator.loadHistoryItem(
            item.expression,
            item.result
          );

        }
      );

      this.historyList.appendChild(
        div
      );

    });

  }

};

HistoryManager.init();