var Ball = function(pos, vel) {
  this.pos = new Vector2(pos.x, pos.y);
  this.vel = new Vector2(vel.x, vel.y);
  this.colour = "#33FF33";
  this.radius = 5;
  this.bounceCoefficient = 0.8;
  this.flying = true;

  this.draw = function() {
    drawCirle(this.pos.x, this.pos.y, this.radius, this.colour, true);
  }

  this.update = function(dt) {
      this.vel.y += gravity / 60;
      this.pos.y += this.vel.y;
      this.pos.x += this.vel.x;

      if (this.pos.y > groundHeight) {
        if(this.flying) {
          //Update highscore
          addScore(Math.round((this.pos.x / 100) * 100) / 100);
          this.flying = false;
        }
        this.pos.y = groundHeight;
        this.vel.y *= -this.bounceCoefficient;
      }

  }
}
