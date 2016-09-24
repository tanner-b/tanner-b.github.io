var iterations = 50;
var threshold = 10;

var position = new Vector2(0, 0);
var mouseVector = new Vector2(0 ,0);
var zoom = 1;

function Vector2(x, y) {
  this.x = x;
  this.y = y;
}

function setup() {
  createCanvas(150, 150);
  pixelDensity(1);
  zoom = createSlider(1, 20, 1, 0.1);
}

function draw() {
  loadPixels();
  
  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      /* 
        Complex numbers consist of 2 parts, a real and an imaginary
       
                 Z   =    A    +   B    *    i
               Number = (real) + (real) * (complex)
        
        These "a" and "b" values can be used to plot a complex
        number on a special plane where axis "b" is imanginary. 
      */
      
      //Map a and b to values between -2 and 2
      var a = map(x, 0, width, position.x - (2 / pow(zoom.value(), 3)), position.x + (2 / pow(zoom.value(), 3)));
      var b = map(y, 0, height, position.y - (2 / pow(zoom.value(), 3)), position.y + (2 / pow(zoom.value(), 3)));
      
      var originalA = a;
      var originalB = b;
      
      var i = 0;
      
      while (i < iterations) {
        // z = z * z + c
        var aa = a * a - b * b;
        var bb = 2 * a * b;
        
        a = originalA + aa;
        b = originalB + bb;
        
        if (abs(a + b) > threshold) {
          break;
        }
        
        i++;
      }
      
      var colour = map(i, 0, iterations, 0, 255);
      
      //Converting 2dim coordinates to linear 4 channel colour pixel index
      var index = (x + y * width) * 4; 
      
      pixels[index] = colour; //Red channel
      pixels[index + 1] = colour; //Green channel
      pixels[index + 2] = colour; //Blue channel
      pixels[index + 3] = 255; //Alpha channel
    } 
  }
  updatePixels();
}

function mousePressed() {
    mouseVector.x = map(mouseX, 0, width, -2 / pow(zoom.value(), 3), 2 / pow(zoom.value(), 3));
    mouseVector.y = map(mouseY, 0, height, -2 / pow(zoom.value(), 3), 2 / pow(zoom.value(), 3));
}

function mouseReleased() {
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    position.x += mouseVector.x - map(mouseX, 0, width, -2 / pow(zoom.value(), 3), 2 / pow(zoom.value(), 3));
    position.y += mouseVector.y - map(mouseY, 0, height, -2 / pow(zoom.value(), 3), 2 / pow(zoom.value(), 3));
    return true;
  } 
}
