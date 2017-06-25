function goHome(dest) {
	var dest = {
		address: dest
	};
	gm.nav.setDestination(success, dest)

	function success(list) {
		gm.nav.getDestination(function (data) {
			gm.info.getCurrentPosition(function (data2) {
				mapGo({
					lat: data2.coords.latitude,
					lng: data2.coords.longitude
				}, {
					lat: data.latitude,
					lng: data.longitude
				});
				google.maps.event.trigger(map, 'resize')
			}, true);
		}, true);
		openTab('Map', document.getElementById('mapButton'), 'rgb(77, 158, 19)');
		say('Navigation started. We are going home.');
	}
}
