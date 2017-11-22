const gm_container = document.getElementById("gm_container");
let infoToggled = false;
let infoWindow;
const lines = [];
let step = 0;
let numSteps = 200;
let lineDrawed = false;
let marker;
let key;
let count;
let map;
let markerToggled = true;

const markerInfo = ["boots_1", "boots_2", "boots_3", "boots_4" ];
const markers = [];
const markerCord =
{
		jacket : [
        { lat: 43.717425, lng: -5.015271 },
		{ lat: 60.717425, lng: 13.015271 },
		{ lat: 35.717425, lng: 85.015271 },
		{ lat: 25.058686, lng: -5.805401 }
    ]
}


let zoom;

const windowWidth = window.innerWidth;

if (windowWidth >= 768) {
	zoom = 2;
}

else {
	zoom = 1;
}
// Kartan: gör havet till #090909, land #272727, text #5e5e5e, och gör markörerna till såna där "pins" i den bruna färgen

function initMap() {
	const options = {
		center: new google.maps.LatLng(45,0),
		disableDefaultUI: true,
		scrollWheel: false,
		navigationControl: false,
		mapTypeControl: false,
		scaleControl: false,
		draggable: false,
		zoom: zoom,
		styles: [
			{
				elementType: 'geometry',
				stylers: [{color: '#272727'}]
			},
			{
				elementType: 'labels.text.stroke',
				stylers: [{color: '#242f3e'}]
			},
			{
				elementType: 'labels.text.fill',
				stylers: [{color: '#5e5e5e'}]
			},
			{
				featureType: 'administrative.locality',
				elementType: 'labels.text.fill',
				stylers: [{color: '#5e5e5e'}]
			},
			{
				featureType: 'poi',
				elementType: 'labels.text.fill',
				stylers: [{color: '#5e5e5e'}]
			},
			{
				featureType: 'poi.park',
				elementType: 'geometry',
				stylers: [{color: '#263c3f'}]
			},
			{
				featureType: 'poi.park',
				elementType: 'labels.text.fill',
				stylers: [{color: '#5e5e5e'}]
			},
			{
				featureType: 'road',
				elementType: 'geometry',
				stylers: [{color: '#272727'}]
			},
			{
				featureType: 'road',
				elementType: 'geometry.stroke',
				stylers: [{color: '#212a37'}]
			},
			{
				featureType: 'road',
				elementType: 'labels.text.fill',
				stylers: [{color: '#5e5e5e'}]
			},
			{
				featureType: 'road.highway',
				elementType: 'geometry',
			},
			{
				featureType: 'road.highway',
				elementType: 'geometry.stroke',
				stylers: [{color: '#1f2835'}]
			},
			{
				featureType: 'road.highway',
				elementType: 'labels.text.fill',
				stylers: [{color: '#5e5e5e'}]
			},
			{
				featureType: 'transit',
				elementType: 'geometry',
				stylers: [{color: '#2f3948'}]
			},
			{
				featureType: 'transit.station',
				elementType: 'labels.text.fill',
				stylers: [{color: '#5e5e5e'}]
			},
			{
				featureType: 'water',
				elementType: 'geometry',
				stylers: [{color: '#090909'}]
			},
			{
				featureType: 'water',
				elementType: 'labels.text.fill',
				stylers: [{color: '#5e5e5e'}]
			},
			{
				featureType: 'water',
				elementType: 'labels.text.stroke',
				stylers: [{color: '#e8491d'}]
			}
		]
	}

	map = new google.maps.Map(document.getElementById('map'), options); // creates the map with all the styling (options)


    dropMarkers(markerCord.jacket, count, markerInfo);

    function dropMarkers(cordArray, count, inforArray){
    	for (let i = 0; i < cordArray.length; i++) {
    		addMarkers(cordArray[i], i * 300, i ,inforArray)
    	}
    	setTimeout(function(){
    		drawLine(cordArray[0], cordArray[1], true, 1, 2, cordArray, 0)
    	}, cordArray.length * 400);
    }

	const icon = {
		url : "imgs/brown_MarkerO.png",
		size: new google.maps.Size(20, 32)
	}

    function addMarkers(position, time, i, inforArray) {
    	window.setTimeout(function() {
    		marker = new google.maps.Marker({
    			position: position,
    			map: map,
    			animation:google.maps.Animation.DROP,
				icon: icon
    		});
    		markers.push(marker);
    		info(marker, inforArray, i, markerToggled);
			markerToggled = false;
    	}, time);
    }


    function info(marker, inforArray, i, markerToggled) {
		if (markerToggled) {
			setTimeout(() => {
				infoWindow = new google.maps.InfoWindow({
					content:"<p style='color:#000;'>" + inforArray[i] + "</p>",
					maxWidth: 1000,
				});
				infoWindow.open(map, marker);
			},1000);
		}
    	marker.addListener("click", function(){
    		if (infoWindow)
    		{
    			infoWindow.close();
    		}
    		infoWindow = new google.maps.InfoWindow({
    			content:"<p style='color:#000;'>" + inforArray[i] + "</p>",
    			maxWidth: 1000,
    		});
    		infoWindow.open(map, marker);
    	});
    }


    function drawLine(startlatLng,endLatLng,drawing, i, j, cordArray, count) {
    	count++;
    	if (drawing && count != cordArray.length)
    	{
    		drawing = false;
    		let departure = new google.maps.LatLng(startlatLng);
    		let arrival = new google.maps.LatLng(endLatLng);
    		let line = new google.maps.Polyline({
    			path: [departure, departure],
    			strokeColor: "#BD9B5B",
    			strokeOpacity: 1,
    			strokeWeight: 3,
    			geodesic: true,
    			map: map,
    		});
    		lines.push(line);
    		let interval = setInterval(function() {
    			step += 1;
    			if (step > numSteps) {
    				step = 0;
    				lineDrawed = true;
    				drawing = true;
    				clearInterval(interval);
    				drawLine(cordArray[i], cordArray[j], drawing, i + 1, j + 1, cordArray, count);
    			}

    			else {
    				let path = google.maps.geometry.spherical.interpolate(departure,arrival,step/numSteps);
    				line.setPath([departure, path]);
    			}
    		}, 1);
    	}
    	else
    	return false;;
    }

    function clearLine(){
    	for (let i = 0; i < lines.length; i++) {
    		lines[i].setMap(null);
    	}
    }

    function setMapOnAll(map) {
    	for (let i = 0; i < markers.length; i++) {
    		markers[i].setMap(map);
    	}
    }

    function clearMarkers()
    {
    	setMapOnAll(null);
    }
}
