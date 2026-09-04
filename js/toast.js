(function () {
  function openToast(toast) { toast.classList.add("is-open"); }
  function closeToast(toast) { toast.classList.remove("is-open"); }

  document.querySelectorAll("[data-lb-toast]").forEach(function (toast) {
    var closeBtn = toast.querySelector("[data-lb-toast-close]");
    if (closeBtn) closeBtn.addEventListener("click", function () { closeToast(toast); });

    if (toast.getAttribute("data-lb-toast-auto") !== "off") {
      setTimeout(function () { openToast(toast); }, 12000);
    }
  });

  window.lbOpenToast = function (id) {
    var toast = document.getElementById(id);
    if (toast) openToast(toast);
  };
  window.lbCloseToast = function (id) {
    var toast = document.getElementById(id);
    if (toast) closeToast(toast);
  };
})();
