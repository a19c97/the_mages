// Main app JS code

var DIVS = ['welcome', 'admin', 'guest'];

// Initial page settings
var currentPage = 'welcome';
initializeUI();

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
