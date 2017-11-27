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
				this.type(text, field, delay);
			}, delay);
		}
		else if (this.text == this.sentance && this.index != fields.length - 1) {
			this.count = 0;
			this.index++;
			this.field = fields[this.index];
			this.sentance = this.msg[this.index];
			setTimeout(() => {
				this.type(this.sentance, this.field, delay);
			},200);
		}
	}
}


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
