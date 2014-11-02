var canvas = Confetti.createCanvas(
  document.querySelector('div'),
  document.querySelector('canvas')
);

var particles = _.range(0, Confetti.DEFAULT_NUM).map(function () {
  return Confetti.create({
    x: Confetti.randomFrom(0, canvas.width),
    y: Confetti.randomFrom(0, canvas.height),
    r: Confetti.randomFrom(5, 30),
    tilt: Confetti.randomFrom(-10, 0),
    tiltAngle: 0,
    tiltAngleIncrement: Confetti.randomFrom(0.05, 0.12, true)
  });
});

canvas.step(particles, {
  angle: 0.01,
  tiltAngle: 0.1,
  draw: draw,
  updatePosition: updatePosition,
  updateState: updateState
})();

function draw(confetti) {
  canvas.context.beginPath();
  canvas.context.lineWidth = confetti.r / 2;
  canvas.context.strokeStyle = confetti.color;
  canvas.context.moveTo(confetti.x + confetti.tilt + (confetti.r / 4),
    confetti.y);
  canvas.context.lineTo(confetti.x + confetti.tilt, confetti.y +
    confetti.tilt + (confetti.r / 4));
  canvas.context.stroke();
}

function updatePosition(confetti, idx, config) {
  confetti.tiltAngle += confetti.tiltAngleIncrement;
  confetti.y += (Math.cos(config.angle + confetti.d) + 1 + confetti.r / 2) / 2;
  confetti.x += Math.sin(config.angle);
  confetti.tilt = 15 * Math.sin(confetti.tiltAngle - idx / 3);

  if (confetti.isFlakeExiting(canvas)) {
    if (idx % 5 > 0 || idx % 2 === 0) {
      confetti.x = Confetti.randomFrom(0, canvas.width);
      confetti.y = -10;
      confetti.tilt = Confetti.randomFrom(-10, 0);

    } else {
      if (Math.sin(config.angle) > 0) {
        confetti.x = -5;
        confetti.y = Confetti.randomFrom(0, canvas.height);
        confetti.tilt = Confetti.randomFrom(-10, 0);
      } else {
        confetti.x = canvas.width + 5;
        confetti.y = Confetti.randomFrom(0, canvas.height);
        confetti.tilt = Confetti.randomFrom(-10, 0);
      }
    }
  }
}

function updateState() {
  this.angle += 0.01;
  this.tiltAngle += 0.1;
}
