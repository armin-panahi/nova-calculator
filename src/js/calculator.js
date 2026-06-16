const calculator = {

  expression: "",

  result: "0",

  expressionElement:
    document.getElementById("expression"),

  resultElement:
    document.getElementById("result"),

  lastCalculationElement:
    document.getElementById("lastCalculation"),

  init() {

    this.bindEvents();

    this.render();

  },

  bindEvents() {

    const keypad =
      document.getElementById("keypad");

    keypad.addEventListener(
      "click",
      (event) => {

        const button =
          event.target.closest("button");

        if (!button) return;

        const number =
          button.dataset.number;

        const operator =
          button.dataset.operator;

        const action =
          button.dataset.action;

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

      }
    );

  },

  appendNumber(value) {

    if (
      value === "." &&
      this.currentNumberHasDecimal()
    ) {
      return;
    }

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

    if (!this.expression.length)
      return;

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

  handleAction(action) {

    switch (action) {

      case "clear":

        this.clear();

        break;

      case "delete":

        this.deleteLast();

        break;

      case "percent":

        this.percent();

        break;

      case "equal":

        this.calculate();

        break;

    }

  },

  deleteLast() {

    this.expression =
      this.expression.slice(0, -1);

    this.render();

  },

  percent() {

    if (!this.expression)
      return;

    try {

      const value =
        Function(
          `"use strict"; return (${this.expression})`
        )();

      this.expression =
        String(value / 100);

      this.render();

    } catch {

      this.result = "Error";

      this.render();

    }

  },

  clear() {

    this.expression = "";

    this.result = "0";

    this.render();

  },

  calculate() {

    if (!this.expression)
      return;

    try {

      const value =
        Function(
          `"use strict"; return (${this.expression})`
        )();

      if (
        value === Infinity ||
        value === -Infinity
      ) {

        this.result = "Error";

      } else {

        this.result = String(value);

      }

      if (
        typeof HistoryManager !==
        "undefined"
      ) {

        HistoryManager.add(
          this.expression,
          this.result
        );

      }

      if (
        this.lastCalculationElement
      ) {

        this.lastCalculationElement.textContent =
          `${this.expression} = ${this.result}`;

      }

    } catch {

      this.result = "Error";

    }

    this.render();

  },

  loadHistoryItem(
    expression,
    result
  ) {

    this.expression =
      expression;

    this.result =
      result;

    if (
      this.lastCalculationElement
    ) {

      this.lastCalculationElement.textContent =
        `${expression} = ${result}`;

    }

    this.render();

  },

  currentNumberHasDecimal() {

    const parts =
      this.expression.split(
        /[\+\-\*\/]/g
      );

    const current =
      parts[parts.length - 1];

    return current.includes(".");

  },

  render() {

    this.expressionElement.textContent =
      this.expression || "0";

    this.resultElement.textContent =
      this.result;

  }

};

document.addEventListener(
  "DOMContentLoaded",
  () => {

    calculator.init();

  }
);