//Matrix Rain Demo - 8/22/2016 - Tanner Bergeron

// GLOBALS
var wormSize = 22; // Width and height of pixels
var worms = []; // The Array of "rain droplets"
var chars = "@#$%&ABCDEFGHHIJKLMNOPQRSTUVWXYZ"; //Characters to be used

// OBJETCS
function Worm() { //I called it a worm because it made more sense in my head
  this.y = -wormSize;
  this.x = floor(random(0, window.innerWidth / wormSize)) * wormSize;
  this.self = this;
  
  // 1 in 20 chance to spawn as a "glitch" in the matrix
  if (random(0, 20) < 1) {
    this.colour = new Colour(255, 135, 17); // Orange 
  } else {
    this.colour = new Colour(0, 255, 0); // Green
  }
  
  // Update
  this.update = function() {
    //Move the worm down by its size in pixels
    this.y += wormSize; 
    
    // If the worm is totally off the bottom of the screen, remove it from the list
    if (this.y - wormSize > height) {
      var index = worms.indexOf(this);
      worms.splice(index, 1);
    }
  }
  
  // Draw
  this.draw = function() {
    fill(this.colour.r, this.colour.g, this.colour.b);
    // Choose a random character and save its index
    var index = random(0, chars.length - 1);
    // Save the letter based upon the index
    var letter = chars.substring(index, index + 1);
    // Draw the letter
    text(letter, this.x, this.y, wormSize, wormSize);
    //rect(this.x, this.y - wormSize * i, wormSize, wormSize);
    
  }
}
function Vector2(x, y) {
  this.x = x; this.y = y;
}  //2 dim vector util object
function Colour(r, g, b, a) {
  this.r = r;
  this.g = g;
  this.b = b;
  this.a = a;
}

// FUNCTIONS
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(25);
  textSize(wormSize);
}
function draw() {
  //Clear the background to black
  //clear(0, 0, 0, 0.2);
  background(0, 0, 0, 70);
  
  
  // spawn between 0 to 2 new worms each frame
  for (var i = 0; i < random(3); i++) {
      worms.push(new Worm()); 
  }
  
  // Update and draw all the worm droplets
  for (var i = 0; i < worms.length; i++) {
    worms[i].update();
    worms[i].draw();
  }
}