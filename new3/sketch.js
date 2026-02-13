let particles = [];

function setup() {
  pixelDensity(1);
  createCanvas(800, 400);
  let pg = createGraphics(800, 400);
  pg.pixelDensity(1);
  pg.background(255);
  pg.textSize(250);
  pg.textAlign(CENTER, CENTER);
  pg.text("NEW", width/2, height/2);

  for (let x = 0; x < width; x += 5) {
    for (let y = 0; y < height; y += 5) {
      if (pg.get(x, y)[0] < 128) {
        particles.push(new Particle(x, y));
      }
    }
  }
}

function draw() {
  background(255);
  for (let p of particles) {
    p.update();
    p.show();
  }
}

function mousePressed() {
  for (let p of particles) p.reset();
}

class Particle {
  constructor(x, y) {
    this.target = createVector(x, y);
    this.reset();
  }
  reset() {
    this.pos = createVector(this.target.x, this.target.y);
    this.size = 0;
  }
  update() {
    this.size = lerp(this.size, 6, 0.05);
  }
  show() {
    noStroke();
    fill(0, 150, 255, 150);
    ellipse(this.pos.x, this.pos.y, this.size);
  }
}