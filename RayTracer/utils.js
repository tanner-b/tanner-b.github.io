/* UTILITY OBJECTS */
//3 dimensional vector
var Vec3 = function(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
  this.self = this;
  this.angle = function(otherVector) {
    return Math.acos(this.dot(otherVector) / (this.dot(this) * otherVector.length));
  };
  this.dot = function(otherVector) {
    return (this.x * otherVector.x + this.y * otherVector.y + this.z * otherVector.z);
  };
  this.length = Math.sqrt(this.dot(this.self));
  this.normalize = function() {
    var mag = this.length;
    this.x /= mag;
    this.y /= mag;
    this.z /= mag;
  };
  this.cross = function(otherVector) {
    var vector = new Vec3((this.y * otherVector.z - this.z * otherVector.y),
                    (this.z * otherVector.x - this.x * otherVector.z),
                    (this.x * otherVector.y - this.y * otherVector.x));
    return vector;
  };
  //Using a Vec3 transformation Matrix
  this.rotate = function(matrix) {
    this.x = (this.x * matrix.data[0][0] + this.y * matrix.data[0][1] + this.z * matrix.data[0][2]);
    this.y = (this.x * matrix.data[1][0] + this.y * matrix.data[1][1] + this.z * matrix.data[1][2]);
    this.z = (this.x * matrix.data[2][0] + this.y * matrix.data[2][1] + this.z * matrix.data[2][2]);
  }
}

//A ray with a start and direction vector
var Ray = function(startVec3, dirVec3) {
  this.start = startVec3;
  this.dir = dirVec3;
}

var Sphere = function(center, radius, colour) {
  this.center = center;
  this.radius = radius;
  this.colour = colour;
  this.hits = function(ray) {
    var camToSphere = new Vec3((ray.start.x - this.center.x), (ray.start.y - this.center.y), (ray.start.z - this.center.z));
    //Calculate distance from center of sphere to closest point on ray. This will be changed later
    var d = ((ray.dir.cross(camToSphere)).length / ray.dir.length);
    //If the distance to ray is less than radius, the ray hit
    if (d <= this.radius) {
      //return the distance from the sphere to cam for depth calculations
      return camToSphere.length;
    }
    else {
      //return -1 if it doesnt hit
      return -1;
    }
  };
}

//A colour representing R, G, and B. No alpha support because its not needed at this time
var Colour3 = function(red, green, blue) {
  this.r = red;
  this.g = green;
  this.b = blue;
}

//defining a 3x3 dim matrix
var Mat3 = function(matrixArray) {
  this.data = matrixArray;
}

//defining a 4x4 dim matrix
var Mat4 = function(matrixArray) {
  this.data = matrixArray;
}

/* UTILITY FUNCTIONS */
//returns a Colour object with random values from 0 to 255
function generateColour() {
  return new Colour3(Math.floor(Math.random() * 156) + 100, Math.floor(Math.random() * 156) + 100, Math.floor(Math.random() * 156) + 100);
}
