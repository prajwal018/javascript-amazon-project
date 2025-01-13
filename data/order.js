export let orders;

loadFromStorage();

export function loadFromStorage() {
	orders = JSON.parse(localStorage.getItem('orders')) || [];
}

export async function addOrder(order) {
	orders.unshift(order);
	saveToStorage();
}

function saveToStorage() {
	localStorage.setItem('orders', JSON.stringify(orders));
}
