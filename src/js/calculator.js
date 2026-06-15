const calculator = {

  expression: "",

  result: "0",

  expressionElement:
    document.getElementById(
      "expression"
    ),

  resultElement:
    document.getElementById(
      "result"
    ),

  init() {

    this.bindEvents();

    this.render();

  },

  bindEvents() {

    const keypad =
      document.getElementById(
        "keypad"
      );

    if (!keypad) return;

    keypad.addEventListener(
      "click",
      (event) => {

        const button =
          event.target.closest(
            "button"
          );

        if (!button) return;

        const number =
          button.dataset.number;

        const operator =
          button.dataset.operator;

        const action =
          button.dataset.action;

        if (
          number !== undefined
        ) {

          this.appendNumber(
            number
          );

          return;

        }

        if (
          operator !== undefined
        ) {

          this.appendOperator(
            operator
          );

          return;

        }

        if (
          action !== undefined
        ) {

          this.handleAction(
            action
          );

        }

      }
    );

    document.addEventListener(
      "keydown",
      (event) => {

        const key =
          event.key;

        if (
          /[0-9]/.test(key)
        ) {

          this.appendNumber(
            key
          );

          return;

        }

        if (
          key === "."
        ) {

          this.appendNumber(
            "."
          );

          return;

        }

        if (
          ["+", "-", "*", "/"]
            .includes(key)
        ) {

          this.appendOperator(
            key
          );

          return;

        }

        if (
          key === "Enter" ||
          key === "="
        ) {

          event.preventDefault();

          this.calculate();

          return;

        }

        if (
          key === "Backspace"
        ) {

          this.deleteLast();

          return;

        }

        if (
          key === "Escape"
        ) {

          this.clear();

        }

      }
    );

  },

  appendNumber(value) {

    if (
      value === "." &&
      this.getCurrentNumber()
        .includes(".")
    ) {

      return;

    }

    if (
      this.expression === "0" &&
      value !== "."
    ) {

      this.expression =
        value;

    } else {

      this.expression +=
        value;

    }

    this.updateLiveResult();

    this.render();

  },

  appendOperator(
    operator
  ) {

    if (
      !this.expression
        .length
    ) return;

    const lastChar =
      this.expression[
        this.expression.length - 1
      ];

    if (
      "+-*/"
        .includes(lastChar)
    ) {

      this.expression =
        this.expression.slice(
          0,
          -1
        ) + operator;

    } else {

      this.expression +=
        operator;

    }

    this.render();

  },

  handleAction(action) {

    switch (action) {

      case "clear":

        this.clear();

        break;

      case "delete":

        this.deleteLast();

        break;

      case "percent":

        this.applyPercent();

        break;

      case "equal":

        this.calculate();

        break;

    }

  },

  clear() {

    this.expression = "";

    this.result = "0";

    this.render();

  },

  deleteLast() {

    this.expression =
      this.expression.slice(
        0,
        -1
      );

    if (
      !this.expression
    ) {

      this.result = "0";

    } else {

      this.updateLiveResult();

    }

    this.render();

  },

  applyPercent() {

    if (
      !this.expression
    ) return;

    const match =
      this.expression.match(
        /(\d+\.?\d*)$/
      );

    if (!match) return;

    const number =
      parseFloat(
        match[1]
      );

    const percent =
      number / 100;

    this.expression =
      this.expression.replace(
        /(\d+\.?\d*)$/,
        percent
      );

    this.updateLiveResult();

    this.render();

  },

  calculate() {

    if (
      !this.expression
    ) return;

    try {

      const value =
        Function(
          `"use strict"; return (${this.expression})`
        )();

      const result =
        Number.isInteger(
          value
        )
          ? value
          : Number(
              value.toFixed(10)
            );

      this.result =
        String(result);

      if (
        typeof HistoryManager !==
        "undefined"
      ) {

        HistoryManager.add(
          this.expression,
          this.result
        );

      }

    } catch {

      this.result =
        "Error";

    }

    this.render();

  },

  updateLiveResult() {

    try {

      const value =
        Function(
          `"use strict"; return (${this.expression})`
        )();

      if (
        Number.isFinite(
          value
        )
      ) {

        this.result =
          String(
            Number(
              value.toFixed(
                10
              )
            )
          );

      }

    } catch {

      // Ignore live errors

    }

  },

  getCurrentNumber() {

    const match =
      this.expression.match(
        /(\d+\.?\d*)$/
      );

    return match
      ? match[1]
      : "";

  },

  loadHistoryItem(
    expression,
    result
  ) {

    this.expression =
      expression;

    this.result =
      result;

    this.render();

  },

  render() {

    if (
      this.expressionElement
    ) {

      this.expressionElement
        .textContent =
        this.expression ||
        "0";

    }

    if (
      this.resultElement
    ) {

      this.resultElement
        .textContent =
        this.result;

    }

  }

};

calculator.init();