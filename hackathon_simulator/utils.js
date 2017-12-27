function generateHTMLTable (divID, numPlayers) {
    var HTMLCode = "<table align =\"center\" border = \"0\" width =\"" + WIDTH + "\">";
    HTMLCode += "<tr>";

    //names
    for (var i = 0; i < numPlayers; i++) {
      HTMLCode += "<td align=\"center\" bgcolor = \"" + game.hackers[i].colour + "\">" + game.hackers[i].name + "</td>";
    }
    HTMLCode += "</tr><tr>";

    //code
    for (var i = 0; i < numPlayers; i++) {
      HTMLCode += "<td align=\"center\"><button type = \"submit\" onclick = 'game.hackers[" + i + "].code(); document.getElementById(\"" + divID + "\").innerHTML = generateHTMLTable(\"" + divID + "\", " + numPlayers + ");'";
      if (!game.hackers[i].needsAction) {
        HTMLCode += " disabled ";
      }
      HTMLCode += ">Code</button></td>";
    }
    HTMLCode += "</tr><tr>";

    //sleep
    for (var i = 0; i < numPlayers; i++) {
      HTMLCode += "<td align=\"center\"><button type = \"submit\" onclick = 'game.hackers[" + i + "].sleep(); document.getElementById(\"" + divID + "\").innerHTML = generateHTMLTable(\"" + divID + "\", " + numPlayers + ");'";
      if (!game.hackers[i].needsAction) {
        HTMLCode += " disabled ";
      }
      HTMLCode += ">Sleep</button></td>";
    }
    HTMLCode += "</tr><tr>";
    //eat
    for (var i = 0; i < numPlayers; i++) {
      HTMLCode += "<td align=\"center\"><button type = \"submit\" onclick = 'game.hackers[" + i + "].eat(); document.getElementById(\"" + divID + "\").innerHTML = generateHTMLTable(\"" + divID + "\", " + numPlayers + ");'";
      if (!game.hackers[i].needsAction) {
        HTMLCode += " disabled ";
      }
      HTMLCode += ">Eat</button></td>";
    }
    HTMLCode += "</tr><tr>";
    //go to event
    for (var i = 0; i < numPlayers; i++) {
      HTMLCode += "<td align=\"center\"><button type = \"submit\" onclick = 'game.hackers[" + i + "].goToEvent(); document.getElementById(\"" + divID + "\").innerHTML = generateHTMLTable(\"" + divID + "\", " + numPlayers + ");'";
      if (!game.hackers[i].needsAction) {
        HTMLCode += " disabled ";
      }
      HTMLCode += ">Go to event</button></td>";
    }

    HTMLCode += "</tr></table>";
    return HTMLCode;
}
var Rect = function(x, y, width, height) {
  this.x = x;  this.y = y;
  this.width = width;  this.height = height;

  this.collides = function(otherRect) {

    if (Math.abs(this.x - otherRect.x) < this.width) {

      if (Math.abs(this.y - otherRect.y) < this.height) {
        return true;
      } else {
        return false;
      }

    }

  };
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var Bar = function(x, y, width, height, currentValue, maxValue, bgColour, fgColour) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.value = currentValue;
  this.maxValue = maxValue;

  this.backgroundColour = bgColour;
  this.foregroundColour = fgColour;

  this.draw = function() {
    ctx.fillStyle = this.backgroundColour;
    ctx.fillRect((this.x - this.width/2) * UNIT, (this.y - this.height/2) * UNIT, this.width * UNIT, this.height * UNIT);
    ctx.fillStyle = this.foregroundColour;
    ctx.fillRect((this.x - this.width/2) * UNIT, (this.y - this.height/2) * UNIT, this.width * (this.value/this.maxValue) * UNIT, this.height * UNIT);
  }
}
