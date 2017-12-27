var Hacker = function(name) {
  this.name = name;
  this.colour = "#"+ getRandomInt(6, 9).toString() + getRandomInt(6, 9).toString() + getRandomInt(6, 9).toString() + getRandomInt(6, 9).toString() + getRandomInt(6, 9).toString() + getRandomInt(6, 9).toString();
  this.tiredness = getRandomInt(0, 4);
  this.enthusiasm = getRandomInt(3, 5);
  this.hunger = getRandomInt(0,7);
  this.needsAction = true;
  this.update = function() {
    this.needsAction = true;
    this.tiredness++;
    this.hunger++;
    this.enthusiasm--;
    if (this.hunger > 5 || this.tiredness > 5) {
      this.enthusiasm--;
    }
    if (this.enthusiasm < 1) {
      this.enthusiasm = 1;
    }
  }

  this.sleep = function() {
    //sleep
    this.tiredness = 0;
    this.needsAction = false;
  };
  this.code = function() {
    //code
    //Further the progress of your app based on your enthusiasm
    //anythuing
    game.app.progressBar.value += this.enthusiasm;
    this.tiredness++;
    this.needsAction = false;

  };
  this.goToEvent = function() {
    //Go to event
    this.enthusiasm += 5;
    this.needsAction = false;
  };
  this.eat = function() {
    //eat
    this.hunger = 0;
    this.needsAction = false;
  };

}
