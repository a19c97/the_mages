// Main app JS code

var DIVS = ['welcome', 'admin', 'guest'];

// Initial page settings
var currentPage = 'welcome';
initializeUI();

checkSpeed();

function checkSpeed(){
    console.log("Running checkSpeed");
    var speedLimit = 80;
    //gm.info.getVehicleData(getSpeedSuccess, ['average_speed']);
    var id = gm.info.watchVehicleData(getSpeedSuccess, ['average_speed']);

    function getSpeedSuccess(data) {
        if (data.average_speed > speedLimit) {
            speedingWarning(data.average_speed);
        } else {
            resetWarning(data.average_speed);
        }
    }
}
