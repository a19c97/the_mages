// App JS functions

/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "200px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}


// Server side code
var request = require('request');
//request();

// Speeding

/* Speeding warning */
function speedingWarning(speed) {
    var textMom = false;
    console.log("Current speed: ");
    console.log("You are going too fast! I'm scared.");
    var id = gm.voice.startTTS(success, "You are going too fast! I'm scared.");
    if (id == 1){
        // error; raise it somehow
    }
    function success() {
        // let it roll
    }
    gm.voice.stopTTS(id);

    textMom = true;
    sendSpeedingText(speed);
}

/* Send speeding data to mom */
function sendSpeedingText(speed) {

}

// Location data
/* Send location data */
function sendLocation() {

}
