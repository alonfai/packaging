import path from 'path';
import Packer from './packet';

// Start file in development mode
if (process.env['NODE_ENV'] === 'development') {
  async function run() {
    const inputFilepath = path.join(__dirname, process.env['INPUT_FILE_PATH'] ?? '');
    const result = await Packer.pack(inputFilepath);

    // const outputFilepath = path.join(__dirname, process.env['OUTPUT_FILE_PATH'] ?? '');
    // Packer.writeFile(outputFilepath, result);
    console.log(result);
  }
  run();
}

export default Packer.pack;
