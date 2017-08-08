var c; //Canvas variable
var ctx; //Canvas draw context
var lastTime; //Time of last frame
var secondCounter = 0; //Counts milliseconds, used for fps counter
var deltaTime = 0; //Stores the difference in time
var fps = 0;
var scale = 1; //Scale the canvas size just to make the screen bigger without actually using more pixels
var aspectRatio = 16/9;
var windowHeight = Math.round(( window.innerHeight ||
                                document.documentElement.clientHeight ||
                                document.body.clientHeight) * scale);
var windowWidth = Math.round(windowHeight / aspectRatio); //Canvas dimensions
var requestAnimFrame =  window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.msRequestAnimationFrame;

var game;
var running = false;


function main() {
  var now = Date.now();

  //Calculate fps
  deltaTime = (now - lastTime);
  secondCounter += deltaTime;
  fps++;
  if(secondCounter >= 1000) {
    //console.log("Fps: " + fps);
    secondCounter = 0;
    fps = 0;
    if (running) {
      pipeTimer++;
    }
  }

  //Update then draw
  if (running) {
    game.update(deltaTime / 1000);
  }
  game.draw();

  lastTime = now;
  requestAnimFrame(main);
}

function init() {
  c = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  //Set canvas dimestions to specified width and height
  c.width = windowWidth;
  c.height = windowHeight;

  console.log(windowWidth + " " + windowHeight);
  document.addEventListener('keydown', function() {
    proccessKeyPress();
  });
  document.addEventListener('click', function() {
    proccessKeyPress();
  });
  document.addEventListener('touchstart', function() {
    proccessKeyPress();
  });

  game = new Game();
  game.init();

  //Create an image buffer to draw pixel data
  lastTime = Date.now();
  main();
}

window.onload = function () {
    console.log("Page loaded and script running")
    init();
}
