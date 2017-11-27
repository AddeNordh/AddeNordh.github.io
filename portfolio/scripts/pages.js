function page(page, index) {
	this.page = page;
	this.index = index;
	this.menuBars = document.querySelectorAll(".nav-bar");
	this.arrows = document.querySelectorAll(".line");
	this.childrenDiv = this.page.querySelectorAll("div");
	this.childrenP = this.page.querySelectorAll("p");
}


page.prototype.switch = function (current, desired) {
	this.current = current;
	this.desired = desired;
};


page.prototype.addContent = function (page, cta, dir) {
	this.page = page;
	setTimeout(() => {
		addClass(navBars, 100, null, cta);
		addClass(rightArrow, 100, null, cta);
	},500);
	if (page.index === 1 && dir === "left" || init) {
		init = false;
		addClass(homeContentItems, 300, null, cta);
		addClass(fields, 150, null, cta);
	}
};


page.prototype.clearContent = function (page, ctr) {
	this.page = page;
	setTimeout(() => {
		removeClass(this.page.childrenDiv, null, 100, ctr, 1.1);
		removeClass(this.page.menuBars, null, 100, ctr, 1.5);
		removeClass(this.page.arrows, null, 100, ctr, 1.2);
	},250);
	removeClass(this.page.childrenP, null, 100, ctr, 1.5);
};
