

var PlacesTable = function(captured){
	
	var instance = Ti.UI.createTableView({
		backgroundColor: 'transparent',
	});
	
	function populateData() {
		var tableData = [];
		var places = eval(Ti.App.Properties.getString('places', [{id: 'AppceleratorHQ', lat: 37.390749, lng: -122.081651, accuracy: 5, radius: 100 }]  ));
		
		for(var i=0;i<places.length;i++){
			
			var row = Ti.UI.createTableViewRow({
				className: "TableRow",
				title: places[i].id,
				lat: places[i].lat,
				lng: places[i].lng,
				accuracy: places[i].accuracy,
				radius: places[i].radius
			});
			
			var monitorSwitch = Titanium.UI.createSwitch({
			    value:false
			});
			monitorSwitch.addEventListener('change',function(e) {
				var TiGeofence = require('libs/Geofence').TiGeofence;
				if(e.value)
					TiGeofence.startMonitoringRegion(e.parent.title);
				else 
					TiGeofence.stopMonitoringRegion(e.parent.title);
			});
			row.add(monitorSwitch);
			
			tableData.push(row);
		}
		
		instance.setData(tableData);
	}
	
	Ti.App.addEventListener('update-places-data', populateData);
	
	populateData();
	
	return instance;
};

module.exports = PlacesTable;