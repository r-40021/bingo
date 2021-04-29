export function loading() {
    loadingTimeout = setTimeout(() => {
      document.getElementById("fixed").classList.add("loaded");
      document.getElementById("loading").classList.add("loaded");
    }, 10000);
  }
export function myTimeOut() {
    window.addEventListener("load", () => {
      clearTimeout(loadingTimeout);
      document.getElementById("fixed").classList.add("loaded");
      document.getElementById("loading").classList.add("loaded");
    });
  }