import { getOrder } from '../data/order.js';
import { getProduct, loadProducts } from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


document.querySelector('.js-order-tracking-container').innerHTML = '<div class="loader">Loading...</div>';

document.addEventListener('DOMContentLoaded', () => {
	loadPage().then(() => {
		document.querySelector('.loader').style.display = 'none';
	});
});

async function loadPage() {
	await loadProducts();
	const url = new URL(window.location.href);
	const orderId = url.searchParams.get('orderId');
	const productId = url.searchParams.get('productId');

	const order = getOrder(orderId);
	const product = getProduct(productId);
	// Get additional details about the product like
	// the estimated delivery time.
	let productDetails;
	order.products.forEach(details => {
		if (details.productId === product.id) {
			productDetails = details;
		}
	});

	const today = dayjs();
	const orderTime = dayjs(order.orderTime);
	const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);
	const percentProgress = ((today - orderTime) / (deliveryTime - orderTime)) * 100;

	// Extra feature: display "delivered" on the tracking page
	// if today's date is past the delivery date.
	const deliveredMessage = today < deliveryTime ? 'Arriving on' : 'Delivered on';

	const trackingHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>
    <div class="delivery-date">
      ${deliveredMessage} ${dayjs(productDetails.estimatedDeliveryTime).format('dddd, MMMM D')}
    </div>
    <div class="product-info">
      ${product.name}
    </div>
    <div class="product-info">
      Quantity: ${productDetails.quantity}
    </div>
    <img class="product-image" src="${product.image}">
    <div class="progress-labels-container">
      <div class="progress-label ${percentProgress < 50 ? 'current-status' : ''}">
        Preparing
      </div>
      <div class="progress-label ${percentProgress >= 50 && percentProgress < 100 ? 'current-status' : ''}">
        Shipped
      </div>
      <div class="progress-label ${percentProgress >= 100 ? 'current-status' : ''}">
        Delivered
      </div>
    </div>
    <div class="progress-bar-container">
      <div class="progress-bar" style="width: ${percentProgress}%;"></div>
    </div>
  `;
	document.querySelector('.js-order-tracking-container').innerHTML = trackingHTML;

	document.querySelector('.js-search-button').addEventListener('click', () => {
		const search = document.querySelector('.js-search-bar').value;
		window.location.href = `index.html?search=${search}`;
	});

	// Extra feature: searching by pressing "Enter" on the keyboard.
	document.querySelector('.js-search-bar').addEventListener('keydown', event => {
		if (event.key === 'Enter') {
			const searchTerm = document.querySelector('.js-search-bar').value;
			window.location.href = `index.html?search=${searchTerm}`;
		}
	});
}
loadPage();
