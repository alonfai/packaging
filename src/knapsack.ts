import { Item, Pack, Result } from './types';

export function knapsack({ maximumWeight, items }: Pack): Result {
  const itemsLength = items.length - 1;
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
   * Get the
   * @param itemIndex
   * @param capacity
   * @returns
   */
  function calculateValue(itemIndex: number, capacity: number): number {
    const { weight: itemCost, cost: itemValue } = items[itemIndex];
    const vPrevious = value(itemIndex - 1, capacity);
    if (itemCost > capacity) {
      return vPrevious;
    }
    const vCombined = value(itemIndex - 1, capacity - itemCost) + itemValue;
    return vCombined > vPrevious ? vCombined : vPrevious;
  }

  function getItems() {
    const pack: Item[] = [];
    for (let i = itemsLength, capacity = maximumWeight; i >= 0; i -= 1) {
      if (value(i, capacity) <= value(i - 1, capacity)) {
        continue;
      }
      const item = items[i];
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
