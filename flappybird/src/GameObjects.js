Bird = function () {
  this.size = Math.round(UNIT * 0.75); //75% of a unit length
  this.pos = new Vector2(windowWidth/4, windowHeight/2);
  this.vel = new Vector2(0, 0);
  this.jumpForce = UNIT / 5.5;
  //this.collider = new Rect(this.pos.x, this.pos.y, this.size, this.size);
  //this.image = new Image();
  //this.image.src = "sprites/player.png";

  this.draw = function () {
    ctx.fillStyle = "#A5DF00";
    ctx.fillRect(this.pos.x - this.size/2, this.pos.y - this.size/2, this.size, this.size);
  }

  this.update = function(dt) {
    this.vel.y += gravity * dt;
    this.pos.add(this.vel);



    //Update collider
    //this.collider.x = this.pos.x;
    //this.collider.y = this.pos.y;
    //Check collisions on pipes.
    for(var i = 0; i <  pipes.length; i++) {
      if (Math.abs(this.pos.x - pipes[i].collider.x) < this.size / 2 + pipes[i].collider.width / 2) {
        if (Math.abs(this.pos.y - pipes[i].collider.y) > pipes[i].collider.height / 2 - this.size / 2) {
          game.end();
        }
      }
    }
  }

  this.jump = function() {
    this.vel = new Vector2(0, -this.jumpForce);
  }
}

Pipe = function() {
  //Use the negative space between the pipes as the "non-collidable area"
  this.width = UNIT * 2;
  this.height = UNIT * 3.5;
  this.speed = UNIT * 4.5;
  this.pos = new Vector2(windowWidth + this.width, getRandomInt(UNIT * 5, windowHeight - UNIT * 5));
  this.passed = false;
  this.collider = new Rect(this.pos.x, this.pos.y, this.width, this.height);

  this.update = function(dt) {
    //Move the pipe along
    this.pos.x -= this.speed * dt;

    //Update collider
    this.collider.x = this.pos.x;
    this.collider.y = this.pos.y;

    //If the pipe goes off the screen, remove it from the array
    if(this.pos.x < -this.width) {
      pipes.shift();
    }

    //Check to see if player has passed through
    if (!this.passed) {
      if (player.pos.x > this.pos.x) {
        this.passed = true;
        score++;
      }
    }
  }

  this.draw = function() {
    ctx.fillStyle = "#00c000";
    var pipe1Height = this.pos.y - this.height / 2;

    //Top half
    ctx.fillRect(this.pos.x - this.width/2, 0, this.width, pipe1Height); //Pipe
    ctx.fillRect(this.pos.x - (this.width/2) - (UNIT * 0.2), pipe1Height - UNIT / 2, this.width * 1.2, UNIT / 2); //End Bit

    //Bottom half
    ctx.fillRect(this.pos.x - this.width/2, this.pos.y + this.height / 2, this.width, windowHeight - pipe1Height - this.height);
    ctx.fillRect(this.pos.x - (this.width/2) - (UNIT * 0.2), this.pos.y + this.height / 2, this.width * 1.2, UNIT / 2); //End Bit
  }
}
