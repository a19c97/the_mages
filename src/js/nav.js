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
                currentUser = users[i];
                console.log(users[i]);
            }
        }
    }

    if (currentUser.locationMonitoring){
        console.log("Monitoring location");
        checkLocation();
    }
    if (currentUser.speedWarning){
        console.log("Speed warning on");
        checkSpeed();
    }

    if (currentUser.accessiblity){
        console.log("accessiblity on");
        // do accessiblity stuff
    }

    if (currentUser.learner){
        console.log("Learner mode on");
        // do learner stuff
        doorWarning();
        blinkerReminder();
        seatBeltWarning();
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
