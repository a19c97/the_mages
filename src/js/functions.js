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
