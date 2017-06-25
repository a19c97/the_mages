// App JS functions

// User functions

function createUser() {
    var form = document.getElementById('createForm');
    var name = form.elements['name'].value;
    var address = form.elements['address'].value;
    var phone = form.elements['phone'].value;
    if (!address || !phone) {
        return;
    }
    users.push({
        name: name,
        address: address,
        phone: phone,
        accessibility: false,
        learner: false,
        locationMonitoring: false,
        preferences: {},
        speedWarning: false
    });

    form.elements['name'].value = '';
    form.elements['address'].value = '';
    form.elements['phone'].value = '';

    var newDiv = document.createElement('div');

    var newIcon = document.createElement('img');
    newIcon.src = "images/" + USER_PIC_URLS[users.length % USER_PIC_URLS.length];
    newIcon.alt = name;
    newIcon.classList.add("user");
    newIcon.onclick = function() {
        changePageFocus('tabs', name);
        document.getElementById("defaultOpen").click();
    };

    var newTitle = document.createElement('p');
    newTitle.innerHTML = name;

    newDiv.appendChild(newIcon);
    newDiv.appendChild(newTitle);
    newDiv.classList.add("user");

    var parent = document.getElementById('users');
    parent.appendChild(newDiv);

    var settingsForm = document.getElementById('settingsForm');
    settingsForm.elements['accessibility'].checked = false;
    settingsForm.elements['learner'].checked = false;
    settingsForm.elements['locationMonitoring'].checked = false;
    settingsForm.elements['speedWarning'].checked = false;

    // Set info text
    document.getElementById('userInfo').innerHTML = name + ' - ' + phone + ' - ' + address;

    changePageFocus('welcome', null);
    console.log(users);
}

// Settings

/**
 * Loads settings of currently selected user.
 */
function loadSettings() {
    var currentUser = users[currentUserIndex];
    console.log(currentUser);

    // UI updates

    var settingsForm = document.getElementById('settingsForm');
    settingsForm.elements['accessibility'].checked = currentUser.accessibility;
    settingsForm.elements['learner'].checked = currentUser.learner;
    settingsForm.elements['locationMonitoring'].checked = currentUser.locationMonitoring;
    settingsForm.elements['speedWarning'].checked = currentUser.speedWarning;

    // Update info text
    document.getElementById('userInfo').innerHTML = currentUser.name + ' - ' + currentUser.phone + ' - ' + currentUser.address;

    // Update actual settings
    runSettings();
}

// Speeding
var strike = 0;
var speedingLock = false;
var textingLock = false;
var ttsId = 0;

function mapUpdate(button) {
	gm.info.getCurrentPosition(setCoords, true);
	function setCoords(data) {
		loc = {lat: data.coords.latitude,
			lng: data.coords.longitude
		}
		mapPan(loc);
		createMarker(loc);
	}
	openTab('Map', button, 'rgb(77, 158, 19)');
	google.maps.event.trigger(map, 'resize');
}

var marker = null;

function createMarker(place) {
	if (marker != null) {
		marker.setMap(null);
	}
	marker = new google.maps.Marker({
		map: map,
		position: place
	});
}
/* Speeding warning */
function speedingWarning(speed) {
    // delay
    if (speedingLock) return;
    speedingLock = true;
    setTimeout(function() {
        speedingLock = false;
    }, 3000);

    strike += 1;
    console.log("Current speed: " + speed + " Strike: " + strike);

    switch (strike) {
        case 1:
            say("You are going too fast! I'm scared!!!");
            break;
        case 2:
            say("Slow down or I'll text mom.");
            break;
        case 3:
            say("I'm not kidding.");
            break;
        case 4:
            say("That's it - I'm texting mom.");
            if (textingLock) return;
            textingLock = true;
            setTimeout(function() {
                textingLock = false;
            }, 6000);
            sendSpeedingText(speed);
            console.log("Texting mom");
            strike = 0;
            break;
    }
}

function resetWarning(speed) {
    if (strike != 0) {
        strike = 0;
        say("That's much better.");
    }
}

/* Helper function for tts */
function say(text) {
    // gm.voice.stopTTS(ttsId);
    ttsId = gm.voice.startTTS(function() {}, text);
    console.log("TTS: " + ttsId + " " + typeof ttsId);
}


/* Send speeding data to mom */
function sendSpeedingText(speed) {
    console.log("Sending speeding text");
    var username = "Andrey";

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://32891a36.ngrok.io", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send("speed=" + speed + "&" + "user=" + username + "&" + "From=" + "GM Car");
}

// Location data
/* Send location data */
function sendLocation(lon, lat) {
    console.log("Location has changed!");
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://32891a36.ngrok.io", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send("lon=" + lon + "&" + "lat=" + lat);
}

// My Maps

function myMap() {
    var mapOptions = {
        center: new google.maps.LatLng(51.5, -0.12),
        zoom: 10
    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

var speedId = 0;

function checkSpeed(){
    console.log("Running checkSpeed");
    var speedLimit = 80;
    speedId = gm.info.watchVehicleData(getSpeedSuccess, ['average_speed']);

    function getSpeedSuccess(data) {
        if (data.average_speed > (speedLimit + 20)) {
            speedingWarning(data.average_speed);
        } else if (data.average_speed < speedLimit) {
            resetWarning(data.average_speed);
        }
    }
}

function stopSpeed() {
    if (speedId != 0){
        gm.info.clearVehicleData(speedId);
        speedId = 0;
    }
}

var locationId = 0;

function checkLocation(){

    locationId = gm.info.watchPosition(processPosition, true);
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

function stopLocation() {
    if (locationId != 0){
        gm.info.clearVehicleData(locationId);
        locationId = 0;
    }
}

// Learner stuff

/* Blinker */
var prev_yaw_rate = 0;
var yaw_rate = 0;
var yawId = 0;

function blinkerReminder() {

    var turn_signal_left = 0x00;
    var turn_signal_right = 0x00;

    yawId = gm.info.watchVehicleData(getYawSuccessful, ['yaw_rate']);

    function getYawSuccessful(data) {
        yaw_rate = data.yaw_rate;
        if (Math.abs(yaw_rate - prev_yaw_rate) > 15){
            console.log("You're turning a lot!");
            prev_yaw_rate = yaw_rate;
            checkBlinkers();
        }
    }

    function checkBlinkers() {
        gm.info.getVehicleData(getBlinkerSuccessful,
            ['turn_signal_right', 'turn_signal_left']);

        function getBlinkerSuccessful(data) {
            if (yaw_rate < 0 && data.turn_signal_left == 0x00) {
                say("Remember to signal left!");
            } else if (yaw_rate > 0 && data.turn_signal_right == 0x00) {
                say("Remember to signal right!");
            }
        }
    }
}

function stopBlinker() {
    if (yawId != 0){
        gm.info.clearVehicleData(yawId);
        yaw_rate = 0;
        yawId = 0;
    }
}

/* Seat belt */
var seatbeltId = 0;
var passengerId = 0;

function seatBeltWarning() {
    var passenger_present = 0;
    var passenger_seatbelt_fastened = 0;

    seatbeltId = gm.info.watchVehicleData(getSeatbeltSuccessful,
        ['passenger_seatbelt_fastened']);

    passengerId = gm.info.watchVehicleData(getPassengerSuccessful,
        ['passenger_present']);

    function getSeatbeltSuccessful(data){
        passenger_seatbelt_fastened = data.passenger_seatbelt_fastened;
        checkSeatbelt();
    }

    function getPassengerSuccessful(data){
        passenger_present = data.passenger_present;
        checkSeatbelt();
    }

    function checkSeatbelt() {

        if (passenger_present == 1 && passenger_seatbelt_fastened == 0){
            say("Shotgun, put on your seatbelt!");
        }
    }
}

function stopSeatbelt() {
    if (seatbeltId != 0 || passengerId != 0) {
        gm.info.clearVehicleData(seatbeltId);
        gm.info.clearVehicleData(passengerId);
        seatbeltId = 0;
        passengerId = 0;
    }
}

var prev_gear = "F";

/* Doors */
function doorWarning() {
    // gm.info.getVehicleData(getGearSuccessful, ['gear_automatic']);
    // var currGear;
    //
    // function getGearSuccessful(data) {
    //     console.log('Gear is: ', data.gear_automatic);
    //     currGear = data.gear_automatic;
    // }
    //
    //
    // // if in neutral or park and changed to forward or reverse, give warning
    // var neutralOrPark = (prev_gear == "D" || prev_gear == "N");
    // var toForwardOrReverse = (currGear == "E" || currGear == "C");
    // if (neutralOrPark && toForwardOrReverse){
    //
    // }
}

function stopDoor() {

}

// Accessibility
function bigFont() {
    console.log("Calling bigFont");

    var settings = document.getElementById("Settings");
    settings.classList.add("big-font");
}

function smallFont() {
    var settings = document.getElementById("Settings");
    settings.classList.remove("big-font");
}
