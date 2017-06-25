// Main app JS code

// Initial page
var currentPage = 'welcome';
// Array of users
var users = [];

initializeUI();

checkSpeed();

function checkSpeed(){
    console.log("Running checkSpeed");
    var speedLimit = 80;
    //gm.info.getVehicleData(getSpeedSuccess, ['average_speed']);
    var id = gm.info.watchVehicleData(getSpeedSuccess, ['average_speed']);

    function getSpeedSuccess(data) {
        if (data.average_speed > (speedLimit + 20)) {
            speedingWarning(data.average_speed);
        } else if (data.average_speed < speedLimit) {
            resetWarning(data.average_speed);
        }
    }
}
