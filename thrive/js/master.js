"use strict";

const scripts = {
	desktop : ['js/desktopScript/map.js', 'js/desktopScript/slide.js'],
	mobile : ["js/mobileScript/mobileMap.js", "js/mobileScript/mobileSlide.js"]
}

if (window.matchMedia("(max-width: 768px)").matches) {
  for (let i = 0; i < scripts.mobile.length; i++) {
	  let scriptEle = document.createElement("script");
	  scriptEle.setAttribute("src", scripts.mobile[i]);
	  document.body.appendChild(scriptEle);
	  scriptEle = null;
  }
}
else {
	for (let i = 0; i < scripts.desktop.length; i++) {
		let scriptEle = document.createElement("script");
		scriptEle.setAttribute("src", scripts.desktop[i]);
		document.body.appendChild(scriptEle);
		scriptEle = null;
	}
}

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
window.onscroll=navScroll;


// hamburger.style.opacity = 1;

// Function for displaying sidepanel on click


function myFunction() {
	var x = document.getElementById("sidebar");
	if (!x.style.opacity || x.style.opacity === "0") {
		x.style.opacity = ".85";
		x.style.zIndex = "20";
	} else {
		x.style.opacity = "0";
		x.style.zIndex = "-10";
	}
}
