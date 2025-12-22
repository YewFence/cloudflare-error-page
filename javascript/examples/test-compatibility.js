import { render } from '../dist/index.js';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Test all JSON configs from oringinal examples directory
const testConfigs = [
  { file: '../../examples/default.json', output: 'test-default.html' },
  { file: '../../examples/working.json', output: 'test-working.html' },
  { file: '../../examples/catastrophic.json', output: 'test-catastrophic.html' }
];

testConfigs.forEach(({ file, output }) => {
  try {
    const configPath = join(__dirname, file);
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

    console.log(`Testing: ${file}`);
    console.log(`Config keys: ${Object.keys(config).join(', ')}`);

    const html = render(config);

    const outputPath = join(__dirname, output);
    fs.writeFileSync(outputPath, html);
  } catch (error) {
    console.error(`Something went wrong: ${file}`);
    console.error(`Error: ${error.message}\n`);
  }
});
