const Storage = {

  KEYS: {

    HISTORY: "nova_history",

    THEME: "nova_theme",

    EXPRESSION: "nova_expression",

    RESULT: "nova_result"

  },

  /* ==========================
     GENERIC
  ========================== */

  set(key, value) {

    try {

      localStorage.setItem(
        key,
        JSON.stringify(value)
      );

    } catch (error) {

      console.error(
        "Storage Save Error",
        error
      );

    }

  },

  get(key, fallback = null) {

    try {

      const data =
        localStorage.getItem(key);

      if (!data)
        return fallback;

      return JSON.parse(data);

    } catch {

      return fallback;

    }

  },

  remove(key) {

    localStorage.removeItem(key);

  },

  clear() {

    localStorage.clear();

  },

  /* ==========================
     HISTORY
  ========================== */

  saveHistory(history) {

    this.set(
      this.KEYS.HISTORY,
      history
    );

  },

  loadHistory() {

    return this.get(
      this.KEYS.HISTORY,
      []
    );

  },

  /* ==========================
     THEME
  ========================== */

  saveTheme(theme) {

    this.set(
      this.KEYS.THEME,
      theme
    );

  },

  loadTheme() {

    return this.get(
      this.KEYS.THEME,
      "dark"
    );

  },

  /* ==========================
     CALCULATOR STATE
  ========================== */

  saveExpression(expression) {

    this.set(
      this.KEYS.EXPRESSION,
      expression
    );

  },

  loadExpression() {

    return this.get(
      this.KEYS.EXPRESSION,
      ""
    );

  },

  saveResult(result) {

    this.set(
      this.KEYS.RESULT,
      result
    );

  },

  loadResult() {

    return this.get(
      this.KEYS.RESULT,
      "0"
    );

  },

  saveConverterHistory(history) {

this.set(
"nova_converter_history",
history
);

},

loadConverterHistory() {

return this.get(
"nova_converter_history",
[]
);

},


};