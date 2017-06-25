/* JS navigation code */

function initializeUI() {
    document.getElementById('tabs').style.display = "none";
    document.getElementById('create').style.display = "none";
    document.getElementById('welcome').style.display = "inline";
}

/**
 * Changes the main page in focus. For changing to tabs, name must be a string, otherwise null.
 */
function changePageFocus(page, name) {
    document.getElementById(currentPage).style.display = "none";
    document.getElementById(page).style.display = "inline";
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

    if (page !== 'welcome'){
        if (users[currentUserIndex].locationMonitoring){
            console.log("Monitoring location");
            checkLocation();
        }
        if (users[currentUserIndex].speedWarning){
            console.log("Speed warning on");
            checkSpeed();
        }

        if (users[currentUserIndex].accessibility){
            console.log("accessiblity on");
            // do accessiblity stuff
        }

        if (users[currentUserIndex].learner){
            console.log("Learner mode on");
            // do learner stuff
            //doorWarning();
            blinkerReminder();
            //seatBeltWarning();
        }
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
}

function accessCheck() {
    users[currentUserIndex].accessibility = !users[currentUserIndex].accessibility;
    if (users[currentUserIndex].accessibility) {
        say("Enhanced accessibility on");
    } else {
        say("Enhanced accessibility off");
    }
}

function speedCheck() {
    users[currentUserIndex].speedWarning = !users[currentUserIndex].speedWarning;
    if (users[currentUserIndex].speedWarning) {
        say("Speed warning on");
    } else {
        say("Speed warning off");
    }
}

function locationCheck() {
    users[currentUserIndex].locationMonitoring = !users[currentUserIndex].locationMonitoring;
    if (users[currentUserIndex].locationMonitoring) {
        say("Locatoin monitoring on");
    } else {
        say("Location monitoring off");
    }
}
