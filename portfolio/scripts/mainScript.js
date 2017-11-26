
"use strict";
let sectionContent;
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const pages = document.getElementsByTagName('main');
let pageIndex = 0;
const homeContentItems = document.getElementsByClassName('home-content');
const greetmsg = "Hello, I'm <b>Andreas Nordh</b> and I am a soon to be fullstack developer.<br> Currently a freshman year student at <b> YRGO Gothenburg Sweden. </b><br> Feel free to take a look at my <b><a href='https://github.com/addenordh' target='_blank'> Github</a></b> to view some of my work <br>Also you can take a contact me via <b>Nordh.Andreas@hotmail.com</b><span class='__dot'>.</span>";
let number = 0;
const field = document.getElementById("greet-msg");
const menuIcon = document.getElementById('nav-icon');
const nav = document.getElementById('nav');
const navItems = nav.getElementsByClassName('nav-item');



const addClass = (elementsArray, delay, element, classToAdd) => {
    if (elementsArray) {
        for (var i = 0; i < elementsArray.length; i++) {
        ((i) => {
            setTimeout(() => {
                    elementsArray[i].classList.add(classToAdd);
            }, (i / 2 + 1) * delay);
        })(i);
        }
    }
    if (element) {
		((classToAdd) => {
			setTimeout(() => {
				element.classList.add(classToAdd);
			},delay);
		})(classToAdd);
    }
}

const removeClass = (elementsArray, element, delay, classToRemove) => {
    if (elementsArray) {
        for (var i = 0; i < elementsArray.length; i++) {
        ((i) => {
            setTimeout(() => {
                    elementsArray[i].classList.remove(classToRemove);
            }, (i / 2 + 1) * delay);
        })(i);
        }
    }
    if (element) {
		((classToRemove) => {
			setTimeout(() => {
				element.classList.remove(classToRemove);
			},delay);
		})(classToRemove);
    }
}


const typeWord = (word, delay) => {
	let text = greetmsg.slice(0,++number);
	field.innerHTML = text;
	if (text != greetmsg) {
	  return setTimeout(() => {
		  typeWord(word, delay);
	  }, delay);
	}
}

menuIcon.addEventListener("click", () => {
	if (!menuIcon.classList.contains("nav-toggled")) {
		menuIcon.classList.add("nav-toggled");
		nav.classList.add("active");
		addClass(navItems, 125, null, "li-active");
	}
	else {
		menuIcon.classList.remove("nav-toggled");
		nav.classList.remove("active");
		removeClass(navItems, null, 200, "li-active");
	}
});

const arrowLines = document.getElementsByClassName('line');
setTimeout(() => {
	addClass(arrowLines, 200, null, "active");
},1000);

const getContent = (section) => {
	let sectionContent = [];
	let contentClasses = [];
	let sectionItems = section.querySelectorAll("* div");
	for (let item of sectionItems) {
		let classes = Array.from(item.classList);
		classes.forEach((c) => {
			if (c === "su-fi" || c === "si-f-r") {
				sectionContent.push(item);
				contentClasses.push(c);
			}
		});
	}
	return {
		section : section,
		items : sectionContent,
		classes : contentClasses
	}
}


next.addEventListener("click", () => {
	let item = null;
	let Class = null;
	let cta = null;
	let section = pages[pageIndex];
	let content = getContent(section);
	for (let i = 0; i < content.items.length; i++) {
		item = content.items[i];
		Class = content.classes[i];
		cta = null;
		if (Class === "su-fi") {
			cta = "slideUpp-FadeIn";
		}
		if (Class === "si-f-r") {
			cta = "slideIn-f-right"
		}
		console.log(item, Class);
		removeClass(null, item, 200, cta);
	}

	removeClass(null, section, 700, "active");
	addClass(null, 700, section, "prev");
	let nextSection = pages[++pageIndex];
	removeClass(null, nextSection, 700, "next");
	addClass(null, 700, nextSection, "active");

	let nextContent = getContent(nextSection);



});


addClass(homeContentItems, 300, null, "slideUpp-FadeIn");
addClass(null, 300, menuIcon, "slideIn-f-rigth-fadeIn-2");
setTimeout(() => {
	typeWord(greetmsg,15);
},1100);

getContent(pages[pageIndex]);
