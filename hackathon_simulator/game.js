var STATES = {
  stopped: "STOPPED",
  running: "RUNNING",
  end: "END"
}

var state;

var App = function() {
  this.name = "foobar";
  this.progressBar = "";
};

Game = function() {
  this.hour = 1;
  this.app = new App();
  this.hackers = [];
  this.init = function(n) {
    state = STATES.running;
    const hackerArray = [];
    for (i = 0; i < n; ++i) {
      hackerArray.push(new Hacker(randomizeName()));
    }
    this.hackers = hackerArray;
    document.getElementById("buttonSpace").innerHTML = generateHTMLTable("buttonSpace", this.hackers.length);
    this.app.progressBar = new Bar(WIDTH / UNIT / 2, 2, 18, 1, 0, 200, "#006600", "#00FF00");
  }
  this.update = function() {
    this.hour++;
    this.hackers.forEach(function(h) {
      h.update();
    });
    //Generate the buttons for actions
    document.getElementById("buttonSpace").innerHTML = generateHTMLTable("buttonSpace", this.hackers.length);
    updateEventText();
  }
  this.draw = function() {
    if(state == STATES.running) {
      ctx.fillStyle = "#000000";
      ctx.font = UNIT + "px fantasy";
      ctx.fillText("(" + Math.round(this.app.progressBar.value * 100 /this.app.progressBar.maxValue) + "%) " + this.app.name, UNIT, UNIT * 1.2,  UNIT*10);
      ctx.font = UNIT*0.6 + "px fantasy";
      ctx.fillText("Hour " + this.hour + " of " + 36, UNIT * 16, UNIT * 3.1, UNIT * 10);

      //Draw the stats of each hacker;
      for (var i = 0; i < this.hackers.length; i++) {
        ctx.fillStyle = this.hackers[i].colour;
        ctx.font = UNIT * 0.7 + "px fantasy";
        ctx.fillText(this.hackers[i].name, UNIT, (UNIT * 4) + (UNIT * 3 * i), UNIT * 4);
        ctx.fillStyle = "black";
        ctx.font = UNIT * 0.5 + "px ariel";
        ctx.fillText("Tiredness: ", UNIT * 5, (UNIT * 4) + (UNIT * 3 * i) - UNIT * 0.6, UNIT * 4);
        ctx.fillText("Hunger: ", UNIT * 5, (UNIT * 4) + (UNIT * 3 * i), UNIT * 4);
        ctx.fillText("Enthusiasm: ", UNIT * 5, (UNIT * 4) + (UNIT * 3 * i) + UNIT * 0.6, UNIT * 4);
        var bar;
        bar = new Bar(11.5, 4 + (2.9 * i) - 0.74, 7.3, 0.3, this.hackers[i].tiredness, 10, "#990000", "#FF0000");
        bar.draw();
        bar = new Bar(11.5, 4 + (2.9 * i), 7.3, 0.3, this.hackers[i].hunger, 10, "#990000", "#FF0000");
        bar.draw();
        bar = new Bar(11.5, 4 + (2.9 * i) + 0.74, 7.3, 0.3, this.hackers[i].enthusiasm, 10, "#990000", "#FF0000");
        bar.draw();
      }

      this.app.progressBar.draw();

    } else if (state == STATES.stopped) {
      ctx.fillStyle = "#000000";
      ctx.font = UNIT*2.7 + "px fantasy";
      ctx.fillText("Welcome to the Hack the North simulator!", UNIT, UNIT * 8, UNIT*UNITS_PER_WINDOW-UNIT);
      ctx.font = UNIT + "px fantasy";
      ctx.fillText("Type in the name of your hack and get started!", UNIT, UNIT * 10, UNIT*UNITS_PER_WINDOW-UNIT);
    }
  }
};

function initializeHackers(n) {
  game.init(n);
  // this is supposed to edit App name
  game.app.name = document.getElementById('nameOfHack').value;
  document.getElementById('hackerInitialization').style.display = 'none';
  document.getElementById('nextButton').removeAttribute("hidden");
  updateEventText();
};

function clickedHacker(id, element, increment) {
    hacker = Game.hackers[id];
    hacker[element] = hacker[element] + increment;
    alert(hacker[element]);
};
