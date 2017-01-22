//GLOBALS
var width = 1000, height = 600;
var c, ctx;
var lastTime, fps = 0, now, secondCounter = 0, deltaTime = 0;
var balls = [];
var launcher;
var groundHeight = 500;
var gravity = 9.8;
var highScoreTableHTML = "<tr><td>Launches</td></tr>";
// 1 metre = 100 pixels

var requestAnimFrame =  window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.msRequestAnimationFrame;



function update(dt) {
  //Update gravity
  gravity = document.getElementById("gravitySlider").innerHTML;

  balls.forEach(function(ball){
    ball.update(dt);
  })

  launcher.update();
}

function draw() {
  //Clear the screen
  ctx.fillStyle="#00FFFF";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle="#00CC00";
  ctx.fillRect(0, height - 100, width, 100);
  //draw a sun
  drawCirle(550, 50, 45, "#FFFF00", false);

  balls.forEach(function(ball){
    ball.draw();
  })

  launcher.draw();
}

function reset() {
  balls = [];
  document.getElementById("angleSlider").innerHTML = 45;
  document.getElementById("angleSlider").value = 45;

  document.getElementById("kSlider").innerHTML = 0.1;
  document.getElementById("kSlider").value = 0.1;
  console.log("reset");
}

function launch() {
  launcher.fire();
}

function main() {
  now = Date.now();
  deltaTime = (now - lastTime);
  secondCounter += deltaTime;
  fps++;
  if(secondCounter >= 1000) {
    document.getElementById("fps").innerHTML = "Fps: " + fps;
    secondCounter = 0;
    fps = 0;
  }

  //Update then draw
  update(deltaTime);
  draw();

  lastTime = now;
  requestAnimFrame(main);
}

function init() {
  c = document.getElementById("canvas");
  c.width = width;
  c.height = height;
  ctx = canvas.getContext("2d");

  //balls.push(new Ball(new Vector2(50, 50), new Vector2(0, 0), 5, new RGBColour(200, 200, 0)));
  launcher = new Launcher();

  lastTime = Date.now();
  main();
}

window.onload = function () {
    console.log("Page loaded and script running")
    init();
}
