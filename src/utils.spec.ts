import { ERRORS, INPUT_ITEM_CURRENCY_LIST } from './constants';
import { APIException } from './error';
import { isNumber, isItemValid, parseItem, parseLineInputToPack, readFile, writeFile } from './utils';
import fs from 'fs';

jest.mock('fs');

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

  describe('readFile', () => {
    it('invalid path', () => {
      const mockFn = jest.fn().mockImplementation(() => {
        throw new APIException('ERROR');
      });
      (fs.readFileSync as jest.Mock) = mockFn;
      const validate = () => {
        readFile('path');
      };
      expect(validate).toThrow(new APIException(`${ERRORS.INVALID_FILE_PATH} ERROR`));
      expect(mockFn).toBeCalled();
    });
    it('valid path', () => {
      const output = { name: 'name', value: 'value' };
      const mockFn = jest.fn().mockReturnValue(output);
      (fs.readFileSync as jest.Mock) = mockFn;
      const data = readFile('path');
      expect(data).toEqual(output);
      expect(mockFn).toBeCalled();
    });
  });

  describe('writeFile', () => {
    const data = { name: 'name', value: 'value' };
    it('invalid path', () => {
      const mockFn = jest.fn().mockImplementation(() => {
        throw new APIException('ERROR');
      });
      (fs.writeFileSync as jest.Mock) = mockFn;

      const validate = () => {
        writeFile('path', JSON.stringify(data));
      };
      expect(validate).toThrow(new APIException(`${ERRORS.INVALID_FILE_PATH} ERROR`));
      expect(mockFn).toBeCalled();
    });
    it('valid path', () => {
      const mockFn = jest.fn().mockReturnValue(undefined);
      (fs.writeFileSync as jest.Mock) = mockFn;
      writeFile('path', JSON.stringify(data));
      expect(mockFn).toBeCalled();
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

    it('input string item has cost above 100', () => {
      const errorLine = '(1,53.38,€125)';
      expect(() => parseItem(errorLine, 0, errorLine.length - 1)).toThrow(
        new APIException(`${ERRORS.MAX_WEIGHT_AND_COST_FOR_ITEM_UPTO_100}: ${errorLine}`),
      );
    });

    it('input string item has weight above 100', () => {
      const errorLine = '(1,101.38,€45)';
      expect(() => parseItem(errorLine, 0, errorLine.length - 1)).toThrow(
        new APIException(`${ERRORS.MAX_WEIGHT_AND_COST_FOR_ITEM_UPTO_100}: ${errorLine}`),
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
    it('invalid max weight number for package', () => {
      const errorLine = '23f: (1,15.3,€34)';
      expect(() => parseLineInputToPack(errorLine)).toThrow(new APIException(ERRORS.INVALID_MAX_WEIGHT));
    });

    it('Max weight for package exceeds 100', () => {
      const errorLine = '101: (1,15.3,€34)';
      expect(() => parseLineInputToPack(errorLine)).toThrow(new APIException(ERRORS.MAX_PACKAGE_WEIGHT_UPTO_100));
    });

    it('Max items to choose from exceeds 15', () => {
      const errorLine =
        '90: (1,90.72,€13) (2,33.80,€40) (3,43.15,€10) (4,37.97,€16) (5,46.81,€36) (6,48.77,€79) (7,81.80,€45) (8,19.36,€79) (9,6.76,€64) (9,6.76,€6) (9,6.76,€7) (9,6.76,€80) (9,6.76,€90) (9,6.76,€24) (9,6.76,€34) (9,6.76,€44)';
      expect(() => parseLineInputToPack(errorLine)).toThrow(new APIException(ERRORS.MAX_ITEMS_TO_CHOOSE_FROM_UPTO_15));
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
