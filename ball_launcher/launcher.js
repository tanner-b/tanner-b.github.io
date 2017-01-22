var Launcher = function() {
  this.x = 15;
  this.y = 500;
  this.angle = 0;
  this.k = 0.1;
  this.width = 100; // 1 metre long
  this.height = 15; // 15cm high

  this.draw = function() {
    ctx.save();
    ctx.fillStyle = "#333333";
    ctx.translate(this.x, this.y);
    ctx.rotate(-this.angle);
    ctx.fillRect(0, -this.height/2, this.width, this.height);
    ctx.restore();
  }

  this.update = function() {
    this.angle = toRadians(document.getElementById("angleSlider").innerHTML);
    this.k = document.getElementById("kSlider").innerHTML;
  }

  this.fire = function() {
    var tip = new Vector2(this.x + this.width*Math.cos(this.angle),
                          this.y - this.width*Math.sin(this.angle));
    var speed = 4 * Math.sqrt(this.k / 0.057); //There are 4 elastics in our launcher
    balls.push(new Ball(tip, new Vector2(speed*Math.cos(this.angle), -speed*Math.sin(this.angle))));
  }
}
