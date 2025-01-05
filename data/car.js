class Car {
	#brand;
	#model;
	speed = 0;
	isTrunkOpen = false;

	constructor(brand, model) {
		this.#brand = brand;
		this.#model = model;
	}

	displayInfo() {
		console.log(`${this.getbrand()} : ${this.getmodel()}, Speed : ${this.speed} km/h Trunk : ${this.isTrunkOpen ? 'Open' : 'Closed'}`);
	}

	go() {
		if (!this.isTrunkOpen && this.speed < 100) this.speed += 5;
	}
	brake() {
		if (this.speed > 0) this.speed -= 5;
	}

	openTrunk() {
		if (this.speed === 0) this.isTrunkOpen = true;
	}
	closeTrunk() {
		this.isTrunkOpen = false;
	}
	getbrand() {
		return this.#brand;
	}
	getmodel() {
		return this.#model;
	}
}

class RaceCar extends Car {
	acceleration = 0;
	constructor(brand, model, acceleration) {
		super(brand, model);
		this.acceleration = acceleration;
	}

	go() {
		if (!this.isTrunkOpen && this.speed < 300) this.speed += this.acceleration;
	}
	openTrunk() {}
	closeTrunk() {}
}

const car1 = new Car('Toyota', 'Corolla');

const car2 = new RaceCar('McLaren', 'F1', 20);

// car1.openTrunk();

// car1.closeTrunk();
// car1.displayInfo();
// car1.go();
// car1.displayInfo();
// car1.go();
// car1.displayInfo();
// car1.go();
// car1.displayInfo();
// car1.go();
// car1.displayInfo();
// car1.go();
// car1.displayInfo();
// car1.brake();
// car1.displayInfo();
// car1.brake();
// car1.displayInfo();
// car1.brake();
// car1.displayInfo();
// car1.brake();
// car1.displayInfo();
// car1.brake();
// car1.displayInfo();

// car2.openTrunk();

// car2.closeTrunk();
// car2.displayInfo();
// car2.go();
// car2.displayInfo();
// car2.go();
// car2.displayInfo();
// car2.go();
// car2.displayInfo();
// car2.go();
// car2.displayInfo();
// car2.go();
// car2.displayInfo();
// car2.brake();
// car2.displayInfo();
// car2.brake();
// car2.displayInfo();
// car2.brake();
// car2.displayInfo();
// car2.brake();
// car2.displayInfo();
// car2.brake();
// car2.displayInfo();
