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

  lastCalculationElement:
    document.getElementById(
      "lastCalculation"
    ),

  init() {

    this.expression =
      Storage.loadExpression();

    this.result =
      Storage.loadResult();

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

  },

  appendNumber(value) {

    if (
      value === "."
    ) {

      const lastNumber =
        this.expression
          .split(/[+\-*/()%]/)
          .pop();

      if (
        lastNumber.includes(".")
      ) {
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

    this.saveState();

    this.render();

  },

  appendOperator(operator) {

    if (
      !this.expression.length
    ) {

      if (
        operator === "-"
      ) {

        this.expression = "-";

      }

      this.render();

      return;

    }

    const lastChar =
      this.expression[
        this.expression.length - 1
      ];

    if (
      "+-*/%".includes(
        lastChar
      )
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

    this.saveState();

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

      case "parentheses":

        this.insertParentheses();

        break;

      case "equal":

        this.calculate();

        break;

    }

  },

  deleteLast() {

    this.expression =
      this.expression.slice(
        0,
        -1
      );

    if (
      !this.expression.length
    ) {

      this.result = "0";

    }

    this.saveState();

    this.render();

  },

  insertParentheses() {

    const opens =
      (
        this.expression.match(
          /\(/g
        ) || []
      ).length;

    const closes =
      (
        this.expression.match(
          /\)/g
        ) || []
      ).length;

    if (
      opens === closes
    ) {

      this.expression += "(";

    } else {

      this.expression += ")";

    }

    this.saveState();

    this.render();

  },

  clear() {

    this.expression = "";

    this.result = "0";

    Storage.saveExpression("");

    Storage.saveResult("0");

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

      if (
        !Number.isFinite(
          value
        )
      ) {

        throw new Error();

      }

      const formatted =
        Number.isInteger(
          value
        )
          ? value
          : Number(
              value.toFixed(
                10
              )
            );

      this.result =
        String(
          formatted
        );

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

      Storage.saveResult(
        this.result
      );

    } catch {

      this.result =
        "Error";

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

    this.saveState();

    this.render();

  },

  saveState() {

    Storage.saveExpression(
      this.expression
    );

    Storage.saveResult(
      this.result
    );

  },

  render() {

    if (
      this.expressionElement
    ) {

      this.expressionElement.textContent =
        this.expression ||
        "0";

    }

    if (
      this.resultElement
    ) {

      this.resultElement.textContent =
        this.result;

    }

  }

};

document.addEventListener(
  "DOMContentLoaded",
  () => {

    calculator.init();

  }
);