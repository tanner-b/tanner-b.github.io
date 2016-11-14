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
var fov = 50; //Field of view;
var aspectRatio = W / H;
var angle = Math.tan(Math.PI * 0.5 * fov / 180.); //Calculates the viewing angle based on fov
var rotationAngle = Math.PI / 100; //Turn amount in radians
var requestAnimFrame =  window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.msRequestAnimationFrame;

//FUNCTIONS
function update(dt) {
  //Update scene here
}

function move(event) {
  //MOVEMENT CODE
  var rotationMatrix = new Mat3();
  var array;
  var transformation = new Vec3(0, 0, 0);
  var rotation = false;
  var movement = false;

  //Figure out which matrix to use
  if(event.keyCode == 87) {
    //w keypress
    transformation.z += .1;
    movement = true;
  }
  else if(event.keyCode == 83) {
    //s keypress
    transformation.z -= .1;
    movement = true;
  }
  else if(event.keyCode == 65) {
    //a keypress
    transformation.x += .1;
    movement = true;
  }
  else if(event.keyCode == 68) {
    //d keypress
    transformation.x -= .1;
    movement = true;
  }
  else if(event.keyCode == 39) {
    //right arrow keypress
    array = [[ Math.cos(rotationAngle), 0, Math.sin(rotationAngle)],
              [ 0, 1, 0],
              [ -Math.sin(rotationAngle), 0, Math.cos(rotationAngle)]]
    rotationMatrix.data = array;
    rotation = true;
  }
  else if(event.keyCode == 37) {
    //left arrow keypress
    array = [[ Math.cos(-rotationAngle), 0, Math.sin(-rotationAngle)],
              [ 0, 1, 0],
              [ -Math.sin(-rotationAngle), 0, Math.cos(-rotationAngle)]]
    rotationMatrix.data = array;
    rotation = true;
  }

  if (movement) {
    for (var o = 0; o < objects.length; o++) {
      objects[o].center.x += transformation.x;
      //element.center.y += transformation.y;
      objects[o].center.z += transformation.z;
    }
  }

  if (rotation) {
    //Apply rotation to all object points
    for (var o = 0; o < objects.length; o++) {
      objects[o].center.rotate(rotationMatrix);
    }
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
    if (d == -1) continue;
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
  objects.push(new Sphere(new Vec3(.5, 0, -7), 1, generateColour()));
  objects.push(new Sphere(new Vec3(1, 1, -9), 1.5, generateColour()));

  //In the event of keyboard input, call the move function
  document.addEventListener('keydown', function(event) {
    move(event);
  });

  main();
}

window.onload = function () {
    console.log("Page loaded and script running")
    init();
}
