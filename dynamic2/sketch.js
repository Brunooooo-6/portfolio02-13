let particles = [];
let pg;

function setup() {
  pixelDensity(1);
  createCanvas(800, 400);
  pg = createGraphics(800, 400);
  pg.pixelDensity(1);
  pg.background(255);
  pg.textSize(120);
  pg.textAlign(CENTER, CENTER);
  pg.text("DYNAMIC", width/2, height/2);

  for (let i = 0; i < 1200; i++) {
    particles.push(new Particle());
  }
  background(0);
}

function draw() {
  background(0, 20); // Create trailing effect
  for (let p of particles) {
    p.update();
    p.display();
  }
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.acc = createVector();
  }

  update() {
    let n = noise(this.pos.x * 0.01, this.pos.y * 0.01, frameCount * 0.01);
    let angle = map(n, 0, 1, 0, TWO_PI * 2);
    this.acc = p5.Vector.fromAngle(angle + map(mouseX, 0, width, -PI, PI));
    this.vel.add(this.acc);
    this.vel.limit(2);
    this.pos.add(this.vel);

    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }

  display() {
    // Check if particle is "inside" the text
    let isInside = pg.get(this.pos.x, this.pos.y)[0] < 128;
    stroke(isInside ? color(0, 255, 255) : 50);
    strokeWeight(isInside ? 3 : 1);
    point(this.pos.x, this.pos.y);
  }
}