import path from 'path';
import Packer from './packet';

// Start file in development mode
if (process.env['NODE_ENV'] === 'development') {
  async function run() {
    const filePath = path.join(__dirname, process.env['FILE_PATH'] ?? '');
    const result = await Packer.pack(filePath);
    console.log(result);
  }
  run();
}

export default Packer.pack;
