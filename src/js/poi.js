function getPOI(type) {
	var xhr = new XMLHttpRequest();
	var lat;
	var lon;
	gm.info.getVehicleData(setCoords, ['gps_lat', 'gps_long'])

	function setCoords(data) {
		lat = data.gps_lat
		lon = data.gps_long
	}
	
	xhr.open('GET', 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + ',' + lon + '&radius=1000&type=' + type + '&key=AIzaSyDBo-j489qE4Ea7UOkJvCMD_SJnlt2xfXs');
	var r
	xhr.addEventListener('load', assignResult);
	
	function assignResult() {
		r = JSON.parse(xhr.responseText);
	}
	
	xhr.send(null);

	return r;
}
