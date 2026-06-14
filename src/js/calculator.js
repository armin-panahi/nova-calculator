const calculator = {

  expression: "",

  result: "0",

  openParentheses: 0,

  expressionElement:
    document.getElementById("expression"),

  resultElement:
    document.getElementById("result"),

  init() {

    this.bindEvents();

    this.bindKeyboard();

    this.render();

  },

  bindEvents() {

    const keypad =
      document.getElementById("keypad");

    keypad.addEventListener("click", (event) => {

      const button =
        event.target.closest("button");

      if (!button) return;

      const number = button.dataset.number;
      const operator = button.dataset.operator;
      const action = button.dataset.action;

      if (number !== undefined) {
        this.appendNumber(number);
        return;
      }

      if (operator !== undefined) {
        this.appendOperator(operator);
        return;
      }

      if (action !== undefined) {
        this.handleAction(action);
      }

    });

  },

  bindKeyboard() {

    document.addEventListener(
      "keydown",
      (event) => {

        const key = event.key;

        if ("0123456789".includes(key)) {
          this.appendNumber(key);
          return;
        }

        if (key === ".") {
          this.appendNumber(".");
          return;
        }

        if ("+-*/".includes(key)) {
          this.appendOperator(key);
          return;
        }

        if (key === "Enter") {
          this.calculate();
          return;
        }

        if (key === "Backspace") {
          this.delete();
          return;
        }

        if (key === "Escape") {
          this.clear();
          return;
        }

        if (
          key === "(" ||
          key === ")"
        ) {
          this.toggleParentheses();
        }

      }
    );

  },

  appendNumber(value) {

    if (value === ".") {

      const parts =
        this.expression.split(/[+\-*/()]/);

      const current =
        parts[parts.length - 1];

      if (current.includes(".")) {
        return;
      }

    }

    if (
      this.expression === "0" &&
      value !== "."
    ) {

      this.expression = value;

    } else {

      this.expression += value;

    }

    this.updateLiveResult();

    this.render();

  },

  appendOperator(operator) {

    if (!this.expression.length) return;

    const lastChar =
      this.expression[
        this.expression.length - 1
      ];

    if (
      "+-*/".includes(lastChar)
    ) {

      this.expression =
        this.expression.slice(0, -1) +
        operator;

    } else {

      this.expression += operator;

    }

    this.render();

  },

  toggleParentheses() {

    const lastChar =
      this.expression[
        this.expression.length - 1
      ];

    if (
      !this.expression ||
      "+-*/(".includes(lastChar)
    ) {

      this.expression += "(";

      this.openParentheses++;

    } else {

      if (
        this.openParentheses > 0
      ) {

        this.expression += ")";

        this.openParentheses--;

      }

    }

    this.render();

  },

  handleAction(action) {

    switch (action) {

      case "clear":
        this.clear();
        break;

      case "delete":
        this.delete();
        break;

      case "equal":
        this.calculate();
        break;

      case "parentheses":
        this.toggleParentheses();
        break;

    }

  },

  delete() {

    if (!this.expression.length)
      return;

    const last =
      this.expression[
        this.expression.length - 1
      ];

    if (last === "(")
      this.openParentheses--;

    if (last === ")")
      this.openParentheses++;

    this.expression =
      this.expression.slice(0, -1);

    this.updateLiveResult();

    this.render();

  },

  updateLiveResult() {

    if (!this.expression) {

      this.result = "0";

      return;

    }

    try {

      const value =
        Function(
          `"use strict"; return (${this.expression})`
        )();

      if (
        value !== undefined &&
        !Number.isNaN(value)
      ) {

        this.result = String(value);

      }

    } catch {}

  },

  clear() {

    this.expression = "";

    this.result = "0";

    this.openParentheses = 0;

    this.render();

  },

  calculate() {

    if (!this.expression) return;

    try {

      const value =
        Function(
          `"use strict"; return (${this.expression})`
        )();

      this.result = String(value);

      this.expression =
        String(value);

      this.openParentheses = 0;

    } catch {

      this.result = "Error";

    }

    this.render();

  },

  render() {

    this.expressionElement.textContent =
      this.expression || "0";

    this.resultElement.textContent =
      this.result;

  }

};

calculator.init();