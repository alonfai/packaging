export interface Pack {
  /**
   * Maximum allowed weight for a given list of items that a package can take
   */
  maximumWeight: number;
  /**
   * Collection of the items
   */
  items: Item[];
}

/**
 * Knapsack method result type
 */
export interface Result {
  /**
   * Get maximum cost available in the package
   */
  getMaxCost: () => number;
  /**
   * list of items giving the maximum cost when their total weight is less than or equal to the package max weight limit
   */
  getItems: () => Item[];
}

/**
 * A given item
 */
export interface Item {
  /**
   * index of the item in package
   */
  index: number;
  /**
   * the item weight
   */
  weight: number;
  /**
   * the item cost
   */
  cost: number;
  /**
   * Currency for the item
   */
  currency: string;
}
