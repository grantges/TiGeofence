/*
 * Geofencing Sample Application
 *  
 */
Ti.UI.setBackgroundColor('#fff');

//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');	  	
}
Ti.API.info(Ti.Platform.osname);
Ti.API.info(Ti.Platform.version);

// This is a single context application with mutliple windows in a stack
(function() {
Ti.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
Ti.Geolocation.distanceFilter = .1;
Ti.Geolocation.purpose = "Geofence wants to use your location info - ok?";


var tabGroup = Ti.UI.createTabGroup();

var Map= require('ui/common/Map'); 
var winMap = new Map({ title:'Map'}); 
var tabMap = Titanium.UI.createTab({ icon:'images/light_home.png', title:'Map', window:winMap }); 
winMap.containingTab = tabMap; 
tabGroup.addTab(tabMap);


var Places= require('ui/common/Places'); 
var winPlaces = new Places({ title:'Places'}); 
var tabPlaces = Titanium.UI.createTab({ icon:'images/light_pin.png', title:'Places', window:winPlaces });  
winPlaces.containingTab = tabPlaces;
tabGroup.addTab(tabPlaces);

if(Ti.Platform.version >= 5.1){
	var Region = require('libs/Geofence').Region;
	var TiGeofence = require('libs/Geofence').TiGeofence;
	
	var place = new Region("BertsHouse", 37.78583, -122.40464, 5, 200);
	TiGeofence.addRegion(place);
	TiGeofence.startMonitoringRegion(place.id);
}

tabGroup.open();
	
})();
