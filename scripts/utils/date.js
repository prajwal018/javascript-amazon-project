export function isWeekend(date) {
  const today = date();
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
  const dateString = deliveryDate.format('dddd, MMMM D');
  return dateString;
}
const today = dayjs();
const deliveryDate = today.add(7, 'days');
const dateString = deliveryDate.format('dddd');

console.log(
  dateString === 'Saturday' || dateString === 'Sunday'
    ? 'Weekend delivery is not available'
    : dateString,
);