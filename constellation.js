let canvas: HTMLCanvasElement;

class Constellation {
  canvas;

  ctx;

  stars;

  settings;

  constructor(canvas, options) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.stars = [];
    this.settings = {
      star: {
        color: 'blue',
        width: 0.5,
        speed: 0.5
      },
      line: {
        color: 'red',
        width: 0.5,
        speed: 0.5
      },
      position: {
        x: 0,
        y: 0
      },
      width: canvas.width,
      height: canvas.height
    };
    Object.assign(this.settings, options);
    this.init();
  }

  init() {
    this.bind();
    this.createStars(20);
    this.createLines(20);
    this.loop();
  }

  bind() {
    this.resize = this.resize.bind(this);
    window.addEventListener('resize', this.resize);
  }

  resize() {
    this.settings.width = this.canvas.width = window.innerWidth;
    this.settings.height = this.canvas.height = window.innerHeight;
  }

  loop() {
    this.ctx.clearRect(0, 0, this.settings.width, this.settings.height);
    this.ctx.save();
    this.ctx.translate(this.settings.position.x, this.settings.position.y);
    this.stars.forEach(star => {
      this.ctx.fillStyle = star.color;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2, false);
      this.ctx.fill();
      star.x += star.vx;
      star.y += star.vy;
      if (star.x > this.settings.width + star.radius || star.x < 0 - star.radius) {
        star.x = Math.random() * this.settings.width;
      }
      if (star.y > this.
      settings.height + star.radius || star.y < 0 - star.radius) {
        star.y = Math.random() * this.settings.height;
      }
    });
    this.ctx.restore();
    requestAnimationFrame(this.loop.bind(this));
  }

  createStars(count) {
    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: Math.random() * this.settings.width,
        y: Math.random() * this.settings.height,
        radius: Math.random() * 1,
        vx: Math.random() * 0.5 - 0.25,
        vy: Math.random() * 0.5 - 0.25,
        color: this.settings.star.color
      });
    }
  }

  createLines(count) {
    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: Math.random() * this.settings.width,
        y: Math.random() * this.settings.height,
        radius: Math.random() * 1,
        vx: Math.random() * 0.5 - 0.25,
        vy: Math.random() * 0.5 - 0.25,
        color: this.settings.line.color
      });
    }
  }
};
