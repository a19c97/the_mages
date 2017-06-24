// Main app JS code
checkSpeed();


function checkSpeed(){
    console.log("Running checkSpeed");
    var speedLimit = 80;
    gm.info.getVehicleData(getSpeedSuccess, ['average_speed']);

    function getSpeedSuccess(data) {
        console.log("Speed is " + data.average_speed);
        if (data.average_speed > 80) {
            speedingWarning(data.average_speed);
        }
    }
}
