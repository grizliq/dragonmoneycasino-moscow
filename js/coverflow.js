(function () {
  function initCoverflow(root) {
    var track = root.querySelector(".lb-slider-coverflow__track");
    if (!track) return;

    var timer = null;
    var interval = Number(root.getAttribute("data-interval")) || 2400;
    var busy = false;

    function slides() {
      return Array.prototype.slice.call(track.querySelectorAll(".lb-slider-coverflow__slide"));
    }

    function paint(centerIndex) {
      var list = slides();
      list.forEach(function (el, i) {
        var dist = Math.abs(i - centerIndex);
        el.classList.toggle("is-center", dist === 0);
        el.classList.toggle("is-near", dist === 1);
      });
    }

    function setCenter(index, withTransition) {
      var list = slides();
      if (list.length < 5) return;
      paint(index);
      var left = list[index - 2] || list[0];
      var apply = function () {
        track.style.transform = "translate3d(" + -left.offsetLeft + "px,0,0)";
      };
      if (withTransition === false) {
        var prev = track.style.transition;
        track.style.transition = "none";
        apply();
        void track.offsetHeight;
        track.style.transition = prev;
      } else {
        requestAnimationFrame(function () {
          requestAnimationFrame(apply);
        });
      }
    }

    function next() {
      if (busy) return;
      busy = true;
      setCenter(3, true);
      setTimeout(function () {
        var list = slides();
        track.appendChild(list[0]);
        setCenter(2, false);
        busy = false;
      }, 560);
    }

    function start() {
      stop();
      timer = setInterval(next, interval);
    }

    function stop() {
      if (timer) clearInterval(timer);
      timer = null;
    }

    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    window.addEventListener("resize", function () {
      setCenter(2, false);
    });
    setCenter(2, false);
    start();
  }

  document.querySelectorAll(".lb-slider-coverflow").forEach(initCoverflow);
})();
