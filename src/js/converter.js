const Converter = {

  currentCategory: "length",

  categories: {

    length: {
      meter: 1,
      kilometer: 1000,
      centimeter: 0.01,
      millimeter: 0.001,
      mile: 1609.344,
      yard: 0.9144,
      foot: 0.3048,
      inch: 0.0254
    },

    weight: {
      kilogram: 1,
      gram: 0.001,
      milligram: 0.000001,
      pound: 0.45359237,
      ounce: 0.0283495231,
      ton: 1000
    },

    area: {
      "square-meter": 1,
      "square-kilometer": 1000000,
      hectare: 10000,
      acre: 4046.8564224,
      "square-foot": 0.092903,
      "square-inch": 0.00064516
    },

    volume: {
      liter: 1,
      milliliter: 0.001,
      cubicmeter: 1000,
      gallon: 3.78541,
      quart: 0.946353,
      pint: 0.473176
    },

    speed: {
      "m/s": 1,
      "km/h": 0.277778,
      mph: 0.44704,
      knot: 0.514444
    },

    time: {
      second: 1,
      minute: 60,
      hour: 3600,
      day: 86400,
      week: 604800
    },

    data: {
      byte: 1,
      kilobyte: 1024,
      megabyte: 1048576,
      gigabyte: 1073741824,
      terabyte: 1099511627776
    }

  },

  init() {

    this.cacheElements();

    if (!this.container) return;

    this.restoreState();

    this.bindEvents();

    this.loadUnits();

    this.convert();

  },

  cacheElements() {

    this.container =
      document.getElementById("converterPage");

    this.category =
      document.getElementById("converterCategory");

    this.input =
      document.getElementById("converterInput");

    this.from =
      document.getElementById("converterFrom");

    this.to =
      document.getElementById("converterTo");

    this.result =
      document.getElementById("converterResult");

    this.swap =
      document.getElementById("converterSwap");

  },

  bindEvents() {

    this.category?.addEventListener(
      "change",
      () => {

        this.currentCategory =
          this.category.value;

        localStorage.setItem(
          "nova_converter_category",
          this.currentCategory
        );

        this.loadUnits();

        this.convert();

      }
    );

    this.input?.addEventListener(
      "input",
      () => {

        this.convert();

      }
    );

    this.from?.addEventListener(
      "change",
      () => {

        this.convert();

      }
    );

    this.to?.addEventListener(
      "change",
      () => {

        this.convert();

      }
    );

    this.swap?.addEventListener(
      "click",
      () => {

        const temp =
          this.from.value;

        this.from.value =
          this.to.value;

        this.to.value =
          temp;

        this.convert();

      }
    );

  },

  restoreState() {

    const saved =
      localStorage.getItem(
        "nova_converter_category"
      );

    if (
      saved &&
      this.categories[saved]
    ) {

      this.currentCategory =
        saved;

      if (this.category) {

        this.category.value =
          saved;

      }

    }

  },

  loadUnits() {

    if (
      !this.from ||
      !this.to
    ) return;

    this.from.innerHTML = "";

    this.to.innerHTML = "";

    const categoryUnits =
      this.categories[
        this.currentCategory
      ];

    Object.keys(categoryUnits)
      .forEach(unit => {

        const option1 =
          document.createElement(
            "option"
          );

        option1.value =
          unit;

        option1.textContent =
          this.pretty(unit);

        const option2 =
          option1.cloneNode(true);

        this.from.appendChild(
          option1
        );

        this.to.appendChild(
          option2
        );

      });

    if (
      this.from.options.length > 0
    ) {

      this.from.selectedIndex = 0;

    }

    if (
      this.to.options.length > 1
    ) {

      this.to.selectedIndex = 1;

    }

  },

  convert() {

    const value =
      Number(this.input.value);

    if (
      Number.isNaN(value)
    ) {

      this.result.textContent =
        "0";

      return;

    }

    const from =
      this.from.value;

    const to =
      this.to.value;

    let output = 0;

    if (
      this.currentCategory ===
      "temperature"
    ) {

      output =
        this.convertTemperature(
          value,
          from,
          to
        );

    } else {

      const units =
        this.categories[
          this.currentCategory
        ];

      const base =
        value *
        units[from];

      output =
        base /
        units[to];

    }

    this.result.textContent =
      this.format(output);

  },

  convertTemperature(
    value,
    from,
    to
  ) {

    if (from === to)
      return value;

    let celsius;

    switch (from) {

      case "celsius":
        celsius = value;
        break;

      case "fahrenheit":
        celsius =
          (value - 32) *
          5 / 9;
        break;

      case "kelvin":
        celsius =
          value - 273.15;
        break;

    }

    switch (to) {

      case "celsius":
        return celsius;

      case "fahrenheit":
        return (
          celsius * 9 / 5
          + 32
        );

      case "kelvin":
        return (
          celsius + 273.15
        );

    }

    return value;

  },

  format(number) {

    if (
      Math.abs(number) >=
      1000000
    ) {

      return number.toLocaleString(
        "en-US",
        {
          maximumFractionDigits: 4
        }
      );

    }

    return parseFloat(
      number.toFixed(8)
    ).toString();

  },

  pretty(unit) {

    return unit
      .replaceAll("-", " ")
      .replace(/\b\w/g,
        char =>
          char.toUpperCase()
      );

  }

};

document.addEventListener(
  "DOMContentLoaded",
  () => {

    Converter.init();

  }
);
