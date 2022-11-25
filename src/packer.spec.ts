import path from 'path';
import { Packer } from './packer';

describe('packet', () => {
  describe('pack()', () => {
    it('should return a string of the set of item indexes that fits the selection critirea', async () => {
      const inputFilepath = path.join(__dirname, '../data/example_input');
      const output = Packer.pack(inputFilepath);
      const indexes = output.split(/\r?\n/);
      expect(indexes.length).toEqual(4);
      expect(indexes).toEqual(['4', '-', '7,2', '9,6']);
    });
  });
});
