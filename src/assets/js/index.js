(function() {
  document.getElementById("print").onclick = () => window.print();

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("../../sw.js");
    });
  }
})();
