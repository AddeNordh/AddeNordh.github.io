// Script for display navbar after scrolling

function navScroll() {
	const navbar = document.querySelector('.navbar');
	const logoButton = document.querySelector('.logoButton');
	const hamburger = document.querySelector('.hamburger');
	if(window.pageYOffset > 100) {
		// navbar.classList.add('navbarShow');
		// logoButton.classList.add('navbarShow');
		logoButton.style.opacity = 1;
		navbar.style.opacity= 1;
	}
	else {
		logoButton.style.opacity = 0;
		navbar.style.opacity= 0;
	}
}
window.onscroll = navScroll;


// Function for displaying sidepanel on click
"use strict";


function myFunction() {
    var x = document.getElementById("sidebar");
    if (!x.style.display || x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

// script for the first slider

const slideContainer = document.getElementById('container');
const slideItem = document.getElementsByClassName('slide-item')[0];

const slideItemIntoView = () => {

    let scTopOffset = slideContainer.getBoundingClientRect().top;
    if (scTopOffset < 550) {
        slideItem.classList.add('active');
        imgsOpt[headeSlideIndex].style.transform = "scale(1.1)";
        imgsOpt[headeSlideIndex].style.fill = "#BD9B5B";
        window.removeEventListener('scroll', slideItemIntoView);
    }
}

window.addEventListener("scroll", slideItemIntoView);


// // HEADER SWIPE SLIDE STARTS //

// const imgs = document.getElementsByClassName('slide-item');
const imgsOpt = document.getElementsByClassName('stories-svg-icon');
let headeSlideIndex = 0;


// Refactored Code START //


const slideContainers = document.getElementsByClassName('slideContainer');
const icons = [
    document.getElementsByClassName('stories-svg-icon '),
    document.getElementsByClassName('sustain-svg-icon')
];
const slideIndexes = {};
let slide = false;
let startNode;

for (let i = 1; i < icons.length; i++) {
    icons[i][0].style.fill = "#BD9B5B";
}

/**
*
* @param event      # The event that occours i.e "touchmove".
* @param slideItem  # An array with all the divs that the user is currentely swiping.
* @param startnode  # The x-cordinate of the initial touch.
* @param slideicons # An array with all the icons associated with the current slider.
* @param slideIndex # An object with indexes of all the different sliders
*                   # To keep track of the index depending on what slide the user is sliding.
* @param key        # The key to the object mentioned above.
*
*/
const SwipeSlide = (event, slideItem, startNode, slideIcons, slideIndex, key) => {
    for (let i = 0; i < event.changedTouches.length; i++) {
        // If an swipe move has occured, all the next moves wont be executed
        // The user has to make another swipe to execute the script again.
		if (slide) {
			return false;
		}
        // User swipes the image to the right.
		if (event.changedTouches[i].pageX > startNode && slideIndex[key] != 0) {
            // Sets "slide" to "true" to make the if statment above return true
			slide = true;
            /**
            * @var slideItem[slideIndex[key]]  # Is the div that swipes.
            * @var slideIcons[slideIndex[key]] # The icon associated with the current div.
            */
            slideItem[slideIndex[key]].style.left = "100%";
            slideIcons[slideIndex[key]].style.transform = "scale(1)";
            slideIcons[slideIndex[key]].style.fill = "";
            slideIndex[key]--;
            slideItem[slideIndex[key]].style.left = "0";
            slideIcons[slideIndex[key]].style.transform = "scale(1.3)";
            slideIcons[slideIndex[key]].style.fill = "#BD9B5B";
			return false;
		}
        // User swipes the image to the left.
		else if (event.changedTouches[i].pageX < startNode && slideIndex[key] != slideItem.length - 1) {
			slide = true;
            slideItem[slideIndex[key]].style.left = "-100%";
            slideIcons[slideIndex[key]].style.transform = "scale(1)";
            slideIcons[slideIndex[key]].style.fill = "";
            // Check is the user is swiping on the slider containing the google map.
            if (slideItem[0].classList[0] == "slide-item" && slideIndex[key] == 1 && !map) {
                initMap();
            }
            slideIndex[key]++;
            slideItem[slideIndex[key]].style.left = "0";
            slideIcons[slideIndex[key]].style.transform = "scale(1.3)";
            slideIcons[slideIndex[key]].style.fill = "#BD9B5B";
			return false;
		}
    }
}
// Adds all the event listeners to all slider containers "slideContainers".
for (let i = 0; i < slideContainers.length; i++) {
    slideContainers[i].addEventListener("touchstart", (e) => {
    	startNode = e.touches[0].pageX;
        // Sets slide to false when the user touches the slider.
    	if (slide) slide = false;
    });

        // Selects all the divs in the slide container.
        let slideItems = slideContainers[i].querySelectorAll(".slide-div");

        // Gets the first class of the current div that is being looped through.
        let slideIndexKey = slideItems[0].classList[0];

        // Adds the start index for the slide that is currentely being looped through
        slideIndexes[slideIndexKey] = 0;

    slideContainers[i].addEventListener("touchmove", () => {
        SwipeSlide(event, slideItems, startNode, icons[i], slideIndexes, slideIndexKey);
    });
}






// Refactored Code ENDS //






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


function initMap() {
	const options = {
		center: new google.maps.LatLng(45,0),
		disableDefaultUI: true,
		scrollWheel: false,
		navigationControl: false,
		mapTypeControl: false,
		scaleControl: false,
		draggable: false,
		zoom: 1,
		styles: [
			{
				elementType: 'geometry',
				stylers: [{color: '#242f3e'}]
			},
			{
				elementType: 'labels.text.stroke',
				stylers: [{color: '#242f3e'}]
			},
			{
				elementType: 'labels.text.fill',
				stylers: [{color: '#746855'}]
			},
			{
				featureType: 'administrative.locality',
				elementType: 'labels.text.fill',
				stylers: [{color: '#e8491d'}]
			},
			{
				featureType: 'poi',
				elementType: 'labels.text.fill',
				stylers: [{color: '#e8491d'}]
			},
			{
				featureType: 'poi.park',
				elementType: 'geometry',
				stylers: [{color: '#263c3f'}]
			},
			{
				featureType: 'poi.park',
				elementType: 'labels.text.fill',
				stylers: [{color: '#e8491d'}]
			},
			{
				featureType: 'road',
				elementType: 'geometry',
				stylers: [{color: '#38414e'}]
			},
			{
				featureType: 'road',
				elementType: 'geometry.stroke',
				stylers: [{color: '#212a37'}]
			},
			{
				featureType: 'road',
				elementType: 'labels.text.fill',
				stylers: [{color: '#e8491d'}]
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
				stylers: [{color: '#e8491d'}]
			},
			{
				featureType: 'transit',
				elementType: 'geometry',
				stylers: [{color: '#2f3948'}]
			},
			{
				featureType: 'transit.station',
				elementType: 'labels.text.fill',
				stylers: [{color: '#e8491d'}]
			},
			{
				featureType: 'water',
				elementType: 'geometry',
				stylers: [{color: '#17263c'}]
			},
			{
				featureType: 'water',
				elementType: 'labels.text.fill',
				stylers: [{color: '#e8491d'}]
			},
			{
				featureType: 'water',
				elementType: 'labels.text.stroke',
				stylers: [{color: '#e8491d'}]
			}
		]
	}

	map = new google.maps.Map(document.getElementById('map'), options); // creates the map with all the styling (options)

	const icon = {
		url : "https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png",
		scaledSize: new google.maps.Size(40,40)
	}

    dropMarkers(markerCord.jacket, count, markerInfo);

    function dropMarkers(cordArray, count, inforArray){
    	for (let i = 0; i < cordArray.length; i++) {
    		addMarkers(cordArray[i], i * 300, i ,inforArray)
    	}
    	setTimeout(function(){
    		drawLine(cordArray[0], cordArray[1], true, 1, 2, cordArray, 0)
    	}, cordArray.length * 400);
    }

    function addMarkers(position, time, i, inforArray) {
    	window.setTimeout(function() {
    		marker = new google.maps.Marker({
    			position: position,
    			map: map,
    			icon: icon,
    			animation:google.maps.Animation.DROP
    		});
    		markers.push(marker);
    		info(marker, inforArray, i);
    	}, time);
    }


    function info(marker, inforArray, i) {
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
    			strokeColor: "#FF0000",
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
    	return;
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





// slideContainer.addEventListener("touchstart", (e) => {
// 	startNode = e.touches[0].pageX;
// 	if (slide) slide = false;
// });
//
//
//
// const headSwipeSlide = (e) => {
//     for (let i = 0; i < e.changedTouches.length; i++) {
// 		if (slide) {
// 			return false;
// 		}
//         // swipe to right
// 		if (e.changedTouches[i].pageX > startNode && headeSlideIndex != 0) {
// 			slide = true;
//             imgs[headeSlideIndex].style.left = "100%";
//             imgsOpt[headeSlideIndex].style.transform = "scale(1)";
//             imgsOpt[headeSlideIndex].style.fill = "";
//             headeSlideIndex--;
//             imgs[headeSlideIndex].style.left = "0";
//             imgsOpt[headeSlideIndex].style.transform = "scale(1.1)";
//             imgsOpt[headeSlideIndex].style.fill = "#BD9B5B";
// 			return false;
// 		}
//         //swipe to left
// 		else if (e.changedTouches[i].pageX < startNode && headeSlideIndex != imgs.length - 1) {
// 			slide = true;
//             imgs[headeSlideIndex].style.left = "-100%";
//             imgsOpt[headeSlideIndex].style.transform = "scale(1)";
//             imgsOpt[headeSlideIndex].style.fill = "";
//             headeSlideIndex++;
//             if (headeSlideIndex == imgs.length - 1 && !map) {
//                 initMap();
//             }
//             imgs[headeSlideIndex].style.left = "0";
//             imgsOpt[headeSlideIndex].style.transform = "scale(1.3)";
//             imgsOpt[headeSlideIndex].style.fill = "#BD9B5B";
// 			return false;
// 		}
//     }
// }
//
// slideContainer.addEventListener("touchmove",headSwipeSlide);
// HEADER SWIPE SLIDE ENDS //


// CRICLE SWIPE SLIDE STARTS //
// let circleSlideStartNode;
// let circleSlideIndex = 0;
// const circleSlideItems = document.getElementsByClassName('part5-textBox');
// const CircleSlideContainer = document.getElementById('circle-slide-container');
// const CircleSlideOpts = document.getElementsByClassName('slider-opt')

// CRICLE SWIPE SLIDE ENDS //
