export interface Pack {
  /**
   * Maximum allowed weight for a given list of items that a package can take
   */
  maxWeight: number;
  /**
   * Collection of the items
   */
  items: Item[];
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
