import { Item } from './types';
import { parseLineInputToPack } from './utils';
import { compareFn, knapsack } from './knapsack';

describe('knapsack', () => {
  describe('compareFn', () => {
    it('item a weight less than item b weight', () => {
      const itemA: Item = {
        index: 1,
        weight: 10,
        cost: 10,
        currency: '€',
      };
      const itemB: Item = {
        index: 2,
        weight: 11,
        cost: 10,
        currency: '€',
      };
      const result = compareFn(itemA, itemB);
      expect(result).toBeLessThan(0);
    });

    it('item a weight is bigger than item b weight', () => {
      const itemA: Item = {
        index: 1,
        weight: 90,
        cost: 10,
        currency: '€',
      };
      const itemB: Item = {
        index: 2,
        weight: 11,
        cost: 10,
        currency: '€',
      };
      const result = compareFn(itemA, itemB);
      expect(result).toBeGreaterThan(0);
    });

    it('item a weight is same as item b weight', () => {
      const itemA: Item = {
        index: 1,
        weight: 10,
        cost: 10,
        currency: '€',
      };
      const itemB: Item = {
        index: 2,
        weight: 10,
        cost: 10,
        currency: '€',
      };
      const result = compareFn(itemA, itemB);
      expect(result).toEqual(0);
    });
  });

  describe('knapsack', () => {
    it('check for scenario with several different items and weights', () => {
      const str = '81 : (1,53.38,€45) (2,88.62,€98) (3,78.48,€3) (4,72.30,€76) (5,30.18,€9) (6,46.34,€48)';
      const input = parseLineInputToPack(str);
      const output = knapsack(input);
      expect(output.items.length).toEqual(1);
      expect(output.items[0].index).toEqual(4);
    });
  });
});
