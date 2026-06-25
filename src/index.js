#!/usr/bin/env node

import chalk from 'chalk';
import { execSync } from 'child_process';
import inquirer from 'inquirer';

import { printConfiguration, printResult } from './utils/output.js';
import { getRepos } from './utils/repos.js';

import { commands } from './commands/commands.js';


let localDirectories = [];


// #region Helper functions
function executeCommand(directories, branchOrTag, action) {
  // Action handler based on the selected action
  const actionHandler = commands[action];

  if (!actionHandler) {
    console.error(`Unknown action: ${action}`);
    process.exit(1);
  }

  try {
    // Executes the corresponding correct action
    actionHandler(directories, branchOrTag, action);
  }
  catch (err) {
    console.error(err.message);
    throw new Error(err);
  }
}
// #endregion Helper functions


async function main() {
  execSync('clear', { stdio: 'inherit' });
  console.log(chalk.blueBright('\n🚀 Automatic checkout process across multiple Git repositories 🚀\n'));

  try {
    localDirectories = await getRepos();

    console.log(chalk.green(`🔍 Repositories found in 'C:/SisproCloud/':\n`));
    console.log(chalk.yellow(`${localDirectories.join(',\n')}\n`));

    const answers = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'selectedRepos',
        message: 'Select repositories:',
        choices: localDirectories.map(dir => ({ name: dir, value: dir })),
      },

      {
        type: 'list',
        name: 'actionToPerform',
        message: 'Selec the git action to perform?',
        choices: [
          {  name: 'Pull changes from branch', value: 'pull' },
          {  name: 'Checkout to existing branch and pull', value: 'checkout' },
          {  name: 'Checkout to tag', value: 'tag' },
          {  name: 'Checkout to new branch', value: 'branch' }
        ],
        default: 'pull',
      },

      {
        type: 'input',
        name: 'intendedBranch',
        message: 'Enter the desired branch/tag (default DEV):',
        default: 'DEV',
      }
    ]);

    // Print configuration
    printConfiguration(answers.selectedRepos.join(', '), answers.actionToPerform, answers.intendedBranch);

    // Configuration confirmation and process start
    await inquirer.prompt({
      type: 'confirm',
      name: 'confirmData',
      message: 'Do you confirm the configuration above?',
      default: true,
    }).then(res => {

      if (!res.confirmData) return;

      console.log(chalk.greenBright(`\n✔ Configuration confirmed! Starting the process...\n`));

      console.log(chalk.greenBright(`.\n`));
      console.log(chalk.greenBright(`.\n`));
      console.log(chalk.greenBright(`.\n`));


      // Execute the intended command
      executeCommand(answers.selectedRepos, answers.intendedBranch || 'DEV', answers.actionToPerform);


      // Print results
      printResult();

      console.log(chalk.greenBright(`\nFinishing the process... see you next time 👋\n`));
    });

  }
  catch (error) {
    process.on('uncaughtException', (error) => {
      if (error instanceof Error && error.name === 'ExitPromptError') {
        console.log('Process cancelled! See you next time 👋');
      } else {
        console.error(chalk.red(`\n✖ An unexpected error occurred: ${error.message}\n`));
      }
    });

    console.error(chalk.red(`\n✖ An error occurred during the process: ${error.message}\n`));
  }
}


main();
