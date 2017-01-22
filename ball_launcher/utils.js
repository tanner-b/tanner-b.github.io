function Vector2(x, y) {
  this.x = x; this.y = y;

  this.dist = function(other) {
    return Math.sqrt((other.x - this.x) * (other.x - this.x) + (other.y - this.y) * (other.y - this.y));
  }
}

function drawCirle(centerX, centerY, radius, colour, outline) {
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.fillStyle = colour;
  ctx.fill();
  if (outline) {
    ctx.strokeStyle = "#000000";
    ctx.stroke();
  }

  ctx.closePath();
}

function showValue(newValue, name)
{
	document.getElementById(name).innerHTML=newValue;
}

//Just to make sure the entire webpage doesnt move when you drag your finge on it
function touchMoved() {
  // do some stuff
  return false;
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function addScore(score) {
  highScoreTableHTML += "<tr><td>" + score + "m</td></tr>";
  document.getElementById("scores").innerHTML = highScoreTableHTML;
}
