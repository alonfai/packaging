import { parseLineInputToPack, readFile } from './utils';
import { knapsack } from './knapsack';

export class Packer {
  /**
   * A method that accepts an absolute path to a test file as a string.
   * @param filePath A given path to load input data from
   * @returns A string for item indexes that their total weight is less than or equal to the package maxWeight limit and the total cost is as large as possible
   */
  static async pack(filePath: string) {
    const data = await readFile(filePath);
    const lines = data.split(/\r?\n/);
    let result = '';
    for (const line of lines) {
      const pack = parseLineInputToPack(line);

      const { items } = knapsack(pack);
      const indexes = items.map((item) => item.index);
      result = result.concat(indexes.length === 0 ? '-' : indexes.join(','), '\r\n');
    }
    return result.substring(0, result.length - 2);
  }
}
