import fs from 'fs';
import * as constants from './constants';
import { APIException } from './error';
import { parseLineInputToPack } from './utils';
import { getKnapSack } from './knapsack';
import { Pack } from './types';

class Packer {
  static async getPackOptimizedIndexes(input: Pack): Promise<number[]> {
    const output = getKnapSack(input);
    return [];
  }

  static readFile(filePath: string) {
    try {
      return fs.readFileSync(filePath, { encoding: constants.INPUT_FILE_ENCODING });
    } catch (err) {
      throw new APIException(`${constants.ERRORS.INVALID_FILE_PATH} ${(err as Error).message}`);
    }
  }

  static writeFile(filePath: string, data: string) {
    try {
      fs.writeFileSync(filePath, data);
    } catch (err) {
      throw new APIException(`${constants.ERRORS.INVALID_FILE_PATH} ${(err as Error).message}`);
    }
  }

  /**
   * A method that accepts an absolute path to a test file as a string.
   * @param filePath A given path to load input data from
   * @returns A string for item indexes that their total weight is less than or equal to the package maxWeight limit and the total cost is as large as possible
   */
  static async pack(filePath: string): Promise<string> {
    const data = Packer.readFile(filePath);
    const lines = data.split(/\r?\n/);
    let result = '';
    for (const line of lines) {
      const pack = parseLineInputToPack(line);
      const indexes = await Packer.getPackOptimizedIndexes(pack);
      result = result.concat(indexes.join(','), '\r\n');
    }
    return result;
  }
}

export default Packer;
