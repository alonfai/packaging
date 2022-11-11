import APIException from './error';
import * as constants from './constants';
import { Item, Pack } from './types';

export function isNumber(str?: string): boolean {
  if (typeof str !== 'string') {
    return false;
  }

  if (str.trim() === '') {
    return false;
  }

  return !Number.isNaN(Number(str));
}

export function isItemValid(index?: string, weight?: string, cost?: string, currency?: string): boolean {
  return isNumber(index) && isNumber(weight) && isNumber(cost) && currency === '€';
}

export function stringItemToObject(str: string): Item | undefined {
  const parts = str.split(',');
  const index = parts[0];
  const weight = parts[1];
  const cost = parts[2]?.substring(1);
  const currency = parts[2]?.[0];
  if (!isItemValid(index, weight, cost, currency)) {
    return undefined;
  }

  return {
    index: Number(index),
    weight: Number(weight),
    cost: Number(cost),
    currency: currency ?? '',
  };
}

export function parseItem(line: string, startingIndex: number, lastIndex: number): Item {
  const info = line.substring(startingIndex + 1, lastIndex);
  const item = stringItemToObject(info);
  if (!item) {
    throw new APIException(`${constants.ERRORS.INVALID_ITEM_RECORD} ${line}`);
  }
  return item;
}

/**
 * Convert string input of data to input Pack type that can be later be passed to the algorithm
 * @param line string line input with weight "w" the package can take a list of "n" items needed to be picked from
 * @returns A pack input object
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
