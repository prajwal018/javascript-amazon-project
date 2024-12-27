import { fromatCurrency } from '../scripts/utils/money.js';

describe('test suite: fromatCurrency', () => {
  it('converts cents to dollars and cents', () => {
    expect(fromatCurrency(2095)).toEqual('20.95');
  });

  it('works with 0', () => {
    expect(fromatCurrency(0)).toEqual('0.00');
  });

  it('rounds up to nearest cent', () => {
    expect(fromatCurrency(2000.5)).toEqual('20.01');
  });

  it('rounds down to nearest cent', () => {
    expect(fromatCurrency(2000.4)).toEqual('20.00');
  });
});
