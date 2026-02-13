let pg;
let scanY = 0;

function setup() {
  pixelDensity(1);
  createCanvas(800, 400);
  pg = createGraphics(800, 400);
  pg.pixelDensity(1);
  pg.background(0);
  pg.fill(255);
  pg.textSize(250);
  pg.textAlign(CENTER, CENTER);
  pg.text("NEW", width/2, height/2);
}

function draw() {
  background(0, 20); // Ghosting effect
  
  // Draw the "laser" line
  stroke(0, 255, 100);
  line(0, scanY, width, scanY);
  
  // Sample pixels only along the laser line
  for (let x = 0; x < width; x += 4) {
    if (pg.get(x, scanY)[0] > 128) {
      fill(0, 255, 100);
      noStroke();
      rect(x, scanY, 3, 3);
    }
  }
  
  scanY = (scanY + 2) % height;
  
  // Interaction: Mouse follows the scan
  if (mouseIsPressed) scanY = mouseY;
}