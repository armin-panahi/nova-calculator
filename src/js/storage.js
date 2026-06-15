const Storage = {

  keys: {

    history: "nova_history",

    theme: "nova_theme",

    settings: "nova_settings"

  },

  set(key, value) {

    try {

      localStorage.setItem(
        key,
        JSON.stringify(value)
      );

      return true;

    } catch {

      return false;

    }

  },

  get(key, fallback = null) {

    try {

      const value =
        localStorage.getItem(key);

      if (value === null) {
        return fallback;
      }

      return JSON.parse(value);

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

  saveHistory(history) {

    return this.set(
      this.keys.history,
      history
    );

  },

  loadHistory() {

    return this.get(
      this.keys.history,
      []
    );

  },

  saveTheme(theme) {

    return this.set(
      this.keys.theme,
      theme
    );

  },

  loadTheme() {

    return this.get(
      this.keys.theme,
      "dark"
    );

  },

  saveSettings(settings) {

    return this.set(
      this.keys.settings,
      settings
    );

  },

  loadSettings() {

    return this.get(
      this.keys.settings,
      {}
    );

  }

};
