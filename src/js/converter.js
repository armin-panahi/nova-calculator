const UnitConverter = {

  currentCategory: "length",

  categories: {

    length: {
      meter: 1,
      kilometer: 1000,
      centimeter: 0.01,
      millimeter: 0.001,
      inch: 0.0254,
      foot: 0.3048,
      yard: 0.9144,
      mile: 1609.344
    },

    weight: {
      kilogram: 1,
      gram: 0.001,
      milligram: 0.000001,
      pound: 0.45359237,
      ounce: 0.0283495231
    },

    area: {
      square_meter: 1,
      square_kilometer: 1000000,
      hectare: 10000,
      acre: 4046.8564224,
      square_foot: 0.092903
    },

    volume: {
      liter: 1,
      milliliter: 0.001,
      cubic_meter: 1000,
      gallon_us: 3.78541,
      pint_us: 0.473176
    },

    speed: {
      mps: 1,
      kph: 0.277777778,
      mph: 0.44704,
      knot: 0.514444
    },

    time: {
      second: 1,
      minute: 60,
      hour: 3600,
      day: 86400,
      week: 604800
    }

  },

  init() {

    this.cacheDOM();

    if (!this.categorySelect) {
      return;
    }

    this.bindEvents();

    this.populateUnits();

    this.restoreState();

    this.convert();

  },

  cacheDOM() {

    this.categorySelect =
      document.getElementById(
        "converterCategory"
      );

    this.fromSelect =
      document.getElementById(
        "converterFrom"
      );

    this.toSelect =
      document.getElementById(
        "converterTo"
      );

    this.valueInput =
      document.getElementById(
        "converterValue"
      );

    this.resultElement =
      document.getElementById(
        "converterResult"
      );

    this.swapButton =
      document.getElementById(
        "swapUnits"
      );

  },

  bindEvents() {

    this.categorySelect?.addEventListener(
      "change",
      () => {

        this.currentCategory =
          this.categorySelect.value;

        this.populateUnits();

        this.convert();

      }
    );

    this.fromSelect?.addEventListener(
      "change",
      () => this.convert()
    );

    this.toSelect?.addEventListener(
      "change",
      () => this.convert()
    );

    this.valueInput?.addEventListener(
      "input",
      () => this.convert()
    );

    this.swapButton?.addEventListener(
      "click",
      () => {

        const from =
          this.fromSelect.value;

        this.fromSelect.value =
          this.toSelect.value;

        this.toSelect.value =
          from;

        this.convert();

      }
    );

  },

  populateUnits() {

    const units =
      this.getUnits();

    this.fromSelect.innerHTML = "";
    this.toSelect.innerHTML = "";

    units.forEach(unit => {

      const option1 =
        document.createElement(
          "option"
        );

      option1.value = unit;

      option1.textContent =
        this.formatLabel(unit);

      const option2 =
        option1.cloneNode(true);

      this.fromSelect.appendChild(
        option1
      );

      this.toSelect.appendChild(
        option2
      );

    });

    if (units.length > 1) {

      this.toSelect.selectedIndex = 1;

    }

  },

  getUnits() {

    if (
      this.currentCategory ===
      "temperature"
    ) {

      return [
        "celsius",
        "fahrenheit",
        "kelvin"
      ];

    }

    return Object.keys(
      this.categories[
        this.currentCategory
      ] || {}
    );

  },

  convert() {

    const value =
      parseFloat(
        this.valueInput.value
      );

    if (
      isNaN(value)
    ) {

      this.resultElement.textContent =
        "0";

      return;

    }

    const from =
      this.fromSelect.value;

    const to =
      this.toSelect.value;

    let result = 0;

    if (
      this.currentCategory ===
      "temperature"
    ) {

      result =
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

      const baseValue =
        value * units[from];

      result =
        baseValue / units[to];

    }

    this.resultElement.textContent =
      this.formatNumber(result);

    this.saveState();

  },

  convertTemperature(
    value,
    from,
    to
  ) {

    let celsius;

    switch (from) {

      case "fahrenheit":

        celsius =
          (value - 32) * 5 / 9;

        break;

      case "kelvin":

        celsius =
          value - 273.15;

        break;

      default:

        celsius = value;

    }

    switch (to) {

      case "fahrenheit":

        return (
          celsius * 9 / 5
        ) + 32;

      case "kelvin":

        return (
          celsius + 273.15
        );

      default:

        return celsius;

    }

  },

  formatLabel(unit) {

    return unit
      .replaceAll("_", " ")
      .replace(
        /\b\w/g,
        char => char.toUpperCase()
      );

  },

  formatNumber(value) {

    if (
      Math.abs(value) >= 1000000
    ) {

      return value.toExponential(
        6
      );

    }

    return Number(
      value.toFixed(8)
    ).toString();

  },

  saveState() {

    if (
      typeof Storage ===
      "undefined"
    ) {
      return;
    }

    Storage.set(
      "nova_converter_state",
      {

        category:
          this.currentCategory,

        from:
          this.fromSelect.value,

        to:
          this.toSelect.value,

        value:
          this.valueInput.value

      }
    );

  },

  restoreState() {

    if (
      typeof Storage ===
      "undefined"
    ) {
      return;
    }

    const state =
      Storage.get(
        "nova_converter_state",
        null
      );

    if (!state) {
      return;
    }

    this.currentCategory =
      state.category ||
      "length";

    this.categorySelect.value =
      this.currentCategory;

    this.populateUnits();

    this.fromSelect.value =
      state.from ||
      this.fromSelect.value;

    this.toSelect.value =
      state.to ||
      this.toSelect.value;

    this.valueInput.value =
      state.value || "";

  }

};

document.addEventListener(
  "DOMContentLoaded",
  () => {

    UnitConverter.init();

  }
);