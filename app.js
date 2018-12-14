var app = (function()
{
	// Application object.
	var app = {};

	// Background detection.
	var notificationID = 0;
	var inBackground = false;
	document.addEventListener('pause' , function() { inBackground = true });
	document.addEventListener('resume', function() { inBackground = false });

	// Dictionary of beacons.
	var beacons = {};

	// Timer that displays list of beacons.
	var updateTimer = null;

	app.initialize = function()
	{
		document.addEventListener(
			'deviceready',
			function() { evothings.scriptsLoaded(onDeviceReady) },
			false);
	};

	function onDeviceReady()
	{
		// Specify a shortcut for the location manager holding the iBeacon functions.
		window.locationManager = cordova.plugins.locationManager;

		// Start tracking beacons!
		startScan();

		const INTERVAL_TIME = 500;
		// Display refresh timer.
		updateTimer = setInterval(displayBeaconList, INTERVAL_TIME);
	}
	async function startScan()
	{

		var product = [];

		const LINK_DATA_M_LAB = "https://api.mongolab.com/api/1/databases/xday/collections/apis?apiKey=kPpxgh2X_upv8Z66irZuhRNdTyQX6c_D";

		await $.get(LINK_DATA_M_LAB, function(data, status){
			product = data;
		});
		var regions = product.reduce((previousVal, currentVal) => {
			previousVal.push({
				uuid: currentVal.uuid
			});
			return previousVal;
		}, []);
		// The delegate object holds the iBeacon callback functions
		// specified below.
		var delegate = new locationManager.Delegate();

		// Called continuously when ranging beacons.
		delegate.didRangeBeaconsInRegion = function(pluginResult)
		{
			//console.log('didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult))
			for (var i in pluginResult.beacons)
			{
				// Insert beacon into table of found beacons.
				var beacon = pluginResult.beacons[i];
				beacon.timeStamp = Date.now();
				for(var x in product){
					if(product[x].minor == beacon.minor){
						beacon.nameProduct = product[x].nameProduct;
						beacon.priceProduct = product[x].priceProduct;
						beacon.madeIn = product[x].madeIn;
						beacon.info = product[x].info;
						beacon.img = product[x].img;
					}
				}
				var key = beacon.uuid + ':' + beacon.major + ':' + beacon.minor  + ':' +  beacon.nameProduct;
				if(beacon.nameProduct !== undefined){
					beacons[key] = beacon;
				}
			}
		};

		// Called when starting to monitor a region.
		// (Not used in this example, included as a reference.)
		delegate.didStartMonitoringForRegion = function(pluginResult)
		{
			//console.log('didStartMonitoringForRegion:' + JSON.stringify(pluginResult))
		};

		// Called when monitoring and the state of a region changes.
		// If we are in the background, a notification is shown.
		delegate.didDetermineStateForRegion = function(pluginResult)
		{
			if (inBackground)
			{
				// Show notification if a beacon is inside the region.
				// TODO: Add check for specific beacon(s) in your app.
				if (pluginResult.region.typeName == 'BeaconRegion' &&
					pluginResult.state == 'CLRegionStateInside')
				{
					cordova.plugins.notification.local.schedule(
						{
							id: ++notificationID,
							title: 'Beacon in range',
							text: 'iBeacon Scan detected a beacon, tap here to open app.'
						});
				}
			}
		};

		// Set the delegate object to use.
		locationManager.setDelegate(delegate);

		// Request permission from user to access location info.
		// This is needed on iOS 8.
		locationManager.requestAlwaysAuthorization();

		// Start monitoring and ranging beacons.
		for (var i in regions)
		{
			var beaconRegion = new locationManager.BeaconRegion(
				i + 1,
				regions[i].uuid);

			// Start ranging.
			locationManager.startRangingBeaconsInRegion(beaconRegion)
				.fail(console.error)
				.done();

			// Start monitoring.
			// (Not used in this example, included as a reference.)
			locationManager.startMonitoringForRegion(beaconRegion)
				.fail(console.error)
				.done();
		}
	}

	function displayBeaconList()
	{
		// Clear beacon list.
		$('#found-beacons').empty();
		$('#elementMuaNgay').empty();
		var timeNow = Date.now();

		// Update beacon list.
		$.each(beacons, function(key, beacon)
		{
			
				var element = $(
					'<li>'
					+ '<img src="'+ beacon.img + '" class="img-responsive" style="margin-left:15px"> <br/>' 
					+	'<div class="flex-container"><strong style="font-size:18px; font-weight: bolder;"> <span class="glyphicon glyphicon-star-empty" style="margin-right: 7px"></span>' + beacon.nameProduct + '</strong></div><br />'
					+	'Giá Tiền: <span style="color: red; font-weight: bolder">' + beacon.priceProduct + '</span><br />'
					+   'Khuyến Mãi: <i class="glyphicon glyphicon-certificate" style="color: red"></i><i style="color: red">10%</i><br/>'
					+	'Xuất Sứ: ' + beacon.madeIn + '<br />'
					+	'Thông Tin: ' + beacon.info + '<br />'
						+ "<div class='flex-container'  style='margin-left:15px'><button class='blue' ><span class='glyphicon glyphicon-info-sign' style='margin-right: 10px'></span><a href='./muangay.html' style='font-weight:bolder'>Thông Tin Sản Phẩm</a></button></div>"
					+ '</li>'
					+ '<br/> <br/>'
				);
				var elementMuaNgay = $(
					'<div>'
					+	'<strong>Tên Sản Phẩm: ' + beacon.nameProduct + '</strong><br />'
					+ '</div>'
				)
				var rssiWidth = 1; // Used when RSSI is zero or greater.
				if (beacon.rssi < -100) { rssiWidth = 100; }
				// else if (beacon.rssi < 0 && beacon.rssi > -56) { 
				// //  }
				//  else 
				// if(beacon.rssi < -56){
				// 	$('#found-beacons').prepend(element);	 
				//  }
				$('#warning').remove();
				$('#found-beacons').prepend(element);				
				$('#elementMuaNgay').prepend(elementMuaNgay);
			// }
		});
	}

	return app;
})();

app.initialize();
