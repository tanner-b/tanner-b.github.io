var c; //Canvas variable
var ctx; //Canvas draw context
var lastTime; //Time of last frame
var milliSecondCounter = 0; //Counts milliseconds, used for fps counter
var deltaTime = 0; //Stores the difference in time
var fps = 0; //Counts fps every update step
var requestAnimFrame =  window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.msRequestAnimationFrame;

var game;

function update() {
  game.update();
  updateEventText();
}

function draw() {
  //Clear the screen
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  ctx.font = UNIT + "px fantasy";
  game.draw();
  //Draw other things
  //ctx.fillStyle = "#000000";
  //ctx.fillRect(shapeX, shapeY, UNIT, UNIT);

}

function main() {
  var now = Date.now();

  //Calculate fps
  deltaTime = (now - lastTime);
  milliSecondCounter += deltaTime;
  fps++;
  if(milliSecondCounter >= 1000) {
    console.log("Fps: " + fps);
    milliSecondCounter = 0;
    fps = 0;
  }

  //Update then draw
  //update(deltaTime / 1000); //Pass seconds, not milliseconds  eg. (100ms -> 0.1s)
  draw();

  lastTime = now;
  requestAnimFrame(main);
}

function init() {
  c = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  //Set canvas dimestions to specified width and height
  c.width = WIDTH;
  c.height = HEIGHT;

  game = new Game();
  state = STATES.stopped;

  //Create an image buffer to draw pixel data
  lastTime = Date.now();
  main();
}

window.onload = function () {
    console.log("Page loaded and script running")
    init();
}
