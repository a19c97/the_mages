// App JS functions

/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "200px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

var dest = {
  address: '400 Renaissance Center Drive, Detroit, Michigan 48243'
}

/* Set the destination of the car to home */
function goHome() {
	console.log('go home');
	//gm.nav.setDestination(goHomeSuccess, goHomeFailure, dest, true);
}

function goHomeSuccess(list) {
  console.log('destination has been set');
}

function goHomeFailure(err) {
  console.log('having trouble setting destination');
}