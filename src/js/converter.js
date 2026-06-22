const UnitConverter = {

  currentCategory: "length",

  categories: {


    /* ==========================
       LENGTH
    ========================== */

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

    /* ==========================
       WEIGHT
    ========================== */

    weight: {
      kilogram: 1,
      gram: 0.001,
      milligram: 0.000001,
      pound: 0.45359237,
      ounce: 0.0283495231,
      ton: 1000
    },

    /* ==========================
       AREA
    ========================== */

    area: {
      square_meter: 1,
      square_kilometer: 1000000,
      hectare: 10000,
      acre: 4046.8564224,
      square_foot: 0.092903,
      square_inch: 0.00064516
    },

    /* ==========================
       VOLUME
    ========================== */

    volume: {
      liter: 1,
      milliliter: 0.001,
      cubic_meter: 1000,
      gallon_us: 3.78541,
      pint_us: 0.473176,
      fluid_ounce_us: 0.0295735
    },

    /* ==========================
       SPEED
    ========================== */

    speed: {
      mps: 1,
      kph: 0.277777778,
      mph: 0.44704,
      knot: 0.514444
    },

    /* ==========================
       TIME
    ========================== */

    time: {
      second: 1,
      minute: 60,
      hour: 3600,
      day: 86400,
      week: 604800,
      month: 2629800,
      year: 31557600
    },

    /* ==========================
       DATA STORAGE
    ========================== */

    data: {
      byte: 1,
      kilobyte: 1024,
      megabyte: 1048576,
      gigabyte: 1073741824,
      terabyte: 1099511627776
    },

    /* ==========================
       ENERGY
    ========================== */

    energy: {
      joule: 1,
      kilojoule: 1000,
      calorie: 4.184,
      kilocalorie: 4184,
      watt_hour: 3600,
      kilowatt_hour: 3600000
    },

    /* ==========================
       PRESSURE
    ========================== */

    pressure: {
      pascal: 1,
      kilopascal: 1000,
      bar: 100000,
      psi: 6894.757,
      atmosphere: 101325
    },

    /* ==========================
       ANGLE
    ========================== */

    angle: {
      degree: 1,
      radian: 57.2957795,
      gradian: 0.9
    },

    /* ==========================
       FREQUENCY
    ========================== */

    frequency: {
      hertz: 1,
      kilohertz: 1000,
      megahertz: 1000000,
      gigahertz: 1000000000
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

    this.copyButton =
      document.getElementById(
        "copyConverterResult"
      );

    this.clearButton =
      document.getElementById(
        "clearConverter"
      );

    this.presetCards =
      document.querySelectorAll(
        ".preset-card"
      );

    this.favoriteButton =
      document.getElementById(
        "favoriteConversion"
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

        this.swapButton.classList.add(
          "swapping"
        );

        setTimeout(() => {

          this.swapButton.classList.remove(
            "swapping"
          );

        }, 400);

        this.convert();

      }
    );


    this.copyButton?.addEventListener(
      "click",
      () => {

        navigator.clipboard.writeText(
          this.resultElement.textContent
        );

        this.copyButton.textContent =
          "Copied!";

        setTimeout(() => {

          this.copyButton.textContent =
            "Copy";

        }, 1200);

      }
    );

    this.clearButton?.addEventListener(
      "click",
      () => {

        this.valueInput.value = "";

        this.resultElement.textContent =
          "0";

      }
    );

    this.presetCards?.forEach(
      card => {

        card.addEventListener(
          "click",
          () => {

            const category =
              card.dataset.category;

            const from =
              card.dataset.from;

            const to =
              card.dataset.to;

            this.currentCategory =
              category;

            this.categorySelect.value =
              category;

            this.populateUnits();

            this.fromSelect.value =
              from;

            this.toSelect.value =
              to;

            this.convert();

          }
        );

      }
    );

    this.favoriteButton?.addEventListener(
      "click",
      () => {

        if (
          typeof ConverterFavorites ===
          "undefined"
        ) {
          return;
        }

        ConverterFavorites.add({

          category:
            this.currentCategory,

          from:
            this.fromSelect.value,

          to:
            this.toSelect.value

        });

      }
    );

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

  convert() {


    const value =
      parseFloat(
        this.valueInput.value
      );

    if (isNaN(value)) {

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

    if (
      typeof ConverterHistory !==
      "undefined"
    ) {

      ConverterHistory.add({

        value,

        from,

        to,

        result:
          this.formatNumber(result)

      });

    }

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


    const state =
      Storage.get(
        "nova_converter_state",
        null
      );

    if (!state) return;

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
