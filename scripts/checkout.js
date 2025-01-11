import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProducts } from '../data/products.js';
import { loadCart } from '../data/cart.js';
// import '../data/car.js';
// import '../data/backend-practice.js';

async function loadPage() {
	await loadProducts();

	const value = await new Promise(resolve => {
		loadCart(() => {
			resolve('cart loaded');
		});
	});

	renderCheckoutHeader();
	renderOrderSummary();
	renderPaymentSummary();
}

loadPage();

/*
Promise.all([
	loadProducts(),
	new Promise(resolve => {
		loadCart(() => {
			resolve();
		});
	}),
]).then(() => {
	renderCheckoutHeader();
	renderOrderSummary();
	renderPaymentSummary();
});*/
