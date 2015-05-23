// Based off of http://stackoverflow.com/questions/16322869/trying-to-create-a-confetti-effect-in-html5-how-do-i-get-a-different-fill-color
// and http://codepen.io/linrock/pen/Amdhr
;(function (global) {
  'use strict';

  var DEFAULT_NUM_CONFETTI = 500,
    animate = global.requestAnimationFrame ||
      global.webkitRequestAnimationFrame ||
      global.mozRequestAnimationFrame ||
      function (cb) {
        setTimeout(callback, 1000 / 60);
      };

  function Canvas(element, canvas) {
    this.element = element;
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.width = element.offsetWidth;
    this.height = element.offsetHeight;
  }

  Canvas.prototype.setDimensions = function () {
    if (!document.body.contains(this.element) || !document.body.contains(this.canvas)) {
      this.destroy();
      return;
    }
    this.width = this.element.offsetWidth;
    this.height = this.element.offsetHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  };

  Canvas.prototype.step = function (particles, config) {
    var canvas = this;
    return function animator() {
      if (canvas.halt) {
        return;
      }
      var context = canvas.context;
      context.clearRect(0, 0, canvas.width, canvas.height);
      if (config.updateState) {
        config.updateState();
      }
      for (var i = 0; i < particles.length; i++) {
        config.draw(particles[i], i);
        config.updatePosition(particles[i], i);
      }
      if (config.batch) {
        context[(config.fill) ? 'fill' : 'stroke']();
      }
      global.Confetti.animate(canvas.step(particles, config));
    };
  };

  Canvas.prototype.destroy = function () {
    var canvas = this;
    global.removeEventListener('resize', canvas.setDimensions);
    canvas.halt = true;
  };

  function ConfettiClass(config) {
    var that = this;
    Object.keys(config).forEach(function (prop) {
      that[prop] = config[prop];
    });
    if (!config.d) {
      this.d = randomFrom(10, DEFAULT_NUM_CONFETTI + 10);
    }
    if (!config.color) {
      this.color = color();
    }
  }

  ConfettiClass.prototype.isFlakeExiting = function (canvas) {
    return (this.x > canvas.width + 5 || this.x < -5 || this.y > canvas.height);
  };

  global.Confetti = {
    DEFAULT_NUM: DEFAULT_NUM_CONFETTI,
    color: color,
    randomFrom: randomFrom,
    animate: animate.bind(global),
    createCanvas: function (element, canvas) {
      var newCanvas = new Canvas(element, canvas);
      global.addEventListener('resize', newCanvas.setDimensions.bind(newCanvas));
      newCanvas.setDimensions();

      return newCanvas;
    },
    create: function (config) {
      return new ConfettiClass(config);
    }
  };

  function color() {
    return 'rgba(' + randomFrom(0, 256) + ', ' +
      randomFrom(0, 256) + ', ' +
      randomFrom(0, 256) + ', ' + Math.random() + ')';
  }

  function randomFrom(a, b, factor) {
    if (!factor) {
      factor = 1;
    }
    return a + (Math.floor((b - a) * Math.random() * factor) / factor);
  }
})(window);
