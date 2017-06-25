function getPOI(type, tabName, elmnt, color) {
	var lat;
	var lon;
	gm.info.getCurrentPosition(processPosition, true)
	
	function processPosition(position){
		lat = position.coords.latitude;
		lon = position.coords.longitude;
	}

    openTab(tabName, elmnt, color);
	return init(type, lat, lon);
}
