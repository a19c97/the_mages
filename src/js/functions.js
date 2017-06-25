// App JS functions

// User functions

function createUser(name) {
    users.push({
        name: name,
        music: true,
        map: true,
        learner: true,
        accessibility: true,
        volume: 0.5
    });

    var newIcon = document.createElement('img');
    newIcon.src = "images/user.png";
    newIcon.alt = name;
    newIcon.classList.add("user");
    newIcon.onclick = "changePageFocus('welcome')";
    var parent = document.getElementById('welcome').children[2];
    parent.insertBefore(newIcon, parent.firstChild);
}

// Speed functions

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

/* Speeding warning */
function speedingWarning(speed) {
    var textMom = false;
    console.log("Current speed: " + speed);
    console.log("You are going too fast! I'm scared.");
    /*
    var id = gm.voice.startTTS(success, "You are going too fast! I'm scared.");
    if (id == 1){
        // error; raise it somehow
    }
    function success() {
        // let it roll
    }
    gm.voice.stopTTS(id); */

    textMom = true;
    sendSpeedingText(speed);
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

function playAudio() {
    var music = document.getElementById('audio_player');

    if (music.paused) {
        music.play();
        pButton.className = "";
        pButton.className = "pause";
    } else {
        music.pause();
        pButton.className = "";
        pButton.className = "play";
    }
}

function setVolume(volume) {
    var music = document.getElementById('audio_player');
    music.volume = volume;
}
