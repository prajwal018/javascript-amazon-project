export let cart;

loadFromStorage();

export function loadFromStorage() {
	cart = JSON.parse(localStorage.getItem('cart'));

	if (!cart) {
		cart = [
			{
				productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
				quantity: 2,
				deliveryOptionId: '1',
			},
			{
				productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
				quantity: 1,
				deliveryOptionId: '2',
			},
		];
	}
}

function saveToStorage() {
	localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
	let quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`)?.value || 1);

	let matchingItem;
	cart.forEach(cartItem => {
		if (productId === cartItem.productId) matchingItem = cartItem;
	});

	matchingItem
		? (matchingItem.quantity += quantity)
		: cart.push({
				productId,
				quantity,
				deliveryOptionId: '1',
		  });
	saveToStorage();
}

export function removeFromCart(productId) {
	const newCart = [];
	cart.forEach(cartItem => {
		if (productId !== cartItem.productId) {
			newCart.push(cartItem);
		}
	});
	cart = newCart;
	saveToStorage();
}

export function updateQuantity(productId, quantity) {
	let matchingItem;
	cart.forEach(cartItem => {
		if (productId === cartItem.productId) matchingItem = cartItem;
	});

	matchingItem.quantity = quantity;
	saveToStorage();
}

export function calculateCartQuantity() {
	let cartQuantity = 0;
	cart.forEach(cartItem => {
		cartQuantity += cartItem.quantity;
	});
	return cartQuantity;
}

export function updateDeliveryOption(productId, deliveryOptionId) {
	let matchingItem;
	cart.forEach(cartItem => {
		if (productId === cartItem.productId) matchingItem = cartItem;
	});

	matchingItem.deliveryOptionId = deliveryOptionId;
	saveToStorage();
}

export async function loadCart() {
	try {
		const response = await fetch('https://supersimplebackend.dev/cart');
		console.log('load cart');
	} catch (error) {
		console.log('error' + error);
	}
}

export async function resetCart() {
	cart = [];
	saveToStorage();
}
