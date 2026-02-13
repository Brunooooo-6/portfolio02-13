let points = [];

function setup() {
  pixelDensity(1);
  createCanvas(800, 400);
  let pg = createGraphics(800, 400);
  pg.pixelDensity(1);
  pg.background(255);
  pg.textSize(120);
  pg.textAlign(CENTER, CENTER);
  pg.text("DYNAMIC", width/2, height/2);

  for (let x = 0; x < width; x += 7) {
    for (let y = 0; y < height; y += 7) {
      if (pg.get(x, y)[0] < 128) {
        points.push(new Mover(x, y));
      }
    }
  }
}

function draw() {
  background(20);
  for (let p of points) {
    p.behaviors();
    p.update();
    p.show();
  }
}

class Mover {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.target = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
  }

  behaviors() {
    let arrive = this.arrive(this.target);
    let mouse = createVector(mouseX, mouseY);
    let flee = this.flee(mouse);
    this.acc.add(arrive);
    this.acc.add(flee);
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
    this.vel.mult(0.95); // Friction
  }

  show() {
    stroke(255, 200, 0);
    strokeWeight(4);
    point(this.pos.x, this.pos.y);
  }

  arrive(t) {
    let desired = p5.Vector.sub(t, this.pos);
    let d = desired.mag();
    let speed = map(d, 0, 100, 0, 5, true);
    desired.setMag(speed);
    return p5.Vector.sub(desired, this.vel);
  }

  flee(t) {
    let desired = p5.Vector.sub(t, this.pos);
    if (desired.mag() < 60) {
      desired.setMag(10);
      desired.mult(-1);
      return p5.Vector.sub(desired, this.vel);
    }
    return createVector(0, 0);
  }
}