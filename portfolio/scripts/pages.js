function section(page, index) {
	this.page = page;
	this.index = index;
	this.menuBars = document.querySelectorAll(".nav-bar");
	this.arrows = document.querySelectorAll(".line");
	this.divToShow = this.page.querySelectorAll(".ta");
	this.childrenDiv = this.page.querySelectorAll("div");
	this.childrenP = this.page.querySelectorAll("p");
}


section.prototype.switch = function(current, desired, cctr, ccta, dctr, dcta, delay) {
	this.current = current.page;
	this.desired = desired.page;
	addClass(null, 3000, this.current, ccta);
	removeClass(null, this.current, 3000, cctr);
	addClass(null, 3000, this.desired, dcta);
	removeClass(null, this.current, 3000, dctr);
	setTimeout(() => {
		this.addContent(desired, "active", true, 1500, 2000);
	}, delay);
}


section.prototype.addContent = function (page, cta, newPage, itemDelay, iDelay) {

		if (newPage || init) {
			setTimeout(() => {
				init = false;
				addClass(page.divToShow, itemDelay/3, null, cta);
			},itemDelay)
		}




	setTimeout(() => {
		addClass(navBars, 100, null, cta);
		addClass(rightArrow, 100, null, cta);
		if (page.index > 0) {
			addClass(leftArrow, 100, null, cta);
		}
	},iDelay);


};


section.prototype.clearContent = function (page, ctr) {
	setTimeout(() => {
		removeClass(page.childrenDiv, null, 100, ctr, 1.1);
		removeClass(page.menuBars, null, 100, ctr, 1.5);
		removeClass(page.arrows, null, 100, ctr, 1.2);
		addClass(loader, 400, null, "active");
		removeClass(loader, null, 2500, "active");
	},250);
	removeClass(page.childrenP, null, 100, ctr, 2);
};
