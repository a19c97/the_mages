function getPOI(type, tabName, elmnt, color) {
	gm.info.getCurrentPosition(processPosition, true)
	
	function processPosition(position){
		var lat = position.coords.latitude;
		var lon = position.coords.longitude;
		openTab(tabName, elmnt, color);
		init(type, lat, lon);
	}
}

function modifyWeight() {
	for (var i = 0; i < result.length; i++) {
		console.log(result[i]);
	}
}

function selectIcon() {

}
