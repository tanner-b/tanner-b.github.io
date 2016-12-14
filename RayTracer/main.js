var c; //Canvas variable
var ctx; //Canvas draw context
var lastTime; //Time of last frame
var secondCounter = 0; //Counts milliseconds, used for fps counter
var deltaTime = 0; //Stores the difference in time
var fps = 0; //Fps counter
var objects = []; //All the objects in the scene
var W = 120, H = 90; //Canvas dimensions
var scale = 6; //Scale the canvas size just to make the screen bigger without actually using more pixels
var invWidth = 1 / W; invHeight = 1 / H; //Break up a 1x1 unit geometric buffer into pixels
var fov = 60; //Field of view;
var aspectRatio = W / H;
var moveSpeed = 0.1;
var keys = [false, false, false, false, false, false]; //w, a, s, d, L-arrow, R-arrow
var angle = Math.tan(Math.PI * 0.5 * fov / 180.); //Calculates the viewing angle based on fov
var rotationAngle = Math.PI / 50; //Turn amount in radians
var rotationMatrix = new Mat3();
var transformation = new Vec3(0, 0, 0);
var requestAnimFrame =  window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.msRequestAnimationFrame;

//FUNCTIONS
function update(dt) {
  //Update scene here
  rotationMatrix.data = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]; //null the transform
  transformation.zero(); //reset the vector to zeeeero
  var rotation = false;
  var movement = false;

  if(keys[0]) { //Forward
    transformation.add(new Vec3(0, 0, moveSpeed));
    movement = true;
  }
  if(keys[1]) { //Strafe left
    transformation.add(new Vec3(moveSpeed, 0, 0));
    movement = true;
  }
  if(keys[2]) { //Backwards
    transformation.add(new Vec3(0, 0, -moveSpeed));
    movement = true;
  }
  if(keys[3]) { //Strafe right
    transformation.add(new Vec3(-moveSpeed, 0, 0));
    movement = true;
  }
  if(keys[5]) {
    //right arrow keypress
    rotationMatrix.data = [[ Math.cos(rotationAngle), 0, Math.sin(rotationAngle)],
              [ 0, 1, 0],
              [ -Math.sin(rotationAngle), 0, Math.cos(rotationAngle)]];
    rotation = true;
  }
  if(keys[4]) {
    //left arrow keypress
    rotationMatrix.data = [[ Math.cos(-rotationAngle), 0, Math.sin(-rotationAngle)],
              [ 0, 1, 0],
              [ -Math.sin(-rotationAngle), 0, Math.cos(-rotationAngle)]];
    rotation = true;
  }

  if (movement) {
    for (var o = 0; o < objects.length; o++) {
      objects[o].center.add(transformation);
    }
  }

  if (rotation) {
    //Apply rotation to all object points
    for (var o = 0; o < objects.length; o++) {
      objects[o].center.rotate(rotationMatrix);
    }
  }
}

function proccessKeyPress(event) {
  //Figure out which matrix to use
  if(event.keyCode == 87) {
    //w keypress
    keys[0] = true;
  }
  else if(event.keyCode == 83) {
    //s keypress
    keys[2] = true;
  }
  else if(event.keyCode == 65) {
    //a keypress
    keys[1] = true;
  }
  else if(event.keyCode == 68) {
    //d keypress
    keys[3] = true;
  }
  else if(event.keyCode == 39) {
    //right arrow keypress
    keys[5] = true;
  }
  else if(event.keyCode == 37) {
    //left arrow keypress
    keys[4] = true;
  }
}

function proccessKeyRelease(event) {
  if(event.keyCode == 87) {
    //w unprees
    keys[0] = false;
  }
  else if(event.keyCode == 83) {
    //s unprees
    keys[2] = false;
  }
  else if(event.keyCode == 65) {
    //a unprees
    keys[1] = false;
  }
  else if(event.keyCode == 68) {
    //d unprees
    keys[3] = false;
  }
  else if(event.keyCode == 39) {
    //right arrow unprees
    keys[5] = false;
  }
  else if(event.keyCode == 37) {
    //left arrow unprees
    keys[4] = false;
  }
}

function draw() {
  /* Trace a ray through each pixel and calulate colour the value of the
  object the ray hits and set the pixel to that colour. There is no
  lighting right now so colours are matte until I learn otherwise */
  for (j = 0; j < H; j++) {
    for (i = 0; i < W; i++) {
      //Calculating the vector to each pixel came from an algorithm I found online
      var xx = (2 * ((i + 0.5) * invWidth) - 1) * angle * aspectRatio;
      var yy = (1 - 2 * ((j + 0.5) * invHeight)) * angle;
      var rayDir = new Vec3(xx, yy, -1);
      setPixel(imageData, i, j, trace(objects, new Ray(new Vec3(0, 0, 0), rayDir)));
    }
  }

  //draw the buffer to the screen
  ctx.putImageData(imageData, 0, 0);
  ctx.drawImage( c, 0, 0, scale * c.width, scale * c.height );
}

function main() {
  var now = Date.now();

  //Calculate fps
  deltaTime = (now - lastTime);
  secondCounter += deltaTime;
  fps++;
  if(secondCounter >= 1000) {
    document.getElementById("fps").innerHTML = "Fps: " + fps;
    secondCounter = 0;
    fps = 0;
  }

  //Update then draw
  update(deltaTime);
  draw();

  lastTime = now;
  requestAnimFrame(main);
}

function trace(objects, ray) {
  /* This function traces rays through the scene and
  returns a colour value for that pixel */
  var distance = Infinity;
  var index = -1; //If no objects are hit, return the backgroud colour

  /* For each object, see if ray intersects, if it
  does, check if the distance to camera is shorter than
  shortest object, then take the colour value of the
  closest object and set it to the pixel colour */
  for (var o = 0; o < objects.length; o++) {
    var d = objects[o].hits(ray);
    if (d == -1 || objects[o].center.z > 0) continue;
    if (d < distance) {
      distance = d;
      index = o;
    }
  }
  if (index == -1) {
    //No object was hit, return background colour
    return new Colour3(32, 32, 32);
  }
  else {
    //Return colour of hit object
    return objects[index].colour;
  }
}

function setPixel(imageData, x, y, colour3) {
    index = (x + y * imageData.width) * 4;
    imageData.data[index+0] = colour3.r;
    imageData.data[index+1] = colour3.g;
    imageData.data[index+2] = colour3.b;
    imageData.data[index+3] = 255;
}

function init() {
  c = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  //Set canvas dimestions to specified width and height
  c.width = W * scale;
  c.height = H * scale;

  img = new Image();

  //Create an image buffer to draw pixel data
  imageData = ctx.createImageData(W, H);
  lastTime = Date.now();

  //Create some things in the scene
  //position, radius, colour
  objects.push(new Sphere(new Vec3(-1, 0, -6), 1, generateColour()));
  objects.push(new Sphere(new Vec3(4, 0, -5), 1, generateColour()));
  objects.push(new Sphere(new Vec3(1, 1, -9), 1.5, generateColour()));

  //In the event of keyboard input, update the keys array
  document.addEventListener('keydown', function(event) {
    proccessKeyPress(event);
  });
  //Do the same but for key up, not keyDown
  document.addEventListener('keyup', function(event) {
    proccessKeyRelease(event);
  });

  main();
}

window.onload = function () {
    console.log("Page loaded and script running")
    init();
}
