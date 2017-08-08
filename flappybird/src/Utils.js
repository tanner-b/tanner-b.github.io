// UTILITY "CLASS" //

//2 dim vector util object
Vector2 = function(x, y) {
  this.x = x; this.y = y;

  this.dist = function(other) {
    return Math.sqrt((other.x - this.x) * (other.x - this.x) + (other.y - this.y) * (other.y - this.y));
  };

  this.add = function(otherVector) {
    this.x += otherVector.x;
    this.y += otherVector.y;
  };

}

Rect = function(x, y, width, height) {
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
