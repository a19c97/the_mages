function getPOI(type, tabName, elmnt, r, g, b) {
	var xhr = new XMLHttpRequest();
	var lat;
	var lon;
	gm.info.getCurrentPosition(setCoords, true)
	
	openTab(tabName, elmnt, r, g, b);
	
	function setCoords(data) {
		lat = data.coords.latitude;
		lon = data.coords.longitude;
	}
	
	xhr.open('GET', 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + ',' + lon + '&radius=1000&type=' + type + '&key=AIzaSyDBo-j489qE4Ea7UOkJvCMD_SJnlt2xfXs');
	var r
	xhr.addEventListener('load', assignResult);
	
	function assignResult() {
		r = JSON.parse(xhr.responseText);
	}
	
	xhr.send(null);

	xhr.open('GET', 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + ',' + lon + '&radius=1000&type=' + type + '&key=AIzaSyDBo-j489qE4Ea7UOkJvCMD_SJnlt2xfXs');
	var r
	xhr.addEventListener('load', assignResult);
	
	function assignResult() {
		r = JSON.parse(xhr.responseText);
	}
	
	xhr.send(null);
	
	var result = new Array(Math.min(r.results.length, 10));

	for (var i = 0; i < result.length; i++) {
		result[i] = r.results[i].name;
	}

	return result;
}
