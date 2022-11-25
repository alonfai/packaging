import { ERRORS, INPUT_ITEM_CURRENCY_LIST } from './constants';
import { APIException } from './error';
import { isNumber, isItemValid, parseItem, parseLineInputToPack } from './utils';

describe('utils', () => {
  describe('isNumber', () => {
    it('undefined string', () => {
      const result = isNumber();
      expect(result).toEqual(false);
    });

    it('empty string', () => {
      const result = isNumber('');
      expect(result).toEqual(false);
    });

    it('invalid type', () => {
      const result = isNumber('fw2');
      expect(result).toEqual(false);
    });

    it('valid number', () => {
      const result = isNumber('234');
      expect(result).toEqual(true);
    });
  });

  describe('isItemValid', () => {
    const index = '1';
    const weight = '53';
    const cost = '80';
    const currency = INPUT_ITEM_CURRENCY_LIST[0];
    it('invalid index', () => {
      const result = isItemValid(undefined, weight, cost, currency);
      expect(result).toEqual(false);
    });

    it('invalid weight', () => {
      const result = isItemValid(index, undefined, cost, currency);
      expect(result).toEqual(false);
    });

    it('invalid cost', () => {
      const result = isItemValid(index, weight, undefined, currency);
      expect(result).toEqual(false);
    });

    it('invalid currency string', () => {
      const result = isItemValid(index, weight, cost);
      expect(result).toEqual(false);
    });

    it('valid item input', () => {
      const result = isItemValid(index, weight, cost, currency);
      expect(result).toEqual(true);
    });
  });

  describe('parseItem', () => {
    const line = '(1,53.38,€45)';
    const startingIndex = 0;
    const lastIndex = line.length - 1;
    it('invalid startingIndex and lastIndex', () => {
      expect(() => parseItem(line, 2, 0)).toThrow(new APIException(`${ERRORS.INVALID_ITEM_RECORD}: ${line}`));
    });

    it('input string item does not have 3 sections', () => {
      const errorLine = '(1,53)';
      expect(() => parseItem(errorLine, 0, errorLine.length - 1)).toThrow(
        new APIException(`${ERRORS.INVALID_ITEM_RECORD}: ${errorLine}`),
      );
    });

    it('input string item is invalid format', () => {
      const errorLine = '(1,5f,$35)';
      expect(() => parseItem(errorLine, 0, errorLine.length - 1)).toThrow(
        new APIException(`${ERRORS.INVALID_ITEM_RECORD}: ${errorLine}`),
      );
    });

    it('valid string item', () => {
      const result = parseItem(line, startingIndex, lastIndex);
      expect(result.index).toEqual(1);
      expect(result.cost).toEqual(45);
      expect(result.weight).toEqual(53.38);
      expect(result.currency).toEqual('€');
    });
  });

  describe('parseLineInputToPack', () => {
    const line = '8 : (1,15.3,€34)';
    it('invalid max weight for package', () => {
      const errorLine = '23f: (1,15.3,€34)';
      expect(() => parseLineInputToPack(errorLine)).toThrow(new APIException(ERRORS.INVALID_MAX_WEIGHT));
    });

    it('parse line correctly', () => {
      const result = parseLineInputToPack(line);
      expect(result).toBeDefined();
      expect(result.maximumWeight).toEqual(8);
      expect(result.items).toBeDefined();
      expect(result.items.length).toEqual(1);
      const item = result.items[0];
      expect(item.index).toEqual(1);
      expect(item.currency).toEqual('€');
      expect(item.cost).toEqual(34);
      expect(item.weight).toEqual(15.3);
    });
  });
});
