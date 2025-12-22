import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Resolve the directory of this script
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths relative to scripts/copy.js
const src = path.resolve(__dirname, "../../resources/styles/main.css");
const dest = path.resolve(__dirname, "../src/templates/main.css");

// Copy file
fs.copyFileSync(src, dest);
