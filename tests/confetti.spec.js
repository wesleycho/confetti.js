'use strict';

describe('Confetti', function () {
  var body, canvasElem, parentElem;

  beforeEach(function () {
    body = document.querySelector('body');
    parentElem = document.createElement('div');
    canvasElem = document.createElement('canvas');

    body.appendChild(parentElem);
    parentElem.appendChild(canvasElem);

    parentElem.style.width = '100px';
    parentElem.style.height = '200px';
  });

  it('should contain the correct public API', function () {
    expect(Confetti).toEqual({
      DEFAULT_NUM: 500,
      color: jasmine.any(Function),
      randomFrom: jasmine.any(Function),
      animate: jasmine.any(Function),
      createCanvas: jasmine.any(Function),
      create: jasmine.any(Function)
    });
  });

  it('should return a rgba color string', function () {
    runColorTest();
    runColorTest();
    runColorTest();
    runColorTest();
    runColorTest();
    runColorTest();
    runColorTest();
    runColorTest();
    runColorTest();
    runColorTest();
    runColorTest();
    runColorTest();

    function runColorTest() {
      var color = Confetti.color();
      expect(color).toMatch(/rgba\([0-9]+,\s[0-9]+,\s[0-9]+,\s0(.[0-9]+)?\)/);

      var MATCHER = /rgba\(([0-9]+),\s([0-9]+),\s([0-9]+),\s(0(.[0-9]+)?)\)/;
      var match = color.match(MATCHER);

      expect(+match[1] >= 0 && +match[1] < 256).toBe(true);
      expect(+match[2] >= 0 && +match[2] < 256).toBe(true);
      expect(+match[3] >= 0 && +match[3] < 256).toBe(true);
      expect(+match[4] >= 0 && +match[4] < 1).toBe(true);
    }
  });

  it('should return a random number between 0 and 5, excluding 5', function () {
    expect(Confetti.randomFrom(0, 5)).toMatch(/[0-4]/);
    expect(Confetti.randomFrom(0, 5)).toMatch(/[0-4]/);
    expect(Confetti.randomFrom(0, 5)).toMatch(/[0-4]/);
    expect(Confetti.randomFrom(0, 5)).toMatch(/[0-4]/);
    expect(Confetti.randomFrom(0, 5)).toMatch(/[0-4]/);
    expect(Confetti.randomFrom(0, 5)).toMatch(/[0-4]/);
    expect(Confetti.randomFrom(0, 5)).toMatch(/[0-4]/);
    expect(Confetti.randomFrom(0, 5)).toMatch(/[0-4]/);
    expect(Confetti.randomFrom(0, 5)).toMatch(/[0-4]/);
    expect(Confetti.randomFrom(0, 5)).toMatch(/[0-4]/);
  });

  it('should return a random number up to two decimal places', function () {
    expect(Confetti.randomFrom(0, 1, 100)).toMatch(/^0\.[0-9]{1,2}|0$/);
    expect(Confetti.randomFrom(0, 1, 100)).toMatch(/^0\.[0-9]{1,2}|0$/);
    expect(Confetti.randomFrom(0, 1, 100)).toMatch(/^0\.[0-9]{1,2}|0$/);
    expect(Confetti.randomFrom(0, 1, 100)).toMatch(/^0\.[0-9]{1,2}|0$/);
    expect(Confetti.randomFrom(0, 1, 100)).toMatch(/^0\.[0-9]{1,2}|0$/);
    expect(Confetti.randomFrom(0, 1, 100)).toMatch(/^0\.[0-9]{1,2}|0$/);
    expect(Confetti.randomFrom(0, 1, 100)).toMatch(/^0\.[0-9]{1,2}|0$/);
    expect(Confetti.randomFrom(0, 1, 100)).toMatch(/^0\.[0-9]{1,2}|0$/);
    expect(Confetti.randomFrom(0, 1, 100)).toMatch(/^0\.[0-9]{1,2}|0$/);
    expect(Confetti.randomFrom(0, 1, 100)).toMatch(/^0\.[0-9]{1,2}|0$/);
  });

  it('should create a canvas instance', function () {
    var canvas = Confetti.createCanvas(parentElem, canvasElem);

    expect(canvas.constructor.name).toBe('Canvas');
    expect(canvas.element).toBe(parentElem);
    expect(canvas.canvas).toBe(canvasElem);
    expect(canvas.context).toBe(canvasElem.getContext('2d'));
    expect(canvas.width).toBe(100);
    expect(canvas.height).toBe(200);
    expect(canvas.setDimensions).toEqual(jasmine.any(Function));
    expect(canvas.step).toEqual(jasmine.any(Function));

    canvas.destroy();
  });

  it('should change the dimensions of the canvas element', function () {
    var canvas = Confetti.createCanvas(parentElem, canvasElem);

    expect(canvas.width).toBe(100);
    expect(canvas.height).toBe(200);

    parentElem.style.width = '200px';
    parentElem.style.height = '300px';

    canvas.setDimensions();

    expect(canvas.width).toBe(200);
    expect(canvas.height).toBe(300);
    expect(canvasElem.width).toBe(200);
    expect(canvasElem.height).toBe(300);

    canvas.destroy();
  });

  it('should destroy the canvas element\'s binding', function () {
    var canvas = Confetti.createCanvas(parentElem, canvasElem);

    expect(canvas.halt).toBeUndefined();

    canvas.destroy();

    expect(canvas.halt).toBe(true);
  });

  it('should create a confetti instance', function () {
    runConfettiTest();
    runConfettiTest();
    runConfettiTest();
    runConfettiTest();
    runConfettiTest();
    runConfettiTest();
    runConfettiTest();
    runConfettiTest();

    function runConfettiTest() {
      var confetti = Confetti.create({
        foo: 'bar'
      });

      expect(confetti.constructor.name).toEqual('ConfettiClass');
      expect(confetti.foo).toBe('bar');
      expect(confetti.d >= 10 && confetti.d < Confetti.DEFAULT_NUM + 10)
        .toBe(true);
      expect(confetti.color)
        .toMatch(/rgba\([0-9]+,\s[0-9]+,\s[0-9]+,\s0(.[0-9]+)?\)/);
      expect(confetti.isFlakeExiting).toEqual(jasmine.any(Function));
    }
  });

  it('should set a custom density and color on confetti', function () {
    var confetti = Confetti.create({
      d: 'foo',
      color: 'bar'
    });

    expect(confetti.d).toBe('foo');
    expect(confetti.color).toBe('bar');
  });

  describe('step', function () {
    var canvas,
      confetti,
      particles,
      config,
      step;

    beforeEach(function () {
      canvas = Confetti.createCanvas(parentElem, canvasElem);
      confetti = Confetti.create({
        x: Confetti.randomFrom(0, canvas.width),
        y: Confetti.randomFrom(0, canvas.height),
        r: Confetti.randomFrom(5, 30),
        tilt: Confetti.randomFrom(-10, 0),
        tiltAngle: 0,
        tiltAngleIncrement: Confetti.randomFrom(0.05, 0.12)
      });
      particles = [confetti, confetti];
      Confetti._animate = Confetti.animate;
      Confetti.animate = jasmine.createSpy('Confetti.animate');

      canvas.context.clearRect = jasmine.createSpy('canvas.context.clearRect');
      canvas.context.stroke = jasmine.createSpy('canvas.context.stroke');
      canvas.context.fill = jasmine.createSpy('canvas.context.fill');
      config = {
        angle: 0.01,
        tiltAngle: 0.1,
        draw: jasmine.createSpy('draw'),
        updatePosition: jasmine.createSpy('updatePosition'),
        updateState: jasmine.createSpy('updateState')
      };
      step = canvas.step(particles, config);
    });

    afterEach(function () {
      Confetti.animate = Confetti._animate;
      delete canvas.context.clearRect;
    });

    it('should call itself recursively and update', function () {
      step();

      expect(Confetti.animate).toHaveBeenCalled();
      expect(canvas.context.clearRect)
        .toHaveBeenCalledWith(0, 0, canvas.width, canvas.height);
      expect(config.draw).toHaveBeenCalledWith(confetti, 0);
      expect(config.updatePosition)
        .toHaveBeenCalledWith(confetti, 0);
      expect(config.draw.calls.count()).toBe(2);
      expect(config.updatePosition.calls.count()).toBe(2);
    });

    it('should not call itself recursively when halted', function () {
      canvas.halt = true;

      step();

      expect(Confetti.animate).not.toHaveBeenCalled();
      expect(canvas.context.clearRect).not.toHaveBeenCalled();
      expect(config.draw).not.toHaveBeenCalled();
      expect(config.updatePosition).not.toHaveBeenCalled();
    });

    it('should batch the calls to stroke', function () {
      config.batch = true;
      step = canvas.step(particles, config);

      step();

      expect(Confetti.animate).toHaveBeenCalled();
      expect(canvas.context.clearRect)
        .toHaveBeenCalledWith(0, 0, canvas.width, canvas.height);
      expect(config.draw).toHaveBeenCalledWith(confetti, 0);
      expect(config.updatePosition)
        .toHaveBeenCalledWith(confetti, 0);
      expect(config.draw.calls.count()).toBe(2);
      expect(config.updatePosition.calls.count()).toBe(2);
      expect(canvas.context.stroke.calls.count()).toBe(1);
    });

    it('should batch the calls to fill', function () {
      config.batch = true;
      config.fill = true;
      step = canvas.step(particles, config);

      step();

      expect(Confetti.animate).toHaveBeenCalled();
      expect(canvas.context.clearRect)
        .toHaveBeenCalledWith(0, 0, canvas.width, canvas.height);
      expect(config.draw).toHaveBeenCalledWith(confetti, 0);
      expect(config.updatePosition)
        .toHaveBeenCalledWith(confetti, 0);
      expect(canvas.context.fill.calls.count()).toBe(1);
    });

    it('should halt the animation if the parent element does not exist', function () {
      spyOn(canvas, 'destroy');
      parentElem.parentNode.removeChild(parentElem);

      canvas.setDimensions();

      expect(canvas.destroy).toHaveBeenCalled();
    });

    it('should halt the animation if the canvas element does not exist', function () {
      spyOn(canvas, 'destroy');
      parentElem.removeChild(canvasElem);

      canvas.setDimensions();

      expect(canvas.destroy).toHaveBeenCalled();
    });
  });
});
