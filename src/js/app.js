// Main app JS code

var currSettings = {};

var speed = gm.system.getSpeed();
var speedLimit = 80;
if (speed > speedLimit) {
    speedingWarning(speed);
}

