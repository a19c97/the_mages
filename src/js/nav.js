/* JS navigation code */

function initializeUI() {
    for (var i = 0; i < DIVS.length; i++) {
        if (DIVS[i] !== 'welcome') {
            document.getElementById(DIVS[i]).style.display = "none";
        } else {
            document.getElementById(DIVS[i]).style.display = "inline";
        }
    }
}

function setPageFocus(page) {
    document.getElementById(currentPage).style.display = "none";
    if (page !== 'welcome') {
        document.getElementById(page).style.display = "inline";
        //document.getElementById('tabs').style.display = "inline";
    } else {
        document.getElementById('welcome').style.display = "inline";
        //document.getElementById('tabs').style.display = "none";
    }
}

function openTab(cityName, elmnt, color) {
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
    document.getElementById(cityName).style.display = "block";

    // Add the specific color to the button used to open the tab content
    elmnt.style.backgroundColor = color;
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();