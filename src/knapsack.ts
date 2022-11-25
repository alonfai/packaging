import { Pack } from './types';

function knapsack(
  capacity: number,
  n: number,
  values: number[],
  weights: number[],
  lookup: Map<string, number>,
): number {
  // base case: when we cannot have take more items
  if (capacity < 0) {
    return Number.MIN_SAFE_INTEGER;
  }

  // Check capacity and items on zero
  if (capacity === 0 || n < 0) {
    return 0;
  }

  // Unique key for map for memoization
  const key = `${n}|${capacity}`;

  // If the sub-problem is appearing for first time, solve it and store its result in the map
  if (!lookup.has(key)) {
    // pick current item n in knapSack and recur
    // for remaining items (n-1) with reduced capacity (capacity - weights[n])
    const include = values[n] + knapsack(capacity - weights[n], n - 1, values, weights, lookup);

    // leave current item n from knapSack and recurcive call for remaining items (n-1)
    const exclude = knapsack(capacity, n - 1, values, weights, lookup);

    // Assign max value we get by picking or leaving the current item
    lookup.set(key, Math.max(include, exclude));
  }

  // return setting the value to the map
  return lookup.get(key) ?? 0;
}

// Prints the items which are put
// in a knapsack of capacity W
export function getKnapSack(inputPack: Pack) {
  const W = inputPack.maxWeight;
  const wt = inputPack.items.map((item) => item.weight);
  const val = inputPack.items.map((item) => item.cost);
  const n = val.length;
  const lookup = new Map();

  const values = [10, 20, 30, 40];
  const weights = [30, 10, 40, 20];
  const capacity = 40;

  const res = knapsack(capacity, values.length - 1, values, weights, lookup);
  return res;
}
