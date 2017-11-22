
"use strict";

const mainNavItem = document.getElementsByClassName('nav-item-icon');

for (let i = 0; i < mainNavItem.length; i++) {
    setTimeout(function() {
        navItemSlide(i);
    });
}

const navItemSlide = (itemIndex) => {
    mainNavItem[itemIndex].style.left = 0;
}


const homeContentItems = document.getElementsByClassName('home-content');

const slideUppFadeIn = (elementsArray, delay, element) => {
    if (elementsArray) {
        for (var i = 0; i < elementsArray.length; i++) {
        ((i) => {
            setTimeout(() => {
                    elementsArray[i].classList.add("slideUpp-FadeIn");
            }, (i / 2 + 1) * delay);
        })(i);
        }
    }
    if (element) {

    }
}

slideUppFadeIn(homeContentItems,500);
