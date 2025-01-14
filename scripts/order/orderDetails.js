import { orders } from '../../data/order.js';
import { formatCurrency } from '../utils/money.js';
import { getProduct } from '../../data/products.js';
import { formatOrderDate } from '../utils/date.js';
import { addToCart, calculateCartQuantity } from '../../data/cart.js';

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
						${productGridHTML(order.products, order.id)}
						</div>
					</div>
				</div>`;
	});

	function productGridHTML(products, orderId) {
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

							<button data-product-id=${productId} class="buy-again-button button-primary js-buy-again-button">
								<img class="buy-again-icon" src="images/icons/buy-again.png" />
								<span class="buy-again-message">Buy it again</span>
							</button>
						</div>

						<div class="product-actions">
							<a href="tracking.html?orderId=${orderId}&productId=${productId}">
								<button data-product-id='${orderId}' class="track-package-button button-secondary">Track package</button>
							</a>
						</div>
			`;
		});

		return html;
	}

	let cartQuantity = calculateCartQuantity();
	document.querySelector('.js-cart-quantity').innerHTML = cartQuantity > 0 ? cartQuantity : '';
	document.querySelector('.js-order-grid').innerHTML = ordersHTML;

	document.querySelectorAll('.js-buy-again-button').forEach(link => {
		link.addEventListener('click', () => {
			const productId = link.dataset.productId;
			addToCart(productId);
			window.location.href = 'checkout.html';
		});
	});
}
