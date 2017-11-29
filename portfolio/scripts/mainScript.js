
"use strict";
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const pages = Array.from(document.querySelectorAll('.content'));
let pageIndex = 0;
const homeContentItems = document.getElementsByClassName('home-content');
const greetmsg = ["Hello, I'm <b>Andreas Nordh</b> and I am a soon to be fullstack developer.", "Currently a freshman year student at <b>YRGO Gothenburg Sweden. </b><br>", "Feel free to take a look at my <b><a href='https://github.com/addenordh' target='_blank'> Github</a></b> to view some of my work <br>","Also you can take a contact me via <b>Nordh.Andreas@hotmail.com</b><span class='__dot'>.</span>"];
const contactmsg = ""
const fields = Array.from(document.getElementsByClassName('greet-msg'));
const menuIcon = document.getElementById('nav-icon');
const nav = document.getElementById('nav');
const navItems = nav.getElementsByClassName('nav-item');
const navBars = document.getElementsByClassName('nav-bar');
const workItems = document.getElementsByClassName('work-item');
const rightArrow = document.getElementsByClassName('right-line');
const leftArrow = document.getElementsByClassName('left-line');
const loader = document.getElementsByClassName('load');
const inputs = document.getElementsByClassName('contact-input');
let init = true;

next.addEventListener("click", () => {
	let current = pages[pageIndex];
	let next = pages[pageIndex + 1];
	current.clearContent(current, "active");
	current.switch(current, next, "active", "prev", "next", "active", 2500);
	pageIndex++;
});

for (let input of inputs) {
	input.addEventListener("keyup", (event) => {
		if (input.value !== "") {
			input.classList.add("has-content");
		}
		else {
			input.classList.remove("has-content");
		}
	});
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



for (let i = 0; i < pages.length; i++) {
	pages[i] = new section(pages[i], i);
}

setTimeout(() => {
	let sentace = new typeWord(greetmsg, 15, fields);
	sentace.type(greetmsg[0],fields[0], 15);
},1200);

pages[pageIndex].addContent(pages[pageIndex], "active", false, 300, 1000);
