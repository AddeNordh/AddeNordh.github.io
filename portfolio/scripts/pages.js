function section(page, index) {
	this.page = page;
	this.index = index;
	this.menuBars = document.querySelectorAll(".nav-bar");
	this.arrows = document.querySelectorAll(".line");
	this.childrenDiv = this.page.querySelectorAll("div");
	this.childrenP = this.page.querySelectorAll("p");
}


section.prototype.switch = function(current, desired, cctr, ccta, dctr, dcta) {
	this.current = current.page;
	this.desired = desired.page;
	addClass(null, 2000, this.current, ccta);
	removeClass(null, this.current, 2000, cctr);
	addClass(null, 2000, this.desired, dcta);
	removeClass(null, this.current, 2000, dctr);
	setTimeout(() => {
		this.addContent(desired, "active");
	}, 2500);
}


section.prototype.addContent = function (page, cta, dir, done) {
		setTimeout(() => {
			addClass(navBars, 100, null, cta);
			addClass(rightArrow, 100, null, cta);
			if (page.index > 0) {
				addClass(leftArrow, 100, null, cta);
			}
		},1000);

	if (page.index === 1 && dir === "left" || init) {
		init = false;
		addClass(homeContentItems, 300, null, cta);
		addClass(fields, 150, null, cta);
	}
};


section.prototype.clearContent = function (page, ctr) {
	setTimeout(() => {
		removeClass(page.childrenDiv, null, 100, ctr, 1.1);
		removeClass(page.menuBars, null, 100, ctr, 1.5);
		removeClass(page.arrows, null, 100, ctr, 1.2);
		addClass(null, 550, loader, "active");
		removeClass(null, loader, 1700, "active");
	},250);
	removeClass(page.childrenP, null, 100, ctr, 1.5);
};
