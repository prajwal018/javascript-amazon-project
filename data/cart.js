export const cart = [];

export function addToCart(productId) {
  let quantity = Number(
    document.querySelector(`.js-quantity-selector-${productId}`).value,
  );

  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) matchingItem = item;
  });

  matchingItem
    ? (matchingItem.quantity += quantity)
    : cart.push({
        productId,
        quantity,
      });
}
