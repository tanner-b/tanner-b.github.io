// Game "Class" holds everything to do with the game itself //
/* VARIABLES */
var UNIT = Math.round(windowWidth / 9); //In game unit independent of canvas resolution
var player;
var gravity;
var pipes;
var pipeTimer;
var score;
var state;
var states = {
  RUNNING   : "running",
  STOPPED   : "stopped",
  OVER      : "over"
};

Game = function() {
  this.init = function() {
    state = states.STOPPED;
    player = new Bird();
    gravity = (UNIT / 2);
    pipes = [];
    pipesPerSecond = 0.75;
    pipeFrequency = 1/pipesPerSecond;
    pipeTimer = 0;
    score = 0;
    pipes.push(new Pipe());
  }

  this.update = function(dt) {
    if (state == states.OVER) {
      return;
    }

    if (state == states.RUNNING) {
      pipeTimer += dt;
      if (pipeTimer > pipeFrequency) {
        pipeTimer = 0;
        pipes.push(new Pipe());
      }
    }

    player.update(dt);

    pipes.forEach(function(p) {
      p.update(dt);
    });

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
    if (state == states.STOPPED) {
      ctx.font = (UNIT * 0.8) + "px Georgia";
      ctx.fillText("Tap/Click to Play!", UNIT * 1.2, UNIT * 3);
    } else if (state == states.RUNNING) {
      ctx.font = (UNIT) + "px Georgia";
      ctx.fillText("Score: " + score, UNIT * 0.3, UNIT);
    } else if (state == states.OVER) {
      ctx.font = (UNIT) + "px Georgia";
      ctx.fillText("Score: " + score, UNIT * 2.5, UNIT * 6);
      ctx.font = (UNIT / 1.5) + "px Georgia";
      ctx.fillText("Click/Tap to try again!", UNIT, UNIT * 7);
    }
  }

  this.reset = function() {
    game = new Game();
    game.init();
  }

  this.end = function() {
    state = states.OVER;
    player.pos = new Vector2(-UNIT, -UNIT);
    pipes = [];
  }
}

function proccessKeyPress() {
  if (state == states.OVER) game.reset();
  if (state == states.STOPPED) state = states.RUNNING;
  if (state == states.RUNNING) {
      player.jump();
  }
}
