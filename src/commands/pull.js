import chalk from 'chalk';
import { execSync } from 'child_process';
import path from 'path';

import { stats } from '../utils/output.js';

export function pull(dirs, branch, action) {
  dirs.forEach(dir => {
    const currentPath = path.join(dir);

    console.log(chalk.blueBright(`\n\n* Running 'git pull' on branch ${branch} in ${dir}...`));

    try {
      // Execute pull after checkout (if any)
      execSync(`git -C ${currentPath} pull origin ${branch} --prune`, { stdio: 'inherit' });
      stats.success++;
    }
    catch (error) {
      stats.failed++;
      throw new Error(`\n✖ Error executing ${action} in ${currentPath}: ${error.message}\n`);
    }
  });
}

export function pullSingle(dir, branch, action) {
  const currentPath = path.join(dir);

  console.log(chalk.blueBright(`\n* Running 'git pull' on branch ${branch} in ${dir}...`));

  try {
    // Execute pull after checkout (if any)
    execSync(`git -C ${currentPath} pull origin ${branch} --prune`, { stdio: 'inherit' });
    stats.success++;
  }
  catch (error) {
    stats.failed++;
    throw new Error(`\n✖ Error executing ${action} in ${currentPath}: ${error.message}\n`);
  }
}