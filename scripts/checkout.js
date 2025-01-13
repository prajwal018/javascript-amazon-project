import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProducts } from '../data/products.js';
import { loadCart } from '../data/cart.js';

async function loadPage() {
	try {
		// throw 'error1';
		await loadProducts();
		await loadCart();
	} catch (error) {
		console.log('Unexpected error. Please try again later.');
	}

	renderCheckoutHeader();
	renderOrderSummary();
	renderPaymentSummary();
}

loadPage();
