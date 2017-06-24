// Main app JS code

// speed

var speedLimit = 80;
gm.info.getVehicleData(getSpeedSuccess, ['average_speed']);

function getSpeedSuccess(data) {
    console.log("Speed is " + data.average_speed);
    if (data.average_speed > speedLimit) {
        speedingWarning(data.average_speed);
    }
}
