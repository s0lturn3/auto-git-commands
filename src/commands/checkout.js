import chalk from 'chalk';
import { execSync } from 'child_process';
import path from 'path';

import { pullSingle } from './pull.js';

export function checkoutBranch(dirs, branch, action) {
  dirs.forEach(dir => {
    const currentPath = path.join(dir);

    console.log(chalk.blueBright(`\n\n* Running 'git checkout' on branch ${branch} in ${dir}...`));

    try {
      // Execute git checkout on the current repo
      execSync(`git -C ${currentPath} checkout ${branch}`, { stdio: 'inherit' });

      // Execute git pull command on the current repo
      pullSingle(dir, branch, action);
    }
    catch (error) {
      console.error(chalk.red(`\n✖ Error executing ${action} in ${currentPath}: ${error.message}\n`));
    }
  });
}