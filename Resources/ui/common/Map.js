var Map = function(){
	var instance = Ti.UI.createWindow({title: "Map"});
	
	var mapview = Titanium.Map.createView({
	    mapType: Titanium.Map.STANDARD_TYPE,
	    region: {latitude:33.74511, longitude:-84.38993, 
	            latitudeDelta:1, longitudeDelta:1},
	    animate:true,
	    regionFit:true,
	    userLocation:true
	});
	instance.add(mapview);
	
	Ti.Geolocation.getCurrentPosition(function(e){
		mapview.region = {latitude:e.coords.latitude, longitude:e.coords.longitude, latitudeDelta:1, longitudeDelta:1};
	});

	
	Ti.App.addEventListener('update-map', function(e){
		var mapPoints = eval(Ti.App.Properties.getString('places', null));
		var annotations = [];
		for(item in mapPoints){
			var a = Ti.Map.createAnnotation({
				title: mapPoints[item].id,
				latitude: mapPoints[item].lat,
				longitude: mapPoints[item].lng,
				animate: true
			});
			annotations.push(a);
			
			mapview.annotations = annotations;
		}
		
	});
	
	Ti.App.fireEvent('update-map');
	
	return instance;
};

module.exports = Map;
