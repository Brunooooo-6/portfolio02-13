let vehicles = [];

function setup() {
  createCanvas(800, 400);
  let pg = createGraphics(width, height);
  pg.background(255);
  pg.textSize(150);
  pg.textAlign(CENTER, CENTER);
  pg.fill(0);
  pg.text("EVOLVE", width/2, height/2);

  for (let x = 0; x < width; x += 8) {
    for (let y = 0; y < height; y += 8) {
      if (brightness(pg.get(x, y)) < 50) {
        vehicles.push(new Vehicle(x, y));
      }
    }
  }
}

function draw() {
  background(20);
  for (let v of vehicles) {
    v.behaviors();
    v.update();
    v.show();
  }
}

class Vehicle {
  constructor(x, y) {
    this.pos = createVector(random(width), random(height));
    this.target = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.maxspeed = 5;
    this.maxforce = 0.3;
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
  }

  show() {
    stroke(150, 100, 255);
    strokeWeight(4);
    point(this.pos.x, this.pos.y);
  }

  arrive(target) {
    let desired = p5.Vector.sub(target, this.pos);
    let d = desired.mag();
    let speed = d < 100 ? map(d, 0, 100, 0, this.maxspeed) : this.maxspeed;
    desired.setMag(speed);
    return p5.Vector.sub(desired, this.vel).limit(this.maxforce);
  }

  flee(target) {
    let desired = p5.Vector.sub(target, this.pos);
    if (desired.mag() < 50) {
      desired.setMag(this.maxspeed);
      desired.mult(-1);
      return p5.Vector.sub(desired, this.vel).limit(this.maxforce * 2);
    }
    return createVector(0, 0);
  }
}