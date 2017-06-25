function goHome() {
	var dest = {
		address: '341 Yonge St, Toronto, ON M5B 1S1'
	};
	gm.nav.setDestination(success, failure, dest)

	function success(list) {
		say('Navigation started. We are going home.');
	}
	
	function failure(err) {
		say('Navigation started. We are going home.');
	}
}
