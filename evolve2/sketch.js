let particles = [];

function setup() {
  pixelDensity(1);
  createCanvas(800, 400);
  let pg = createGraphics(800, 400);
  pg.pixelDensity(1);
  pg.background(255);
  pg.textSize(150);
  pg.textAlign(CENTER, CENTER);
  pg.text("EVOLVE", width/2, height/2);

  for (let x = 0; x < width; x += 8) {
    for (let y = 0; y < height; y += 8) {
      if (pg.get(x, y)[0] < 128) {
        particles.push(new Organism(x, y));
      }
    }
  }
}

function draw() {
  background(20);
  for (let p of particles) {
    p.update();
    p.show();
  }
}

class Organism {
  constructor(x, y) {
    this.pos = createVector(random(width), random(height));
    this.target = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.col = color(100, 255, 150);
  }

  update() {
    let steer = p5.Vector.sub(this.target, this.pos);
    steer.setMag(0.2);
    this.acc.add(steer);
    this.vel.add(this.acc);
    this.vel.limit(3);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  show() {
    let s = 4 + sin(frameCount * 0.3) * 2;
    noStroke();
    fill(this.col);
    ellipse(this.pos.x, this.pos.y, s);
  }
}