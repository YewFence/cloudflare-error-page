import { render } from '../dist/index.js';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Generate an error page
const errorPage = render({
  browser_status: {
    status: 'ok',
  },
  cloudflare_status: {
    status: 'error',
    status_text: 'Error',
  },
  host_status: {
    status: 'ok',
    location: 'example.com',
  },
  error_source: 'cloudflare',

  what_happened: '<p>There is an internal server error on Cloudflare\'s network.</p>',
  what_can_i_do: '<p>Please try again in a few minutes.</p>',
});

const outputPath = join(__dirname, 'error.html');
fs.writeFileSync(outputPath, errorPage);

console.log(`Error page generated: ${outputPath}`);
console.log('Open the file in your browser to view it.');
