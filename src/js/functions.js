// App JS functions

/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "200px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}


// Speeding
var strike = 0;
var speedingLock = false;
var textingLock = false;
var ttsId = 0;

/* Speeding warning */
function speedingWarning(speed) {
    // delay
    if (speedingLock) return;
    speedingLock = true;
    setTimeout(function() {
        speedingLock = false;
    }, 3000);

    console.log("Current speed: " + speed);
    switch (strike) {
        case 0:
            say("You are going too fast.");
            break;
        case 1:
            say("You are going too fast! Slow down!");
            break;
        case 2:
            say("You are going too fast!!! I'm scared!!!");
            break;
        case 3:
            say("Slow down or I'll text mom.");
            break;
        case 4:
            say("I'm not kidding.");
            break;
        case 5:
            say("That's it - I'm texting mom.");
            if (textingLock) return;
            textingLock = true;
            setTimeout(function() {
                textingLock = false;
            }, 6000);
            //sendSpeedingText(speed);
            console.log("Texting mom");
            strike = 0;
            break;
    }

    strike = strike + 1;
}

/* Helper function for tts */
function say(text) {
    if (ttsId != 0){
        gm.voice.stopTTS(ttsId);
    }
    ttsId = gm.voice.startTTS(success, text);

    function success() {
        // let it roll
    }
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
function sendLocation() {

}

/* Set the destination of the car to home */
function setDestination() {
	console.log("Set destination to home");
	// var dest
	//gm.nav.setDestination(goHomeSuccess, goHomeFailure, dest, true);
}

function goHomeSuccess(list) {
  console.log("Destination has been set");
}

function goHomeFailure(err) {
  console.log("Having trouble setting destination");
}
