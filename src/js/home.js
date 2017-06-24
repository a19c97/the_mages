function goHome() {
	var dest = {
		address: '341 Yonge St, Toronto, ON M5B 1S1'
	}
	gm.nav.setDestination(success, failure, dest)

	function success(list) {
	  console.log('destination has been set');
	}
	
	function failure(err) {
	  console.log('having trouble setting destination');
	}
}
