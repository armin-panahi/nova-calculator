const calculator = {

  expression: "",

  result: "0",

  expressionElement: document.getElementById("expression"),

  resultElement: document.getElementById("result"),

  init() {

    this.bindEvents();

    this.render();

  },

  bindEvents() {

    const keypad = document.getElementById("keypad");

    keypad.addEventListener("click", (event) => {

      const button = event.target.closest("button");

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

  appendNumber(value) {

    if (
      this.expression === "0" &&
      value !== "."
    ) {
      this.expression = value;
    } else {
      this.expression += value;
    }

    this.render();

  },

  appendOperator(operator) {

    if (!this.expression.length) return;

    const lastChar =
      this.expression[this.expression.length - 1];

    if ("+-*/%".includes(lastChar)) {

      this.expression =
        this.expression.slice(0, -1) + operator;

    } else {

      this.expression += operator;

    }

    this.render();

  },

  handleAction(action) {

    switch (action) {

      case "clear":
        this.clear();
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

  calculate() {

    if (!this.expression) return;

    try {

      const value =
        Function(
          `"use strict"; return (${this.expression})`
        )();

      this.result = String(value);

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
