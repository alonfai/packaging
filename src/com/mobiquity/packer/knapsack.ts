import { Item, Pack, Result } from './types';

/**
 * Function to compare 2 items for sorting.
 * @param a Item One
 * @param b Item Two
 * @returns negative value if the first item is less than the second item value otherwise
 */
export function compareFn(a: Item, b: Item) {
  if (a.weight < b.weight) {
    return -1;
  }
  if (a.weight > b.weight) {
    return 1;
  }
  return 0;
}

/**
 * Combine items with similar costs together as part of the search algorithm
 * @param items list of items
 * @returns Array<Item>
 */
function organiseItemsWithSimilarPrice(items: Item[]) {
  const map = new Map<number, Item[]>();
  for (const item of items) {
    const key = item.cost;
    const val = map.get(key) ?? [];
    map.set(key, val.concat([item]).sort(compareFn));
  }
  return Array.from(map.values()).flat(1);
}

/**
 * Calculate the optimized set of items to fit in the pack with a "maximumWeight" number
 * @param input of maximum weight and collection of items to choose from
 * @returns optimized list of items and their total cost in the bagged package
 */
export function knapsack({ maximumWeight, items }: Pack): Result {
  const organizedItems = organiseItemsWithSimilarPrice(items);
  const itemsLength = organizedItems.length - 1;
  const arrMap = new Map<number, number>();

  function value(itemIndex: number, capacity: number) {
    if (itemIndex < 0 || capacity <= 0) {
      return 0;
    }
    const key = maximumWeight * itemIndex + (capacity - 1);
    if (arrMap.has(key)) {
      return arrMap.get(key)!;
    }
    const val = calculateValue(itemIndex, capacity);
    arrMap.set(key, val);
    return val;
  }

  /**
   * Get the total value of the given inspected item with the previous selected list
   * @param itemIndex picked item index from the list
   * @param capacity total capacity left to put in the package
   * @returns number
   */
  function calculateValue(itemIndex: number, capacity: number): number {
    const { weight: itemCost, cost: itemValue } = organizedItems[itemIndex];
    const vPrevious = value(itemIndex - 1, capacity);
    if (itemCost > capacity) {
      return vPrevious;
    }
    const vCombined = value(itemIndex - 1, capacity - itemCost) + itemValue;
    return vCombined > vPrevious ? vCombined : vPrevious;
  }

  /**
   * Retrieve the list of items to fit in the pack
   * @returns Array {@typeof Item}
   */
  function getItems() {
    const pack: Item[] = [];
    // find the items using top-bottom approach
    for (let i = itemsLength, capacity = maximumWeight; i >= 0; i -= 1) {
      if (value(i, capacity) <= value(i - 1, capacity)) {
        continue;
      }
      const item = organizedItems[i];
      capacity -= item.weight;
      pack.push(item);
    }
    return pack;
  }

  return {
    maxCost: value(itemsLength, maximumWeight),
    items: getItems(),
  };
}
