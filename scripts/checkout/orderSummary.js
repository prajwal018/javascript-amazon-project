import { cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { calulateDeliveryDate, deliveryOptions, getDeliveryOptions } from '../../data/deliveryOptions.js';
import { formatCurrency } from '../utils/money.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';

document.querySelector('.js-order-summary').innerHTML = '<div class="loader">Loading...</div>';

document.addEventListener('DOMContentLoaded', () => {
	renderOrderSummary().then(() => {
		document.querySelector('.loader').style.display = 'none';
	});
});

export async function renderOrderSummary() {
	let cartSummaryHTML = '';

	if (cart.length === 0) {
		document.querySelector('.js-order-summary').innerHTML = '<div class="empty-cart">Empty Cart! <br>Add something to your cart.</div>';
		return;
	}

	cart.forEach(cartItem => {
		const productId = cartItem.productId;

		const matchingProduct = getProduct(productId);

		const deliveryOptionId = cartItem.deliveryOptionId;

		const deliveryOption = getDeliveryOptions(deliveryOptionId);

		const dateString = calulateDeliveryDate(deliveryOption);

		cartSummaryHTML += `
  <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date js-delivery-date">Delivery date: ${dateString}</div>

    <div class="cart-item-details-grid">
      <img
        class="product-image"
        src=${matchingProduct.image}
      />

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">${matchingProduct.getPrice()}</div>
        <div class="product-quantity">
          <span> Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span> </span>
          <span data-product-id='${matchingProduct.id}' class="update-quantity-link link-primary js-update-link">
            Update
          </span>
          <input class="quantity-input js-quantity-input-${matchingProduct.id}"/>
          <span data-product-id='${matchingProduct.id}'class="save-quantity-link link-primary js-save-link">Save</span>
          <span data-product-id='${matchingProduct.id}' class="delete-quantity-link link-primary delete-link js-delete-link js-delete-link-${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        
        ${deliveryOptionsHTML(matchingProduct, cartItem)}
      </div>
    </div>
  </div>
  `;
	});

	function deliveryOptionsHTML(matchingProduct, cartItem) {
		let html = '';
		deliveryOptions.forEach(deliveryOption => {
			const dateString = calulateDeliveryDate(deliveryOption);
			const priceString = deliveryOption.priceCents === 0 ? 'FREE ' : `$${formatCurrency(deliveryOption.priceCents)} -`;

			const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

			html += `<div data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}" class="delivery-option js-delivery-option"> 
      <input
        type="radio"
        ${isChecked ? 'checked' : ''}
        class="delivery-option-input"
        name="delivery-option-${matchingProduct.id}"
      />
      <div>
        <div class="delivery-option-date">${dateString}</div>
        <div class="delivery-option-price">${priceString} Shipping</div>
      </div>
    </div>`;
		});

		return html;
	}

	document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

	document.querySelectorAll('.js-delete-link').forEach(link => {
		link.addEventListener('click', () => {
			const productId = link.dataset.productId;
			removeFromCart(productId);
			const container = document.querySelector(`.js-cart-item-container-${productId}`);
			container.remove();
			renderCheckoutHeader();
			renderOrderSummary();
			renderPaymentSummary();
		});
	});

	document.querySelectorAll('.js-update-link').forEach(link => {
		link.addEventListener('click', () => {
			const { productId } = link.dataset;

			document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity');
		});
	});

	document.querySelectorAll('.js-save-link').forEach(link => {
		link.addEventListener('click', () => {
			const { productId } = link.dataset;

			const quantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);

			if (quantity < 0 || quantity >= 1000) {
				alert('Quantity must be at least 0 and less than 1000');
				return;
			}
			updateQuantity(productId, quantity);

			renderCheckoutHeader();
			renderOrderSummary();
			renderPaymentSummary();

			quantity === 0 ? document.querySelector(`.js-cart-item-container-${productId}`).remove() : (document.querySelector(`.js-quantity-label-${productId}`).innerHTML = quantity);

			document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');
		});
	});

	document.querySelectorAll('.js-delivery-option').forEach(element => {
		element.addEventListener('click', () => {
			const { productId, deliveryOptionId } = element.dataset;
			updateDeliveryOption(productId, deliveryOptionId);
			renderOrderSummary();
			renderPaymentSummary();
		});
	});
}
