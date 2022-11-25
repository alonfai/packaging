import { APIException } from './error';
import * as constants from './constants';
import { Item, Pack } from './types';

/**
 * Does the given string is a valid number
 * @param str input
 * @returns boolean whether the string is a valid number or not
 */
export function isNumber(str?: string) {
  if (typeof str !== 'string') {
    return false;
  }

  if (str.trim() === '') {
    return false;
  }

  return !Number.isNaN(Number(str));
}

/**
 * Does the given item fields are valid numbers
 * @param index index of the item in the input file
 * @param weight weight of the item
 * @param cost cost of the item
 * @param currency currency of the cost
 * @returns boolean value
 */
export function isItemValid(index?: string, weight?: string, cost?: string, currency?: string) {
  return (
    isNumber(index) &&
    isNumber(weight) &&
    isNumber(cost) &&
    !!currency &&
    constants.INPUT_ITEM_CURRENCY_LIST.includes(currency)
  );
}

/**
 * Converts the given input string to an Item object
 * @param line input string
 * @param startingIndex index inside the file where the item input starts
 * @param lastIndex index inside the file where the item input finishes
 * @returns
 */
export function parseItem(line: string, startingIndex: number, lastIndex: number) {
  if (startingIndex > lastIndex) {
    throw new APIException(`${constants.ERRORS.INVALID_ITEM_RECORD}: ${line}`);
  }
  const str = line.substring(startingIndex + 1, lastIndex);
  const parts = str.split(',');
  if (parts.length !== 3) {
    throw new APIException(`${constants.ERRORS.INVALID_ITEM_RECORD}: ${line}`);
  }
  const index = parts[0];
  const weight = parts[1];
  const cost = parts[2]?.substring(1);
  const currency = parts[2]?.[0];
  if (!isItemValid(index, weight, cost, currency)) {
    throw new APIException(`${constants.ERRORS.INVALID_ITEM_RECORD}: ${line}`);
  }

  return {
    index: Number(index),
    weight: Number(weight),
    cost: Number(cost),
    currency,
  };
}

/**
 * Convert string input of data to input Pack type that can be later be passed to the algorithm
 * @param line string line input with weight "w" the package can take a list of "n" items needed to be picked from
 * @returns A pack input object of max weight and list of items
 */
export function parseLineInputToPack(line: string): Pack {
  const seperatorIndex = line.indexOf(constants.INPUT_ITEM_COLON_SEPERATOR);
  const maxWeight = line.substring(0, seperatorIndex).trim();

  if (!isNumber(maxWeight)) {
    throw new APIException(constants.ERRORS.INVALID_MAX_WEIGHT);
  }

  const collection = line
    .substring(seperatorIndex + 1)
    .trim()
    .split(' ');

  const items: Item[] = [];
  for (const str of collection) {
    const startingIndex = str.indexOf(constants.INPUT_ITEM_OPEN_SYMBOL);
    const lastIndex = str.indexOf(constants.INPUT_ITEM_CLOSE_SYMBOL);
    const item = parseItem(str, startingIndex, lastIndex);
    items.push(item);
  }
  return {
    maxWeight: Number(maxWeight),
    items,
  };
}
