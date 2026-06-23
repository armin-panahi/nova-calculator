const Toast = {

  container: null,

  init() {

    this.container =
      document.createElement("div");

    this.container.className =
      "toast-container";

    document.body.appendChild(
      this.container
    );

  },

  show(
    message,
    type = "info",
    duration = 2500
  ) {

    const toast =
      document.createElement("div");

    toast.className =
      `toast toast-${type}`;

    toast.textContent =
      message;

    this.container.appendChild(
      toast
    );

    requestAnimationFrame(() => {

      toast.classList.add("show");

    });

    setTimeout(() => {

      toast.classList.remove("show");

      setTimeout(() => {

        toast.remove();

      }, 300);

    }, duration);

  }

};

document.addEventListener(
  "DOMContentLoaded",
  () => {

    Toast.init();

  }
);