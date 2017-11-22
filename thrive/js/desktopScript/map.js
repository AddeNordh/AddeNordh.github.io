const gm_container = document.getElementById("gm_container");
let infoToggled = true;
let infoWindow;
const lines = [];
let step = 0;
let numSteps = 200;
let lineDrawed = false;
let marker;
let key;
let count;
let map;

const markerInfo = [
	"The hemp was hand harvested and processed in Cazères, France.",
 	"The organic cotton was hand harvested and processed in Istanbul, Turkey",
	"The parka was sewn and finished in Beijing, China." ];
const markers = [];
const markerCord =
{
		jacket : [
        { lat: 43.204781, lng: 1.085473 },
		{ lat: 41.005077, lng: 28.969398 },
		{ lat: 39.877838, lng: 116.385438 }
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
				stylers: [{color: '#fff'}]
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
				stylers: [{color: '#fff'}]
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
				stylers: [{color: '#fff'}]
			},
			{
				featureType: 'road.highway',
				elementType: 'labels.text.fill',
				stylers: [{color: '#5e5e5e'}]
			},
			{
				featureType: 'transit',
				elementType: 'geometry',
				stylers: [{color: '#fff'}]
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

	 setTimeout(() => {
		 dropMarkers(markerCord.jacket, count, markerInfo);
	 },200);

    function dropMarkers(cordArray, count, inforArray){
    	for (let i = 0; i < cordArray.length; i++) {
    		addMarkers(cordArray[i], (i + 1) * 400, i ,inforArray);
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
    			position,
    			map,
				icon,
				animation:google.maps.Animation.DROP
    		});
    		markers.push(marker);
    		info(marker, inforArray, i, infoToggled);
			infoToggled = false;
    	}, time);
    }


    function info(marker, inforArray, i, toggled) {
		if (toggled) {
			setTimeout(() => {
				infoWindow = new google.maps.InfoWindow({
					content: "<p style='color: #000;'>" + inforArray[i] + "</p>",
					maxWidth : 1000
				});
				infoWindow.open(map, marker);
			},1500);
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















// let childrenLength = document.getElementById("image_slider").children.length;
// let imgWidth = document.getElementsByClassName("img")[0].clientWidth;
// let imgs = document.getElementsByClassName("img");
// let imgHeight = document.getElementsByClassName("img")[0].clientHeight;
// let gm_container = document.getElementById("gm_container");
// let cloths_btn = document.getElementsByClassName('cloths_opt');
// let cloths_options = document.getElementsByClassName("opt-item");
// let expandImg = document.getElementsByClassName('img-expand');
// let imgWorld = document.getElementsByClassName('img-world');
// let slider = document.getElementById('image_slider');
// let windowWidth = 0;
// let index = 1;
// let enlarged = false;
// let infoToggled = false;
// let infoWindow = null;
// let lines = [];
// let step = 0;
// let numSteps = 200;
// let lineDrawed = false;
// let icon;
// let map;
// let marker;
// let key;
// let count;
// let scrollY;
// let curDown = false;
// let pageX;;
// let startNode;
// let slide = false;
// let isVisible = false;
// let markerInfo =
// [
// 	[ "boots", "boots_1", "boots_2", "boots_3", "boots_4" ],
// 	["jacket", "jacket_1", "jacket_2", "jacket_3", "jacket4" ]
// ];
// let markers = [];
// let markerCord =
// {
// 	boots: [ // the index which check what array it is
// 		{ lat: 43.717425, lng: -5.015271 },
// 		{ lat: 60.717425, lng: 13.015271 },
// 		{ lat: 35.717425, lng: 85.015271 },
// 		{ lat: 25.058686, lng: -5.805401 }
// 	],
//
//
// 	jacket: [ // the index which check what array it is
// 		{ lat: 53.717425, lng: 5.015271 },
// 		{ lat: 70.717425, lng: 23.015271 },
// 		{ lat: 45.717425, lng: 95.015271 },
// 		{ lat: 35.058686, lng: 5.805401 }
// 	]
// }
//
//
// // for (let i = 0; i < cloths_btn.length; i++) {
// // 	cloths_btn[i].addEventListener("click", getKey);
// // }
//
// // for (let i = 0; i < cloths_options.length; i++) {
// // 	cloths_options[i].addEventListener("click", toggleImgInfo);
// // }
//
//
//
// // sets the width of the container to resonsive to the width of the window
//
// function initMap() {
// 	let options = {
// 		center: new google.maps.LatLng(45,0),
// 		disableDefaultUI: true,
// 		scrollWheel: false,
// 		navigationControl: false,
// 		mapTypeControl: false,
// 		scaleControl: false,
// 		draggable: false,
// 		zoom: 1,
// 		styles: [
// 			{
// 				elementType: 'geometry',
// 				stylers: [{color: '#242f3e'}]
// 			},
// 			{
// 				elementType: 'labels.text.stroke',
// 				stylers: [{color: '#242f3e'}]
// 			},
// 			{
// 				elementType: 'labels.text.fill',
// 				stylers: [{color: '#746855'}]
// 			},
// 			{
// 				featureType: 'administrative.locality',
// 				elementType: 'labels.text.fill',
// 				stylers: [{color: '#e8491d'}]
// 			},
// 			{
// 				featureType: 'poi',
// 				elementType: 'labels.text.fill',
// 				stylers: [{color: '#e8491d'}]
// 			},
// 			{
// 				featureType: 'poi.park',
// 				elementType: 'geometry',
// 				stylers: [{color: '#263c3f'}]
// 			},
// 			{
// 				featureType: 'poi.park',
// 				elementType: 'labels.text.fill',
// 				stylers: [{color: '#e8491d'}]
// 			},
// 			{
// 				featureType: 'road',
// 				elementType: 'geometry',
// 				stylers: [{color: '#38414e'}]
// 			},
// 			{
// 				featureType: 'road',
// 				elementType: 'geometry.stroke',
// 				stylers: [{color: '#212a37'}]
// 			},
// 			{
// 				featureType: 'road',
// 				elementType: 'labels.text.fill',
// 				stylers: [{color: '#e8491d'}]
// 			},
// 			{
// 				featureType: 'road.highway',
// 				elementType: 'geometry',
// 				stylers: [{color: '#746855'}]
// 			},
// 			{
// 				featureType: 'road.highway',
// 				elementType: 'geometry.stroke',
// 				stylers: [{color: '#1f2835'}]
// 			},
// 			{
// 				featureType: 'road.highway',
// 				elementType: 'labels.text.fill',
// 				stylers: [{color: '#e8491d'}]
// 			},
// 			{
// 				featureType: 'transit',
// 				elementType: 'geometry',
// 				stylers: [{color: '#2f3948'}]
// 			},
// 			{
// 				featureType: 'transit.station',
// 				elementType: 'labels.text.fill',
// 				stylers: [{color: '#e8491d'}]
// 			},
// 			{
// 				featureType: 'water',
// 				elementType: 'geometry',
// 				stylers: [{color: '#17263c'}]
// 			},
// 			{
// 				featureType: 'water',
// 				elementType: 'labels.text.fill',
// 				stylers: [{color: '#e8491d'}]
// 			},
// 			{
// 				featureType: 'water',
// 				elementType: 'labels.text.stroke',
// 				stylers: [{color: '#e8491d'}]
// 			}
// 		]
// 	}
//
// 	map = new google.maps.Map(document.getElementById('map'), options); // creates the map with all the styling (options)
//
// 	icon = {
// 		url : "https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png",
// 		scaledSize: new google.maps.Size(100,100)
// 	}
// }
//
//
// function getKey() {
//
// 	clearMarkers(); // removes all current markers from the map
//
// 	if (lineDrawed) // clear line if drawn
// 	{
// 		clearLine();
// 	}
//
// 	key = this.className.split(' ')[1];
// 	count = 0;
//
// 	Object.keys(markerCord).forEach((obj) => {
// 		if (obj == key)
// 		{
// 			for (let i = 0; i < markerInfo.length; i++) {
// 				if (key == markerInfo[i][0])
// 				{
// 					dropMarkers(markerCord[obj], count, markerInfo[i]);
// 				}
// 			}
// 		}
// 	});
// }
//
// function dropMarkers(cordArray, count, inforArray){
// 	for (let i = 0; i < cordArray.length; i++) {
// 		addMarkers(cordArray[i], i * 300, i ,inforArray)
// 	}
// 	setTimeout(function(){
// 		drawLine(cordArray[0], cordArray[1], true, 1, 2, cordArray, count)
// 	}, cordArray.length * 400);
// }
//
// function addMarkers(position, time, i, inforArray) {
// 	window.setTimeout(function() {
// 		marker = new google.maps.Marker({
// 			position: position,
// 			map: map,
// 			icon: icon,
// 			animation:google.maps.Animation.DROP
// 		});
// 		markers.push(marker);
// 		info(marker, inforArray, i);
// 	}, time);
// }
//
//
// function info(marker, inforArray, i) {
// 	marker.addListener("click", function(){
// 		if (infoWindow)
// 		{
// 			infoWindow.close();
// 		}
// 		infoWindow = new google.maps.InfoWindow({
// 			content:inforArray[i + 1],
// 			maxWidth: 1000
// 		});
// 		infoWindow.open(map, marker);
// 	});
// }
//
//
// function drawLine(startlatLng,endLatLng,drawing, i, j, cordArray, count) {
// 	count++;
// 	if (drawing && count != cordArray.length)
// 	{
// 		drawing = false;
// 		let departure = new google.maps.LatLng(startlatLng);
// 		let arrival = new google.maps.LatLng(endLatLng);
// 		let line = new google.maps.Polyline({
// 			path: [departure, departure],
// 			strokeColor: "#FF0000",
// 			strokeOpacity: 1,
// 			strokeWeight: 10,
// 			geodesic: true,
// 			map: map,
// 		});
// 		lines.push(line);
// 		let interval = setInterval(function() {
// 			step += 1;
// 			if (step > numSteps) {
// 				step = 0;
// 				lineDrawed = true;
// 				drawing = true;
// 				clearInterval(interval);
// 				drawLine(cordArray[i], cordArray[j], drawing, i + 1, j + 1, cordArray, count);
// 			}
//
// 			else {
// 				let path = google.maps.geometry.spherical.interpolate(departure,arrival,step/numSteps);
// 				line.setPath([departure, path]);
// 			}
// 		}, 1);
// 	}
// 	else
// 	return;
// }
//
// function clearLine(){
// 	for (let i = 0; i < lines.length; i++) {
// 		lines[i].setMap(null);
// 	}
// }
//
//
// function setMapOnAll(map) {
// 	for (let i = 0; i < markers.length; i++) {
// 		markers[i].setMap(map);
// 	}
// }
//
// function clearMarkers()
// {
// 	setMapOnAll(null);
// }
