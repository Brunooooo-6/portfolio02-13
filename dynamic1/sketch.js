let particles = [];

function setup() {
  createCanvas(800, 400);
  
  // Create an invisible buffer to draw the word
  let pg = createGraphics(width, height);
  pg.background(255);
  pg.textSize(120);
  pg.textAlign(CENTER, CENTER);
  pg.fill(0);
  pg.text("DYNAMIC", width/2, height/2);
  
  // Scan the buffer for black pixels to create particles
  for (let x = 0; x < width; x += 6) {
    for (let y = 0; y < height; y += 6) {
      let c = pg.get(x, y);
      if (brightness(c) < 50) {
        particles.push(new Particle(x, y));
      }
    }
  }
}

function draw() {
  background(0, 50);
  let intensity = map(mouseX, 0, width, 0, 15);
  
  for (let p of particles) {
    let x = p.homeX + random(-intensity, intensity);
    let y = p.homeY + random(-intensity, intensity);
    stroke(0, 255, 200);
    point(x, y);
  }
}

class Particle {
  constructor(x, y) {
    this.homeX = x;
    this.homeY = y;
  }
}