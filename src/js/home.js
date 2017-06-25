function goHome(dest) {
	var dest = {
		address: dest
	};
	gm.nav.setDestination(success, failure, dest)

	function success(list) {
		say('Navigation started. We are going home.');
	}
	
	function failure(err) {
		say('Navigation started. We are going home.');
	}
}
