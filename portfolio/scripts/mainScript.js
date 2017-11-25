
"use strict";


const homeContentItems = document.getElementsByClassName('home-content');

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
			},100);
		})(classToAdd);
    }
}



const greetmsg = "Hello, my name is <b>Andreas Nordh</b> I am a soon to be fullstack developer.<br> Currentely a freshman year studen at <b> YRGO Gothenburg Sweden. </b><br> Feel free to take a look at my <b><a href='github.com/addenordh'> Github.</a></b> <br>Also you can take a contact me via <b>Nordh.Andreas@hotmail.com</b>.";
let number = 0;
const field = document.getElementById("greet-msg");

const typeWord = () => {
	let text = greetmsg.slice(0,++number);
	field.innerHTML = text;
	if (text != greetmsg) {
	  return setTimeout(typeWord, 15);
	}
}

setTimeout(typeWord, 400);

const menuIcon = document.getElementById('nav-icon');
const nav = document.getElementById('nav');
const navItems = nav.getElementsByClassName('nav-item');
console.log(navItems);

menuIcon.addEventListener("click", () => {
	if (!menuIcon.classList.contains("nav-toggled")) {
		menuIcon.classList.add("nav-toggled");
		nav.classList.add("active");
	}
	else {
		menuIcon.classList.remove("nav-toggled");
		nav.classList.remove("active");
	}
});

addClass(homeContentItems, 200, null, "slideUpp-FadeIn");
addClass(null, 300, menuIcon, "slideIn-f-rigth-fadeIn-2");
