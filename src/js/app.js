// Main app JS code

// Initial page
var currentPage = 'welcome';
var currentUser = {};
// Array of users
var users = [];
// location
var prevTime = 0;
// Learner mode
var learnerMode = false;

initializeUI();
checkLocation();
checkSpeed();

function checkSpeed(){
    console.log("Running checkSpeed");
    var speedLimit = 80;
    var id = gm.info.watchVehicleData(getSpeedSuccess, ['average_speed']);

    function getSpeedSuccess(data) {
        if (data.average_speed > (speedLimit + 20)) {
            speedingWarning(data.average_speed);
        } else if (data.average_speed < speedLimit) {
            resetWarning(data.average_speed);
        }
    }
}

function checkLocation(){
    var id = gm.info.watchPosition(processPosition, true);
    var thres = 10;

    function processPosition(position){
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        console.log("lat: " + lat + "lon: " + lon);

        var currTime = Date.now();

        if(currTime - prevTime > 10000){
            console.log("Wow we've moved a lot");
            prevTime = currTime;
            sendLocation(lon, lat);
        }
    }
}
