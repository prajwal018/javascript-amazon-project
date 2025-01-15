import { orders } from '../data/order.js';
import { formatCurrency } from './utils/money.js';
import { getProduct, loadProducts } from '../data/products.js';
import { addToCart, calculateCartQuantity } from '../data/cart.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export async function loadPage() {
	await loadProducts();

	let ordersHTML = '';

	orders.forEach(order => {
		const orderTimeString = dayjs(order.orderTime).format('MMMM D');

		ordersHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderTimeString}</div>
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
          ${productsListHTML(order)}
        </div>
      </div>
    `;
	});

	function productsListHTML(order) {
		let productsListHTML = '';

		order.products.forEach(productDetails => {
			const product = getProduct(productDetails.productId);

			productsListHTML += `
        <div class="product-image-container">
          <img src="${product.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${product.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${dayjs(productDetails.estimatedDeliveryTime).format('MMMM D')}
          </div>
          <div class="product-quantity">
            Quantity: ${productDetails.quantity}
          </div>
          <button class="buy-again-button button-primary js-buy-again"
            data-product-id="${product.id}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
		});

		return productsListHTML;
	}

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

	document.querySelector('.js-order-grid').innerHTML = ordersHTML;

	document.querySelectorAll('.js-buy-again').forEach(link => {
		link.addEventListener('click', () => {
			const productId = link.dataset.productId;
			addToCart(productId);
			// (Optional) display a message that the product was added,
			// then change it back after a second.
			link.innerHTML = 'Added';
			setTimeout(() => {
				link.innerHTML = `
        <img class="buy-again-icon" src="images/icons/buy-again.png">
        <span class="buy-again-message">Buy it again</span>
        `;
			}, 1000);
			let cartQuantity = calculateCartQuantity();
			document.querySelector('.js-cart-quantity').innerHTML = cartQuantity > 0 ? cartQuantity : '';
			// window.location.href = 'checkout.html';
		});
	});
}
loadPage();
