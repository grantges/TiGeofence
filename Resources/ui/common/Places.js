var Places = function(){
	
	var instance = Ti.UI.createWindow({
		title: "Places",
		backgroundColor: '#fff',
		activity: {
			onCreateOptionsMenu : function(e) {
				var menu = e.menu;
				var m1 = menu.add({ title : 'Add' });
				m1.addEventListener('click', function(e) {
				//open in tab group to get free title bar (android)
					var AddPlace = require('ui/common/AddPlace');
					instance.containingTab.open(new AddPlace);
				});
			}
		}
	});
	
	var PlacesTable = require('ui/common/PlacesTable');
	instance.add(new PlacesTable()); 
	
	
	if(Ti.Platform.osname === 'iphone' || Ti.Platform.osname === 'ipad'){
		var btnAdd = Ti.UI.createButton({
			systemButton: Ti.UI.iPhone.SystemButton.PLAIN,
			title: 'New Place'
		});
		btnAdd.addEventListener('click', function(){
			var AddPlace = require('ui/common/AddPlace');
			instance.containingTab.open(new AddPlace);
		});
		
		instance.rightNavButton = btnAdd;
	}
	
	return instance
};

module.exports = Places;
