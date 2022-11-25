import path from 'path';
import { Packer } from './packer';
import { writeFile } from './utils';

// Start file in development mode
if (process.env['NODE_ENV'] === 'development') {
  async function run() {
    const inputFilepath = path.join(__dirname, '../data/example_input');
    const result = await Packer.pack(inputFilepath);

    const outputFilepath = path.join(__dirname, '../data/data-output');
    writeFile(outputFilepath, result);
    console.log(`result equal:\r\n------------\r\n`, result);
  }
  run();
}

export default Packer.pack;
