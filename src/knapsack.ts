import { Item, Pack, Result } from './types';

export function knapsack({ maximumWeight, items }: Pack): Result {
  const maxItemIndex = items.length - 1;
  const totalCapacity = maximumWeight;
  const memo: number[] = [];

  function value(itemIndex: number, capacity: number) {
    if (itemIndex < 0 || capacity <= 0) {
      return 0;
    }

    const key = totalCapacity * itemIndex + (capacity - 1);
    if (!!memo[key]) {
      return memo[key];
    }
    return (memo[key] = calculateValue(itemIndex, capacity));
  }

  function calculateValue(itemIndex: number, capacity: number): number {
    const { weight: itemCost, cost: itemValue } = items[itemIndex];
    const vPrevious = value(itemIndex - 1, capacity);
    if (itemCost > capacity) {
      return vPrevious;
    }
    const vCombined = value(itemIndex - 1, capacity - itemCost) + itemValue;
    return vCombined > vPrevious ? vCombined : vPrevious;
  }

  function select() {
    const bag: Item[] = [];
    for (let i = maxItemIndex, capacity = totalCapacity; i >= 0; i -= 1) {
      if (value(i, capacity) <= value(i - 1, capacity)) {
        continue;
      }
      const item = items[i];
      capacity -= item.weight;
      bag.push(item);
    }
    return bag;
  }

  return {
    getMaxCost: () => {
      return value(maxItemIndex, totalCapacity);
    },
    getItems: select,
  };
}

export const maximumValue: (pack: Pack) => number = (pack) => knapsack(pack).getMaxCost();
