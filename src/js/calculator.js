const calculator = {

expression: "",
result: "0",

expressionElement: null,
resultElement: null,
lastCalculationElement: null,

init() {


this.expressionElement =
  document.getElementById("expression");

this.resultElement =
  document.getElementById("result");

this.lastCalculationElement =
  document.getElementById("lastCalculation");

this.loadState();

this.bindEvents();

this.bindKeyboardEvents();

this.render();


},

bindEvents() {


const keypad =
  document.getElementById("keypad");

if (!keypad) return;

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

document
  .querySelectorAll(".scientific-btn")
  .forEach(btn => {

    btn.addEventListener(
      "click",
      () => {

        const action =
          btn.dataset.scientific;

        this.handleAction(action);

      }
    );

  });


},

bindKeyboardEvents() {


document.addEventListener(
  "keydown",
  (event) => {

    const key = event.key;

    if (/^[0-9]$/.test(key)) {

      this.appendNumber(key);
      return;

    }

    if (key === ".") {

      this.appendNumber(".");
      return;

    }

    if (
      ["+","-","*","/"]
      .includes(key)
    ) {

      this.appendOperator(key);
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

    if (key === "Backspace") {

      event.preventDefault();

      this.deleteLast();

      return;

    }

    if (key === "Escape") {

      this.clear();

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
    this.expression.slice(0,-1) +
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

  case "sqrt":
    this.sqrt();
    break;

  case "square":
    this.square();
    break;

  case "pi":
    this.insertPi();
    break;

  case "sin":
    this.sin();
    break;

  case "cos":
    this.cos();
    break;

  case "tan":
    this.tan();
    break;

  case "log":
    this.log();
    break;

  case "equal":
    this.calculate();
    break;

}


},

deleteLast() {


this.expression =
  this.expression.slice(0,-1);

this.render();


},

clear() {


this.expression = "";
this.result = "0";

this.render();


},

percent() {


if (!this.expression) return;

try {

  const value =
    Function(
      `"use strict";return (${this.expression})`
    )();

  this.expression =
    String(value / 100);

} catch {

  this.result = "Error";

}

this.render();


},

sqrt() {


const value =
  Number(this.expression || 0);

this.expression =
  String(Math.sqrt(value));

this.render();


},

square() {


const value =
  Number(this.expression || 0);

this.expression =
  String(value * value);

this.render();


},

insertPi() {


this.expression +=
  Math.PI.toFixed(8);

this.render();


},

sin() {


const value =
  Number(this.expression || 0);

this.expression =
  String(
    Math.sin(
      value * Math.PI / 180
    )
  );

this.render();


},

cos() {


const value =
  Number(this.expression || 0);

this.expression =
  String(
    Math.cos(
      value * Math.PI / 180
    )
  );

this.render();


},

tan() {


const value =
  Number(this.expression || 0);

this.expression =
  String(
    Math.tan(
      value * Math.PI / 180
    )
  );

this.render();


},

log() {


const value =
  Number(this.expression || 0);

this.expression =
  String(
    Math.log10(value)
  );

this.render();


},

calculate() {


if (!this.expression)
  return;

try {

  const value =
    Function(
      `"use strict";return (${this.expression})`
    )();

  this.result =
    Number.isFinite(value)
      ? String(value)
      : "Error";

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


this.expression = expression;
this.result = result;

this.render();


},

saveState() {


if (
  typeof Storage ===
  "undefined"
) return;

Storage.saveExpression(
  this.expression
);

Storage.saveResult(
  this.result
);


},

loadState() {


if (
  typeof Storage ===
  "undefined"
) return;

this.expression =
  Storage.loadExpression();

this.result =
  Storage.loadResult();


},

currentNumberHasDecimal() {


const parts =
  this.expression.split(/[+\-*/]/g);

const current =
  parts[parts.length - 1];

return current.includes(".");


},

render() {


if (this.expressionElement) {

  this.expressionElement.textContent =
    this.expression || "0";

}

if (this.resultElement) {

  this.resultElement.textContent =
    this.result;

}

this.saveState();


}

};

document.addEventListener(
"DOMContentLoaded",
() => {


calculator.init();


}
);
