import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  updateQuantity,
  updateDeliveryOption,
} from '../../data/cart.js';
import { getProduct, products } from '../../data/products.js';
import {
  deliveryOptions,
  getDeliveryOptions,
} from '../../data/deliveryOptions.js';
import { fromatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSummary() {
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const { productId } = cartItem;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOptions(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartSummaryHTML += `
  <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
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
        <div class="product-price">$${fromatCurrency(
          matchingProduct.priceCents,
        )}</div>
        <div class="product-quantity">
          <span> Quantity: <span class="quantity-label js-quantity-label-${
            matchingProduct.id
          }">${cartItem.quantity}</span> </span>
          <span data-product-id='${
            matchingProduct.id
          }' class="update-quantity-link link-primary js-update-link">
            Update
          </span>
          <input class="quantity-input js-quantity-input-${
            matchingProduct.id
          }"/>
          <span data-product-id='${
            matchingProduct.id
          }'class="save-quantity-link link-primary js-save-link">Save</span>
          <span data-product-id='${
            matchingProduct.id
          }' class="delete-quantity-link link-primary js-delete-link">
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
  updateCartQuantity();

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');
      const priceString =
        deliveryOption.priceCents === 0
          ? 'FREE '
          : `$${fromatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `<div data-product-id="${
        matchingProduct.id
      }" data-delivery-option-id="${
        deliveryOption.id
      }" class="delivery-option js-delivery-option"> 
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

  function updateCartQuantity() {
    let cartQuantity = calculateCartQuantity();
    document.querySelector(
      '.js-return-to-home-link',
    ).innerHTML = `${cartQuantity} items`;
  }

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const { productId } = link.dataset;
      removeFromCart(productId);
      updateCartQuantity();
      renderPaymentSummary();

      document.querySelector(`.js-cart-item-container-${productId}`).remove();
    });
  });

  document.querySelectorAll('.js-update-link').forEach((link) => {
    link.addEventListener('click', () => {
      const { productId } = link.dataset;

      document
        .querySelector(`.js-cart-item-container-${productId}`)
        .classList.add('is-editing-quantity');
    });
  });

  document.querySelectorAll('.js-save-link').forEach((link) => {
    link.addEventListener('click', () => {
      const { productId } = link.dataset;

      const quantity = Number(
        document.querySelector(`.js-quantity-input-${productId}`).value,
      );

      if (quantity < 0 || quantity >= 1000) {
        alert('Quantity must be at least 0 and less than 1000');
        return;
      }
      updateQuantity(productId, quantity);

      updateCartQuantity();

      quantity === 0
        ? document
            .querySelector(`.js-cart-item-container-${productId}`)
            .remove()
        : (document.querySelector(`.js-quantity-label-${productId}`).innerHTML =
            quantity);

      document
        .querySelector(`.js-cart-item-container-${productId}`)
        .classList.remove('is-editing-quantity');
    });
  });

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
