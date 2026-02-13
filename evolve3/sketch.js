let particles = [];
let evolved = false;

function setup() {
  // FIX 1: Use 1 instead of 10. High density causes crashes/lag.
  pixelDensity(1); 
  createCanvas(800, 400);
  
  // Setup the off-screen buffer
  let pg = createGraphics(800, 400);
  pg.pixelDensity(1);
  pg.background(255);
  pg.fill(0);
  pg.textSize(150);
  pg.textAlign(CENTER, CENTER);
  // Using a generic system font to ensure it loads immediately
  pg.textFont('sans-serif'); 
  pg.text("EVOLVE", width / 2, height / 2);

  // Scan the buffer for text pixels
  for (let x = 0; x < width; x += 6) {
    for (let y = 0; y < height; y += 6) {
      // Check if the pixel is black (text)
      if (pg.get(x, y)[0] < 128) {
        particles.push({
          home: createVector(x, y),
          pos: createVector(random(width), random(height)), // Start at random positions
          randomTarget: createVector(random(width), random(height))
        });
      }
    }
  }
}

function draw() {
  background(255);
  
  // Loop through particles and move them
  for (let p of particles) {
    // Determine where the particle should be going
    let target = evolved ? p.randomTarget : p.home;
    
    // Smooth movement toward the target
    p.pos.x = lerp(p.pos.x, target.x, 0.08);
    p.pos.y = lerp(p.pos.y, target.y, 0.08);
    
    // Change color based on state
    if (evolved) {
      stroke(255, 100, 0); // Orange when "evolved"
    } else {
      stroke(0);           // Black when forming the word
    }
    
    strokeWeight(3);
    point(p.pos.x, p.pos.y);
  }
}

// Press SPACE to toggle the evolution
function keyPressed() {
  if (key === ' ') {
    evolved = !evolved;
  }
}