class Cart {
	cartItems = undefined;
	localStorageKey = undefined;

	constructor(localStorageKey) {
		this.localStorageKey = localStorageKey;
		this.loadFromStorage();
	}

	loadFromStorage() {
		this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));
		if (!this.cartItems) {
			this.cartItems = [
				{
					productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
					quantity: 2,
					deliveryOptionId: '1',
				},
				{
					productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
					quantity: 1,
					deliveryOptionId: '3',
				},
			];
		}
	}

	saveToStorage() {
		localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
	}

	addToCart(productId) {
		let matchingItem;
		let quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
		this.cartItems.forEach(cartItem => {
			if (productId === cartItem.productId) matchingItem = cartItem;
		});

		matchingItem
			? (matchingItem.quantity += quantity)
			: this.cartItems.push({
					productId,
					quantity,
					deliveryOptionId: '1',
			  });
		this.saveToStorage();
	}

	removeFromCart(productId) {
		const newCart = [];
		this.cartItems.forEach(cartItem => {
			if (productId !== cartItem.productId) {
				newCart.push(cartItem);
			}
		});
		this.cartItems = newCart;
		this.saveToStorage();
	}

	updateQuantity(productId, quantity) {
		let matchingItem;
		this.cartItems.forEach(cartItem => {
			if (productId === cartItem.productId) matchingItem = cartItem;
		});

		matchingItem.quantity = quantity;
		this.saveToStorage();
	}

	calculateCartQuantity() {
		let cartQuantity = 0;
		this.cartItems.forEach(cartItem => {
			cartQuantity += cartItem.quantity;
		});
		return cartQuantity;
	}

	updateDeliveryOption(productId, deliveryOptionId) {
		let matchingItem;
		this.cartItems.forEach(cartItem => {
			if (productId === cartItem.productId) matchingItem = cartItem;
		});

		matchingItem.deliveryOptionId = deliveryOptionId;
		this.saveToStorage();
	}
}
