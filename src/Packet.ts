import fs from 'fs';
import * as constants from './constants';
import APIException from './error';
import { parseLineInputToPack } from './helpers';
import getKnapSack from './knapsack';
import { Pack } from './types';

class Packer {
  static async getPackOptimizedIndexes(input: Pack): Promise<number[]> {
    const output = getKnapSack(input);
    return [];
  }
  /**
   * A method that accepts an absolute path to a test file as a string.
   * @param filePath A given path to load input data from
   * @returns A string for item indexes that their total weight is less than or equal to the package maxWeight limit and the total cost is as large as possible
   */
  static async pack(filePath: string): Promise<string> {
    try {
      const data = fs.readFileSync(filePath, { encoding: constants.INPUT_FILE_ENCODING });
      const lines = data.split(/\r?\n/);
      let result = '';
      for (const line of lines) {
        const pack = parseLineInputToPack(line);
        const indexes = await Packer.getPackOptimizedIndexes(pack);
        result = result.concat(indexes.join(','), '\r\n');
      }
      return result;
    } catch (err) {
      throw new APIException(`${constants.ERRORS.INVALID_FILE_PATH} ${(err as Error).message}`);
    }
  }
}

export default Packer;
