import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export function isWeekend(date) {
	const today = date();
	const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
	const dateString = deliveryDate.format('dddd, MMMM D');
	return dateString;
}
// const today = dayjs();
// const deliveryDate = today.add(7, 'days');
// const dateString = deliveryDate.format('dddd');

// console.log(dateString === 'Saturday' || dateString === 'Sunday' ? 'Weekend delivery is not available' : dateString);

export function formatOrderDate(orderTime) {
	return dayjs(orderTime).format('MMMM DD');
}
