const Storage = {

  HISTORY_KEY: "nova_history",

  saveHistory(history) {

    localStorage.setItem(
      this.HISTORY_KEY,
      JSON.stringify(history)
    );

  },

  loadHistory() {

    const data =
      localStorage.getItem(
        this.HISTORY_KEY
      );

    if (!data) return [];

    try {

      return JSON.parse(data);

    } catch {

      return [];

    }

  }

};