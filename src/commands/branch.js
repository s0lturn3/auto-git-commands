import chalk from 'chalk';
import { execSync } from 'child_process';
import path from 'path';

import { stats } from '../utils/output.js';

export function createBranch(dirs, branch, action) {
  dirs.forEach(dir => {
    const currentPath = path.join(dir);

    console.log(chalk.blueBright(`\n\n* Running 'git checkout -b' on new branch '${branch}' in ${dir}...`));

    try {
      // Execute 'git checkout -b' on the current repo
      execSync(`git -C ${currentPath} checkout -b ${branch}`, { stdio: 'inherit' });
      stats.success++;
    }
    catch (error) {
      stats.failed++;
      console.error(chalk.red(`\n✖ Error executing ${action} in ${currentPath}: ${error.message}\n`));
    }
  });
}