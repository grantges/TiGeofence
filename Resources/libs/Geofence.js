exports.Region = (function(id, lat, lng, accuracy, radius, enteredRegionCallback, exitRegionCallback) {
	var instance = {};
	
	instance.id = id;
	instance.lat = lat;
	instance.lng = lng;
	instance.accuracy = accuracy;
	instance.radius = radius;
	instance.enteredRegionCallback = enteredRegionCallback;
	instance.exitRegionCallback = exitRegionCallback;
	
	return instance;
});

var geofencingEnabled = ( (Ti.Platform.osname === 'iphone' || Ti.Platform.osname === 'ipad') && Ti.Platform.version >= 5.1);
exports.TiGeofence = (function(regions) {
	
	var instance = {};
	instance.regions = (regions && regions.length) ? regions : [];
	instance.runningInBackground = false;
	
	//instance.startMonitoring = Ti.Geolocation.startMonitoring;
	//instance.stopMonitoring = Ti.Geolocation.stopMonitoring;
	
	instance.addRegion = function(region) {
		instance.regions.push(region);
	};
	
	instance.startMonitoringRegion = function(id, callbackEnter, callbackExit) {
		// start monitoring a region for the matching id
		
		if(geofencingEnabled) {
			for(var i=0; i< instance.regions.length; i++){
				if(instance.regions[i].id === id) {
					
					Ti.Geolocation.startMonitoring({
					  lat: instance.regions[i].lat,
					  lng: instance.regions[i].lng,
					  accuracy: instance.regions[i].accuracy,
					  radius: instance.regions[i].radius,
					  identifier: instance.regions[i].id
					});
					
					// react when a region is entered
					Ti.Geolocation.addEventListener('enteredRegion', function(e) {
						  if (instance.runningInBackground) {
						    // use a local notification
						  } else {
						    var alertDialog = Titanium.UI.createAlertDialog({
						      title: 'Geofencing',
						      message: "You entered the region identified by " + e.region.identifier
						    });
						    alertDialog.show();
						    
						  }
						  callbackEnter(e);
					});
					
					// react when a region is exited
					Ti.Geolocation.addEventListener('exitedRegion', function(e) {
					  if (instance.runningInBackground) {
					    // use a local notification
					  } else {
					    var alertDialog = Titanium.UI.createAlertDialog({
					      title: 'Geofencing',
					      message: "You exited the region identified by " + e.region.identifier
					    });
					    alertDialog.show();
					  }
					  
					  callbackExit(e);
					});
				}
			}
		}
		else {
			Alert('iOS 5.1 or above required for Geofencing API to work.')
		}
	};
	
	instance.stopMonitoringRegion = function(id){
		
		if(geofencingEnabled) {
			for(var i=0; i< instance.regions.length; i++){
				if(instance.regions[i].id === id) {
					// stop monitoring a region
					Ti.Geolocation.stopMonitoring({
					  lat: instance.regions[i].lat,
					  lng: instance.regions[i].lng,
					  accuracy: instance.regions[i].accuracy,
					  radius: instance.regions[i].radius,
					  identifier: instance.regions[i].id
					});
				}
			}
		}
		else {
			Alert('iOS 5.1 or above required for Geofencing API to work.')
		}
	};
	
	instance.monitoredRegions = Ti.Geolocation.monitoredRegions;
	

	//AppState Callbacks
	Ti.App.addEventListener('pause', function(e){
		instance.runningInBackground = true;
	});
	
	Ti.App.addEventListener('resume', function(e){
		instance.runningInBackground = false;
	});
	
	Ti.App.addEventListener('resumed', function(e){
		instance.runningInBackground = false;
	});
	
	return instance;
})();




/*
// start monitoring a region
Ti.Geolocation.startMonitoring({
  lat: 123.33,
  lng: 45.34,
  accuracy: 5,
  radius: 100,
  identifier: "the region identifier"
});

// react when a region is entered
Ti.Geolocation.addEventListener('enteredRegion', function(e) {
  if (backgrounded) {
    // use a local notification
  } else {
    var alertDialog = Titanium.UI.createAlertDialog({
      title: 'Geofencing',
      message: "You entered the region identified by " + e.region.identifier
    });
    alertDialog.show();
  }
});

// react when a region is exited
Ti.Geolocation.addEventListener('exitedRegion', function(e) {
  if (backgrounded) {
    // use a local notification
  } else {
    var alertDialog = Titanium.UI.createAlertDialog({
      title: 'Geofencing',
      message: "You exited the region identified by " + e.region.identifier
    });
    alertDialog.show();
  }
});

// stop monitoring a region
Ti.Geolocation.stopMonitoring({
  lat: 123.33,
  lng: 45.34,
  accuracy: 5,
  radius: 100,
  identifier: "the region identifier"
});

// get an array of monitored regions - each region is a hash of lat, lng, accuracy, radius, identifier
regions = Ti.Geolocation.monitoredRegions();
*/