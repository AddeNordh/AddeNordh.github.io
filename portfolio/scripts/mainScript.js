
"use strict";
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const pages = document.getElementsByTagName('main');
let pageIndex = 0;
const homeContentItems = document.getElementsByClassName('home-content');
const greetmsg = ["Hello, I'm <b>Andreas Nordh</b> and I am a soon to be fullstack developer.", "Currently a freshman year student at <b>YRGO Gothenburg Sweden. </b><br>", "Feel free to take a look at my <a href='https://github.com/addenordh' target='_blank'> Github</a></b> to view some of my work <br>","Also you can take a contact me via <b>Nordh.Andreas@hotmail.com</b><span class='__dot'>.</span>"];
let number = 0;
const fields = Array.from(document.getElementsByClassName('greet-msg'));
const menuIcon = document.getElementById('nav-icon');
const nav = document.getElementById('nav');
const navItems = nav.getElementsByClassName('nav-item');
const navBars = document.getElementsByClassName('nav-bar');
const workItems = document.getElementsByClassName('work-item');


const addClass = (elementsArray, delay, element, classToAdd, mult) => {
	mult = mult || 1;
	delay = delay || 100;
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
			},delay * mult);
		})(classToAdd);
    }
}

const removeClass = (elementsArray, element, delay, classToRemove, mult) => {
	mult = mult || 1;
	delay = delay || 100;
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
			},delay * mult);
		})(classToRemove);
    }
}

function typeWord(msg, delay, fields) {
	this.msg = msg;
	this.delay = delay;
	this.count = 0;
	this.index = 0;
	this.field = fields[this.index];
	this.sentance = this.msg[this.index];
	this.type = function(text, field, delay) {
		this.text = this.sentance.slice(0, this.count++);
		this.field.innerHTML = this.text;
		if (this.text != this.sentance) {
			return setTimeout(() => {
				this.type(text, field, 25);
			}, delay);
		}
		else {
			this.count = 0;
			this.index++;
			this.field = fields[this.index];
			this.sentance = this.msg[this.index];
			this.type(this.sentance, this.field, 25);
		}
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

const rightArrow = document.getElementsByClassName('right-line');
setTimeout(() => {
	addClass(navBars, 150, null, "active");
	addClass(rightArrow, 200, null, "active");
	let sentace = new typeWord(greetmsg, 15, fields);
	sentace.type(greetmsg[0],fields[0], 25);
},1000);



next.addEventListener("click", () => {
});


addClass(homeContentItems, 300, null, "active");
addClass(null, 300, menuIcon, "active");


for (let workItem of workItems) {
	workItem.addEventListener("mouseover", () => {
		let img = workItem.querySelector("img");
		let src = img.src;
		let itemInfo = workItem.querySelector(".work-item-info");
		itemInfo.style.background = "url(" + src + ")";
		itemInfo.style.backgroundSize = "cover";
	});
}
