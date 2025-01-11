import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProducts } from '../data/products.js';
import { loadCart } from '../data/cart.js';
// import '../data/car.js';
// import '../data/backend-practice.js';

async function loadPage() {
	try {
		// throw 'error1';
		await loadProducts();

		const value = await new Promise((resolve, reject) => {
			// throw 'error2';
			loadCart(() => {
				// reject('error3');
				resolve('cart loaded');
			});
		});
	} catch (error) {
		console.log('Unexpected error. Please try again later.');
	}

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
