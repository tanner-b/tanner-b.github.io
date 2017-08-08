// Game "Class" holds everything to do with the game itself //
/* VARIABLES */
var UNIT = Math.round(windowWidth / 9); //In game unit independent of canvas resolution
var player;
var gravity;
var pipes;
var pipeTimer;
var score;

Game = function() {
  this.init = function() {
    running = false;
    player = new Bird();
    gravity = (UNIT / 3);
    pipes = [];
    pipeTimer = -1;
    score = 0;
    pipes.push(new Pipe());
  }
  this.update = function(dt) {
    player.update(dt);
    pipes.forEach(function(p) {
      p.update(dt);
    });

    if (pipeTimer > 1) {
      pipes.push(new Pipe());
      pipeTimer = 0;
    }

  }
  this.draw = function() {
    //Clear background to sky blue
    ctx.fillStyle = "#a0ffff";
    ctx.fillRect(0, 0, c.width, c.height);

    //Draw Pipes
    pipes.forEach(function(p) {
      p.draw();
    });

    //Draw Player
    player.draw();

    //Text rendering
    ctx.fillStyle = "#000000";
    if (!running) {
      ctx.font= (UNIT * 0.8) + "px Georgia";
      ctx.fillText("Tap/Click to Play!", UNIT * 1.2, UNIT * 3);
    } else {
      ctx.font= (UNIT) + "px Georgia";
      ctx.fillText("Score: " + score, UNIT * 0.3, UNIT);
    }
  }

  this.reset = function() {
    game = new Game();
    game.init();
  }
}

function proccessKeyPress() {
  if (!running) running = true;
  player.jump();
}
