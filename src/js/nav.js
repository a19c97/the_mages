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
