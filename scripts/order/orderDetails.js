import { orders } from '../../data/order.js';
import { formatCurrency } from '../utils/money.js';
import { getProduct } from '../../data/products.js';
import { formatOrderDate } from '../utils/date.js';
import { calculateCartQuantity } from '../../data/cart.js';

export function renderOrdersPage() {
	let ordersHTML = '';

	orders.forEach(order => {
		ordersHTML += `
		<div class="order-container">
					<div class="order-header">
						<div class="order-header-left-section">
							<div class="order-date">
								<div class="order-header-label">Order Placed:</div>
								<div>${formatOrderDate(order.orderTime)}</div>
							</div>
							<div class="order-total">
								<div class="order-header-label">Total:</div>
								<div>$${formatCurrency(order.totalCostCents)}</div>
							</div>
						</div>

						<div class="order-header-right-section">
							<div class="order-header-label">Order ID:</div>
							<div>${order.id}</div>
						</div>
					</div>

					<div class="order-details-grid">
						${productGridHTML(order.products)}
						</div>
					</div>
				</div>`;
	});

	function productGridHTML(products) {
		let html = '';

		products.forEach(product => {
			const productId = product.productId;

			const matchingProduct = getProduct(productId);
			const dateString = formatOrderDate(product.estimatedDeliveryTime);

			html += `
			<div class="product-image-container">
							<img src=${matchingProduct.image} />
						</div>

						<div class="product-details">
							<div class="product-name">${matchingProduct.name}</div>
							<div class="product-delivery-date">Arriving on: ${dateString}</div>
							<div class="product-quantity">Quantity: ${product.quantity}</div>
							<button class="buy-again-button button-primary">
								<img class="buy-again-icon" src="images/icons/buy-again.png" />
								<span class="buy-again-message">Buy it again</span>
							</button>
						</div>

						<div class="product-actions">
							<a href="tracking.html">
								<button class="track-package-button button-secondary">Track package</button>
							</a>
						</div>
			`;
		});

		return html;
	}

	let cartQuantity = calculateCartQuantity();
	document.querySelector('.js-cart-quantity').innerHTML = cartQuantity > 0 ? cartQuantity : '';
	document.querySelector('.js-order-grid').innerHTML = ordersHTML;
}
