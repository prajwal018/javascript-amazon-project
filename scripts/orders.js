import { loadProducts } from '../data/products.js';
import { renderOrdersPage } from './order/orderDetails.js';

async function loadPage() {
	await loadProducts();
	renderOrdersPage();
}

loadPage();
