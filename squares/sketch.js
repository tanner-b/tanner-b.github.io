var color1 = random(0, 255);
var color2 = random(0, 255);
var color3 = random(0, 255);

function setup() {
  createCanvas(1920, 1080);
  noStroke();
}

function draw() {
  color1 = random(0, 255);
  color2 = random(0, 255);
  color3 = random(0, 255);
  fill(color1, color2, 0);
  rect(color1 * 3, color2 * 3, 30, 30);
}