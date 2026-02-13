let pg;

function setup() {
  createCanvas(800, 400);
  pg = createGraphics(800, 400);
  pg.background(255);
  pg.textSize(250);
  pg.textAlign(CENTER, CENTER);
  pg.fill(0);
  pg.text('NEW', width/2, height/2);
}

function draw() {
  background(255);
  let spacing = 15;
  
  for (let x = 0; x < width; x += spacing) {
    for (let y = 0; y < height; y += spacing) {
      let c = pg.get(x, y);
      let isText = brightness(c) < 50;
      let d = dist(mouseX, mouseY, x, y);
      
      push();
      translate(x, y);
      if (isText && d < 120) {
        stroke(255, 0, 100);
        strokeWeight(3);
        rotate(QUARTER_PI);
        line(-8, 0, 8, 0);
      } else {
        stroke(220);
        strokeWeight(1);
        point(0, 0);
      }
      pop();
    }
  }
}
