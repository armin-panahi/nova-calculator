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

```
this.bindKeyboard();

this.render();
```

},

bindEvents() {
const keypad =
document.getElementById("keypad");

```
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
```

},

bindKeyboard() {
document.addEventListener(
"keydown",
(event) => {
const key = event.key;

```
    if (
      /^[0-9]$/.test(key)
    ) {
      this.appendNumber(key);
      return;
    }

    if (key === ".") {
      this.appendNumber(".");
      return;
    }

    if (
      ["+", "-", "*", "/"]
        .includes(key)
    ) {
      this.appendOperator(key);
      return;
    }

    if (key === "Enter") {
      event.preventDefault();

      this.calculate();
      return;
    }

    if (key === "Backspace") {
      this.deleteLast();
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
      this.expression += key;

      this.render();
    }

    if (key === "%") {
      this.expression += "%";

      this.render();
    }
  }
);
```

},

appendNumber(value) {
if (
value === "." &&
this.currentNumberHasDecimal()
) {
return;
}

```
if (
  this.expression === "0" &&
  value !== "."
) {
  this.expression = value;
} else {
  this.expression += value;
}

this.render();
```

},

currentNumberHasDecimal() {
const parts =
this.expression.split(
/[+-*/()]/
);

```
const current =
  parts[parts.length - 1];

return current.includes(".");
```

},

appendOperator(operator) {
if (!this.expression.length)
return;

```
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
```

},

handleAction(action) {
switch (action) {
case "clear":
this.clear();
break;

```
  case "delete":
    this.deleteLast();
    break;

  case "equal":
    this.calculate();
    break;

  case "parentheses":
    this.insertParentheses();
    break;
}
```

},

insertParentheses() {
const open =
(
this.expression.match(/(/g)
|| []
).length;

```
const close =
  (
    this.expression.match(/\)/g)
    || []
  ).length;

if (open > close) {
  this.expression += ")";
} else {
  this.expression += "(";
}

this.render();
```

},

deleteLast() {
this.expression =
this.expression.slice(0, -1);

```
if (
  this.expression.length === 0
) {
  this.result = "0";
}

this.render();
```

},

clear() {
this.expression = "";

```
this.result = "0";

this.render();
```

},

normalizeExpression() {
return this.expression.replace(
/(\d+(.\d+)?)%/g,
"($1/100)"
);
},

calculate() {
if (!this.expression)
return;

```
try {
  const safeExpression =
    this.normalizeExpression();

  const value =
    Function(
      `"use strict"; return (${safeExpression})`
    )();

  if (
    value === Infinity ||
    value === -Infinity
  ) {
    throw new Error();
  }

  const result =
    Number(value);

  this.result =
    this.formatNumber(result);

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
```

},

formatNumber(value) {
if (
Number.isInteger(value)
) {
return value.toLocaleString();
}

```
return Number(
  value.toFixed(10)
)
  .toString();
```

},

loadHistoryItem(
expression,
result
) {
this.expression =
expression;

```
this.result =
  result;

this.render();
```

},

render() {
this.expressionElement.textContent =
this.expression || "0";

```
this.resultElement.textContent =
  this.result;
```

}
};

calculator.init();
