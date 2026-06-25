import chalk from 'chalk';

export const stats = {
  success: 0,
  failed: 0,
  skipped: 0,
};

export function printConfiguration(selectedRepos, actionToPerform, intendedBranch) {
  console.log(chalk.white(`\n🔧 Selected configuration:`));

  console.log(chalk.blueBright(`  - Repositories: ${selectedRepos}`));
  console.log(chalk.blueBright(`  - Operation: ${actionToPerform}`));
  console.log(chalk.blueBright(`  - Target branch: ${intendedBranch || 'DEV'}\n`));
}

export function printResult() {
  console.log(chalk.white(`\n\n🔧 Results report:`));

  console.log(chalk.green(`✔ ${stats.success} projects succeeded`));
  console.log(chalk.red(`✖ ${stats.failed} projects failed`));
  console.log(chalk.yellow(`⚠ ${stats.skipped} projects skipped`));
}