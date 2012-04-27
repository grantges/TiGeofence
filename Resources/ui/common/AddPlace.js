function AddPlace() {
	var curLat,curLong;
	
	var instance = Ti.UI.createWindow({
		title: 'Add Location',
		layout: 'vertical'
	});
	
	var textField = Ti.UI.createTextField({
		hintText: 'name',
		top: 25,
		left: 20,
		right: 20,
		height: 25,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	});
	instance.add(textField);
	
	var lblLatitude = Ti.UI.createLabel({
		text: 'Latitude : '+curLat,
		top: 10
	});
	instance.add(lblLatitude);
	
	var lblLongitude = Ti.UI.createLabel({
		text: 'Longitude : '+curLong,
		top: 10
	});
	instance.add(lblLongitude);
	
	var btnAddPlace = Ti.UI.createButton({
		title: 'Add Current Location',
		enabled: false,
		left: 20,
		right: 20,
		top: 30
	});
	btnAddPlace.addEventListener('click', function(e){
		
		if(textField.value !==''){
			var Region = require('libs/Geofence').Region;
			var TiGeofence = require('libs/Geofence').TiGeofence;
			var places = eval(Ti.App.Properties.getString('places', [{id: 'AppceleratorHQ', lat: 37.390749, lng: -122.081651, accuracy: 5, radius: 100 }]  ));	
			var place = new Region(textField.value, curLat, curLong, 5, 100);
			
			places.push(place);
			Ti.App.Properties.setString('places', JSON.stringify(places));
			Ti.App.fireEvent('update-places-data');
			Ti.App.fireEvent('update-map');
			
			
			TiGeofence.addRegion(place);
			TiGeofence.startMonitoringRegion(place.id);
		}
	});
	instance.add(btnAddPlace);
	
	Ti.Geolocation.getCurrentPosition(function(e){
		if(e.coords) {
			curLat = e.coords.latitude;
			lblLatitude.text = 'Latitude : ' + curLat;
			curLong = e.coords.longitude;
			lblLongitude.text = 'Longitude : '+curLong;
			btnAddPlace.enabled = true;
		}
	});
	
	return instance;
	
};

module.exports = AddPlace;
