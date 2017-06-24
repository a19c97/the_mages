// Main app JS code

// speed
var speed = gm.system.getSpeed();
var speedLimit = 80;
if (speed > speedLimit) {
    speedingWarning(speed);
}
