import fs from 'fs';
import path from 'path';

import { config } from '../config.js';

export async function getRepos() {
  return fs.readdirSync(config.root, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => path.join(config.root, entry.name))
    .filter(dir => fs.existsSync(path.join(dir, ".git")));
}