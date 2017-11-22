
const storyIcons = document.getElementsByClassName("stories-svg-icon");
const firstSustainIcon = document.querySelector('.sustain-wrapper').querySelector(".svg-icon");
const slideContainer = document.getElementById('container');
const slideItem = document.getElementsByClassName('slide-item')[0];
const storyHeaders = ["The unique individual", "The unique product", "The unique origin"];
const storyHeader = document.getElementById('story-header');
const slideIndexes = {};
const headeSlideIndex = 0;

const slideItemIntoView = () => {
	let scTopOffset = slideContainer.getBoundingClientRect().top;
	if (scTopOffset < 650) {
		storyHeader.innerHTML = storyHeaders[headeSlideIndex];
		storyHeader.style.opacity = 1;
		storyIcons[headeSlideIndex].style.transform = "scale(1.1)";
		storyIcons[headeSlideIndex].style.fill = "#BD9B5B";
		slideItem.style.left = "0%";
		slideContainer.style.left = "0%";
		window.removeEventListener('scroll', slideItemIntoView);
	}
}

window.addEventListener("scroll", slideItemIntoView);

firstSustainIcon.style.fill = "#BD9B5B";
firstSustainIcon.style.transform = "scale(1.1)";

const storySlide = (direction, items, slideIndex, indexKey, icons, length) => {
	switch (direction) {
		case "left":
			if (slideIndex[indexKey] === 0) return false;
			items[slideIndex[indexKey]].style.left = "100%";
			icons[slideIndex[indexKey]].style.fill = "";
			icons[slideIndex[indexKey]].style.transform = "scale(1)";
			slideIndex[indexKey]--;
			storyHeader.style.opacity = 0;
			setTimeout(() => {
				storyHeader.innerHTML = storyHeaders[slideIndex["slide-item"]];
				storyHeader.style.opacity = 1;
			},200);
			items[slideIndex[indexKey]].style.left = "0%";
			icons[slideIndex[indexKey]].style.fill = "#BD9B5B";
			icons[slideIndex[indexKey]].style.transform = "scale(1.25)";
		break;
		case "right":
			if (slideIndex[indexKey] === length) return false;
			items[slideIndex[indexKey]].style.left = "-100%";
			icons[slideIndex[indexKey]].style.fill = "";
			icons[slideIndex[indexKey]].style.transform = "scale(1)";
			slideIndex[indexKey]++;
			if (slideIndex[indexKey] === length && !map) {
				initMap();
			}
			storyHeader.style.opacity = 0;
			setTimeout(() => {
				storyHeader.innerHTML = storyHeaders[slideIndex["slide-item"]];
				storyHeader.style.opacity = 1;
			},200);
			items[slideIndex[indexKey]].style.left = "0%";
			icons[slideIndex[indexKey]].style.fill = "#BD9B5B";
			icons[slideIndex[indexKey]].style.transform = "scale(1.25)";
			break;
	}
}

const containers = document.getElementsByClassName('slideContainer');

for (container of containers) {
	let arrows = container.parentNode.querySelectorAll(".arrow");
	let slideItems = container.querySelectorAll(".slide-div");
	let icons = container.parentNode.querySelectorAll(".svg-icon");
	let key = slideItems[0].classList[0];
	slideIndexes[key] = 0;
	let maxLength = slideItems.length - 1;
	for (arrow of arrows) {
		let dir = null;
		arrow.classList.forEach((item) => {
			dir = item.split("_")[1];
		});
		arrow.addEventListener("click", () => {
			storySlide(dir, slideItems, slideIndexes, key, icons, maxLength);
		});
	}
}


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

	const icons = [
		document.getElementsByClassName('stories-svg-icon'),
		document.getElementsByClassName('sustain-svg-icon'),
	];

for (container of containers) {
	if (container.classList.contains('circle-slide-container') | container.classList.contains('carousel-slide-container')) {
	}
	else {
		let icons = container.parentNode.querySelectorAll('.svg-icon');
		let slideItems = container.parentNode.querySelectorAll('.slide-div');
		let key = slideItems[0].classList[0];
		for (let i = 0; i < icons.length - 1; i++) {
			let clickIndex = i;
			let icon = icons[i];
			icon.addEventListener("click", () => {
				clickSlide(slideItems, icons, slideIndexes)
			});
		}

	}
}

// for (container of containers) {
// 	let arrows = container.parentNode.querySelectorAll(".arrow");
// 	let slideItems = container.querySelectorAll(".slide-div");
// 	let icons = container.parentNode.querySelectorAll(".svg-icon");
// 	let key = slideItems[0].classList[0];
// 	slideIndexes[key] = 0;
// 	let maxLength = slideItems.length - 1;
// 	for (arrow of arrows) {
// 		let dir = null;
// 		arrow.classList.forEach((item) => {
// 			dir = item.split("_")[1];
// 		});
// 		arrow.addEventListener("click", () => {
// 			storySlide(dir, slideItems, slideIndexes, key, icons, maxLength);
// 		});
// 	}
// }
