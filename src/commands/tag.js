import chalk from 'chalk';
import { execSync } from 'child_process';
import path from 'path';

import { stats } from '../utils/output.js';

export function checkoutTag(dirs, tag, action) {
  dirs.forEach(dir => {
    const currentPath = path.join(dir);

    console.log(chalk.blueBright(`\n\n* Running 'git checkout' on tag ${tag} in ${dir}...`));
    
    try {
      // Execute git fetch to get all tags
      execSync(`git fetch --tags`, { stdio: 'inherit' });

      // Execute git checkout on the current repo to the desired tag
      execSync(`git -C ${currentPath} checkout ${tag}`, { stdio: 'inherit' });

      stats.success++;
    }
    catch (error) {
      stats.failed++;
      console.error(chalk.red(`\n✖ Error executing checkout to tag '${tag}' in ${currentPath}: ${error.message}\n`));
    }
  });
}