import { fromatCurrency } from '../scripts/utils/money.js';

console.log('test suite: fromatCurrency');

console.log('converts cents to dollars and cents');
if (fromatCurrency(2095) === '20.95') {
  console.log('Test Passed');
} else {
  console.log('Test Failed');
}
console.log('works with 0');
if (fromatCurrency(0) === '0.00') {
  console.log('Test Passed');
} else {
  console.log('Test Failed');
}

console.log('rounds up to nearest cent');
if (fromatCurrency(2000.5) === '20.01') {
  console.log('Test Passed');
} else {
  console.log('Test Failed');
}

console.log('rounds down to nearest cent');
if (fromatCurrency(2000.4) === '20.00') {
  console.log('Test Passed');
} else {
  console.log('Test Failed');
}