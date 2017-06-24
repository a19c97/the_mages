/* JS navigation code */

function initializeUI() {
    document.getElementById('tabs').style.display = "none";
    document.getElementbyId('create').style.display = "none";
    document.getElementById('welcome').style.display = "inline";
}

function changePageFocus(page) {
    if (page === 'welcome') {
        document.getElementById('tabs').style.display = "inline";
        document.getElementById('welcome').style.display = "none";
        currentPage = 'tabs';
    } else if (currentPage === 'tabs') {
        document.getElementById('tabs').style.display = "none";
        document.getElementById('welcome').style.display = "inline";
        currentPage = 'welcome';
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