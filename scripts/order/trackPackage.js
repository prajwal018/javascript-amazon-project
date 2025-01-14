import { getOrder } from '../../data/order.js';
import { getProduct, loadProducts } from '../../data/products.js';
import { formatOrderDate } from '../utils/date.js';

renderTracking();

async function renderTracking() {
	await loadProducts();
	const url = new URL(window.location.href);
	const orderId = url.searchParams.get('orderId');
	const productId = url.searchParams.get('productId');
	const order = getOrder(orderId);   

	const productFromOrder = order.products.find(product => product.productId === productId);

	const matchingProduct = getProduct(productId);

	let html = `
  <a class="back-to-orders-link link-primary" href="orders.html"> View all orders </a>

				<div class="delivery-date">${formatOrderDate(productFromOrder.estimatedDeliveryTime)}</div>

				<div class="product-info">${matchingProduct.name}</div>

				<div class="product-info">Quantity: ${productFromOrder.quantity}</div>

				<img class="product-image" src=${matchingProduct.image} />

				<div class="progress-labels-container">
					<div class="progress-label">Preparing</div>
					<div class="progress-label current-status">Shipped</div>
					<div class="progress-label">Delivered</div>
				</div>

				<div class="progress-bar-container">
					<div class="progress-bar"></div>
				</div>
  `;

	document.querySelector('.js-order-tracking-container').innerHTML = html;
}
