// Script for display navbar after scrolling



// script for the first slider

const slideContainer = document.getElementById('container');
const slideItem = document.getElementsByClassName('slide-item')[0];
const imgsOpt = document.getElementsByClassName('stories-svg-icon');
const storyHeaders = ["The unique individual", "The unique product", "The unique origin"];
let headeSlideIndex = 0;


const slideItemIntoView = () => {
	let scTopOffset = slideContainer.getBoundingClientRect().top;
	if (scTopOffset < 550) {
		document.getElementById('story-header').innerHTML = storyHeaders[0];
		document.getElementById('story-header').style.opacity = 1;
		slideItem.classList.add('active');
		imgsOpt[headeSlideIndex].style.transform = "scale(1.1)";
		imgsOpt[headeSlideIndex].style.fill = "#BD9B5B";
		slideContainer.style.left = "0%";
		window.removeEventListener('scroll', slideItemIntoView);
	}
}

window.addEventListener("scroll", slideItemIntoView);

// Refactored Code START //


const slideContainers = document.getElementsByClassName('slideContainer');
const icons = [
	document.getElementsByClassName('stories-svg-icon'),
	document.getElementsByClassName('sustain-svg-icon'),
	document.getElementsByClassName('circle-svg-icon')
];


const slideIndexes = {};
let slide = false;
let startNode;
// sets all the first icons in the slides to "active" excepts the first one.
for (let i = 1; i < icons.length; i++) {
	icons[i][0].style.fill = "#BD9B5B";
	icons[i][0].style.transform = "scale(1.25)";
}

/**
* @func SwipeSlide # The function for switching image in slide by swiping on an item associated with that slide
*
* @param event      # The event that occours i.e "touchmove".
* @param slideItem  # An array with all the divs that the user is currentely swiping.
* @param startnode  # The x-cordinate of the initial touch.
* @param slideicons # An array with all the icons associated with the current slider.
* @param slideIndex # An object with indexes of all the different sliders
*                   - To keep track of the index depending on what slide the user is sliding.
* @param key        # The key to the object mentioned above.
*
*/

const SwipeSlide = (event, slideItem, startNode, slideIcons, slideIndex, key, animateWidth, animateStop) => {
	let touches = event.changedTouches[0];
	// If an swipe move has occured, all the next moves wont be executed
	// The user has to make another swipe to execute the script again.
	if (slide) {
		return false;
	}
	// checks if the slide has icons attached to it, if not, skip all lines of code including icon changing.
	let slideHasIcons = (slideIcons && slideIndex) ? true : false;
	let storyHeader = slideItem[0].parentNode.parentNode.querySelector("#story-header");
	// User swipes the image to the right.
	if (touches.pageX > (startNode + 100) && slideIndex[key] != 0 || !startNode) {
		// Sets "slide" to "true" to make the if statment above return true
		slide = true;
		/**
		* @var slideItem[slideIndex[key]]  # Is the div that swipes.
		* @var slideIcons[slideIndex[key]] # The icon associated with the current div.
		*/
		slideItem[slideIndex[key]].style.left =  animateWidth + "%";
		if (slideHasIcons) slideIcons[slideIndex[key]].style.transform = "scale(1)";
		if (slideHasIcons) slideIcons[slideIndex[key]].style.fill = "";
		slideIndex[key]--;
		slideItem[slideIndex[key]].style.left = "0%";
		if (slideHasIcons) slideIcons[slideIndex[key]].style.transform = "scale(1.25)";
		if (slideHasIcons) slideIcons[slideIndex[key]].style.fill = "#BD9B5B";
		if (storyHeader) {
			storyHeader.style.opacity = 0;
			setTimeout(() => {
				storyHeader.innerHTML = storyHeaders[slideIndex[key]];
				storyHeader.style.opacity = 1;
			},300);
		}
		return false;
	}
	// User swipes the image to the left.
	else if (touches.pageX < (startNode - 100) && slideIndex[key] != slideItem.length - 1) {
		slide = true;
		slideItem[slideIndex[key]].style.left = "-" + animateWidth + "%";
		if (slideHasIcons) slideIcons[slideIndex[key]].style.transform = "scale(1)";
		if (slideHasIcons) slideIcons[slideIndex[key]].style.fill = "";
		// Check is the user is swiping on the slider containing the google map and reaches that div.
		if (slideItem[0].classList[0] == "slide-item" && slideIndex[key] == 1 && !map) {
			initMap();
		}
		slideIndex[key]++;
		slideItem[slideIndex[key]].style.left =   "0%";
		if (slideHasIcons) slideIcons[slideIndex[key]].style.transform = "scale(1.25)";
		if (slideHasIcons) slideIcons[slideIndex[key]].style.fill = "#BD9B5B";
		if (storyHeader) {
			storyHeader.style.opacity = 0;
			setTimeout(() => {
				storyHeader.innerHTML = storyHeaders[slideIndex[key]];
				storyHeader.style.opacity = 1;
			},300);
		}
		return false;
	}
}


const carouselSwipe = (event, slideItems, startNode, index, indexKey, animateValue) => {
	let touches = event.changedTouches[0];
	if (slide) return false;
	let slideCount = 1;
	if (index[indexKey] === slideItems.length - 2 || index[indexKey] === 1)
	{
		slideCount = 0;
	}
	if (touches.pageX < (startNode - 100) && index[indexKey] < slideItems.length - 1) {
		slide = true;
		slideItems[index[indexKey]].style.left = "-" + animateValue + "%";
		index[indexKey]++;
		slideItems[index[indexKey] + slideCount].style.left =  animateValue + "%";
		slideItems[index[indexKey]].style.left = "0%";
	}
	if (touches.pageX > (startNode + 100) && index[indexKey] != 0) {
		slide = true;
		slideItems[index[indexKey]].style.left = animateValue + "%";
		index[indexKey]--;
		slideItems[index[indexKey] - slideCount].style.left = "-100%";
		slideItems[index[indexKey]].style.left =  "0%";
	}
}

// Adds all the event listeners to all slider containers "slideContainers".

const iconClickSlideInfo = {};

const prepareSlide = () => {
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

		let leftStyle = window.getComputedStyle(slideItems[1],null).getPropertyValue("left");

		let animateWidth = (parseInt(leftStyle) / window.innerWidth) * 100;
		let animateStop =  100 - animateWidth;

		slideContainers[i].addEventListener("touchmove", (event) => {
			if (slideContainers[i].classList.contains("carousel-slide-container")) {
				return carouselSwipe(event, slideItems, startNode, slideIndexes, slideIndexKey, animateWidth);
			}
			return SwipeSlide(event, slideItems, startNode, icons[i], slideIndexes, slideIndexKey, animateWidth, animateStop);
		});
		if (icons[i]) {
			iconClickSlideInfo[slideIndexKey] = {
				items	 : slideItems,
				icons	 : icons[i],
				index    : slideIndexes,
				key      : slideIndexKey
			}
		}
	}
	return iconClickSlideInfo;
}

/**
* @func clickSlide  # The function for switching image in slide by clicking on an icon associated with that slide
*
* @param slideItems  # An array with all the divs in the slide that the user is currentely using
* @param icons 		 # An array with all the icons associated with the current slider.
* @param slideIndex  # An object with indexes of all the different sliders
*                    - To keep track of the index depending on what slide the user is sliding.
* @param index		 # An object with all the indexes for the all the different slides
* @param key         # The key to the object mentioned above to keep track of which slide is being used
*
*/
const clickSlide = (slideItems, icons, index, key, clickIndex) => {
	let storyHeader = document.getElementById("story-header");

	// if the clicked index is higher than the current index of the slide, switch to next slide
	if (clickIndex > index[key] && clickIndex < slideItems.length) {
		// loop through all slides until it reaches the clicked index
			slideItems[index[key]].style.left = "-100%";
			icons[index[key]].style.fill = "";
			icons[index[key]].style.transform = "scale(1)";
			index[key]++;
			// initialzes map if it already hasn´t been initialized
			if (slideItems[0].classList[0] == "slide-item" && index[key] == 1 && !map) {
				initMap();
			}
			if (storyHeader) {
				storyHeader.innerHTML = storyHeaders[index[key]];
			}
			slideItems[index[key]].style.left = "0%";
			icons[index[key]].style.fill = "#BD9B5B";
			icons[index[key]].style.transform = "scale(1.25)";
			return setTimeout(() => {
				clickSlide(slideItems, icons, index, key, clickIndex);
			},150);
		}

	// if the index is lower than the current index of the slide, swith to previous slide
	else if (clickIndex < index[key]) {
		// loop through all slides until it reaches the clicked index
			slideItems[index[key]].style.left = "100%";
			icons[index[key]].style.fill = "";
			icons[index[key]].style.transform = "scale(1)";
			index[key]--;
			if (storyHeader) {
				storyHeader.innerHTML = storyHeaders[index[key]];
			}
			slideItems[index[key]].style.left = "0%";
			icons[index[key]].style.fill = "#BD9B5B";
			icons[index[key]].style.transform = "scale(1.25)";
			return setTimeout(() => {
				clickSlide(slideItems, icons, index, key, clickIndex);
			},150);
		}
	}

/** Retrvieves an object from @func prepareSlide() with all the needed information from all slided with icons attached to it */
const clickSlideInfo = prepareSlide();
// Loop through the object

for (let item in clickSlideInfo) {
	let key = item;
	// Gets all icons from all the objects that exists is parent object retrived to be able to loop through all of them.
	let slideIcon = clickSlideInfo[key].icons;
	for (let i = 0; i < slideIcon.length; i++) {
		// Gets the current object and extract information from it.
		let slideInfo = clickSlideInfo[key];
		let items = slideInfo.items;
		let icons = slideInfo.icons;
		let index = slideInfo.index;
		// Loops through all icons in the current object and adds a click event to it
		for (let j = 0; j < slideIcon.length; j++) {
			let icon = slideIcon[j];
			icon.addEventListener("click", () => {
				clickSlide(items, icons, index, key, j);
			});
		}
		// Breakes to prevent reapeats of already looped icons
		break;
	}
}


const ArrowSlide = (items, dir, indexes, key, icons) => {
	let slideHasIcons = (icons[0]) ? true : false;
	let nextItemExists = true;

	if (indexes[key] === items.length - 2 && dir === "right" ||
	 	indexes[key] === 0 && dir === "left" 				 ||
		indexes[key] === items.length - 1 && dir === "left"  ||
		indexes[key] === 0) {
		nextItemExists = false;
	}
	switch (dir) {
		case 'left':
			if (indexes[key] === 0) return false;
			items[indexes[key]].style.left = "80%";
			if (slideHasIcons) icons[indexes[key]].style.transform = "scale(1)";
			if (slideHasIcons) icons[indexes[key]].style.fill = "";
			if (nextItemExists) items[indexes[key] + 1].style.left = "100%";
			indexes[key]--;
			items[indexes[key]].style.left = "0%";
			if (nextItemExists) items[indexes[key] - 1].style.left = "-80%";
			if (slideHasIcons) icons[indexes[key]].style.transform = "scale(1.25)";
			if (slideHasIcons) icons[indexes[key]].style.fill = "#BD9B5B";
			break;
		case 'right':
			if (indexes[key] === items.length - 1) return false;
			items[indexes[key]].style.left = "-80%";
			if (slideHasIcons) icons[indexes[key]].style.transform = "scale(1)";
			if (slideHasIcons) icons[indexes[key]].style.fill = "";
			if (nextItemExists) items[indexes[key] - 1].style.left = "-100%";
			indexes[key]++;
			if (nextItemExists) items[indexes[key] + 1].style.left = "80%";
			items[indexes[key]].style.left = "0%";
			if (slideHasIcons) icons[indexes[key]].style.transform = "scale(1.25)";
			if (slideHasIcons) icons[indexes[key]].style.fill = "#BD9B5B";
			break;
	}
}


const slideArrows = document.getElementsByClassName('slide-arrow');
const clickIndexes = {};
for (arrow of slideArrows) {
	let parentContainer = arrow.parentNode;
	let items = parentContainer.querySelectorAll('.slide-div');
	let key = items[0].classList[0];
	let icons = parentContainer.parentNode.querySelectorAll('.svg-icon');
	let dir = arrow.classList[1];
	arrow.addEventListener("click", () => {
			ArrowSlide(items, dir, slideIndexes, key, icons);
	});
}
