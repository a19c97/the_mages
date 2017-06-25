/* JS navigation code */

function initializeUI() {
    document.getElementById('tabs').style.position = 'absolute';
    document.getElementById('tabs').style.opacity = '0';
    document.getElementById('create').style.position = 'absolute';
    document.getElementById('create').style.opacity = '0';
    document.getElementById('welcome').style.position = 'static';
    document.getElementById('welcome').style.opacity = '1';
}

/**
 * Changes the main page in focus. For changing to tabs, name must be a string, otherwise null.
 */
function changePageFocus(page, name) {
    document.getElementById(currentPage).style.position = 'absolute';
    document.getElementById(currentPage).style.opacity = '0';
    document.getElementById(currentPage).style.transition = '';
    document.getElementById(page).style.position = 'static';
    document.getElementById(page).style.opacity = '1';
    document.getElementById(page).style.transition = 'position 0.25s, opacity 0.25s linear';

    currentPage = page;
    if (name) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].name === name) {
                currentUserIndex = i;
                console.log(users[i]);
                // Reflect selected user settings in UI
                loadSettings();
            }
        }
    }

    if (page !== 'welcome' && page != 'create'){
        runSettings();
    }
}


function runSettings() {
    console.log("Running settings");

    if (users[currentUserIndex].locationMonitoring){
        console.log("Monitoring location");
        checkLocation();
    } else {
        stopLocation();
    }

    if (users[currentUserIndex].speedWarning){
        console.log("Speed warning on");
        checkSpeed();
    } else {
        stopSpeed();
    }

    if (users[currentUserIndex].accessibility){
        console.log("accessiblity on");
        bigFont();
    } else {
        smallFont();
    }

    if (users[currentUserIndex].learner){
        console.log("Learner mode on");
        doorWarning();
        blinkerReminder();
        seatBeltWarning();
    } else {
        stopSeatbelt();
        stopBlinker();
        stopDoor();
    }

}

function openTab(tabName, elmnt, color) {

    // Hide all elements with class="tabcontent" by default */
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove the background color of all tablinks/buttons
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }

    // Show the specific tab content
    document.getElementById(tabName).style.display = "block";

    // Add the specific color to the button used to open the tab content
    elmnt.style.backgroundColor = color;
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

// Checkbox stuff
function learnerCheck(){
    users[currentUserIndex].learner = !users[currentUserIndex].learner;
    if (users[currentUserIndex].learner) {
        say("Learner mode on");
    } else {
        say("Learner mode off");
    }
    runSettings();
}

function accessCheck() {
    users[currentUserIndex].accessibility = !users[currentUserIndex].accessibility;
    if (users[currentUserIndex].accessibility) {
        say("Enhanced accessibility on");
    } else {
        say("Enhanced accessibility off");
    }
    runSettings();
}

function speedCheck() {
    users[currentUserIndex].speedWarning = !users[currentUserIndex].speedWarning;
    if (users[currentUserIndex].speedWarning) {
        say("Speed warning on");
    } else {
        say("Speed warning off");
    }
    runSettings();
}

function locationCheck() {
    users[currentUserIndex].locationMonitoring = !users[currentUserIndex].locationMonitoring;
    if (users[currentUserIndex].locationMonitoring) {
        say("Location monitoring on");
    } else {
        say("Location monitoring off");
    }
    runSettings();
}
