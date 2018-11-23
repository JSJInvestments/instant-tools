#!/usr/bin/env node
import config from 'config';
import program from 'commander';
import clone from 'git-clone';
import chalk from 'chalk';
import pjson from '../package.json';
import { spawn } from 'child_process';

const createApplication = async (type, name, cmd) => {
  const repoUrl = config.get(`${type}.url`);

  console.log(chalk.bold.magenta(`Initialising new ${type} application`));
  console.log(`${chalk.bold.cyan('Cloning')} ${repoUrl}...`);

  try {
    clone(repoUrl, name, () => {
      if (cmd.install) {
        console.log(chalk.bold.cyan('Installing dependencies...'));
        const deps = spawn('npm', ['install'], {
          cwd: name,
          stdio: 'inherit',
        });

        deps.on('error', () => {
          console.log(chalk.bold.red(error));
        });

        deps.on('close', code => {
          console.log(chalk.bold.cyan('Application created!'));
        });
      } else {
        console.log(chalk.bold.cyan('Application created!'));
      }
    });
  } catch (error) {
    console.error(error);
  }
};

program
  .version('0.1.0')
  .command('init <type> <name>')
  .option('-i, --install', 'Install dependences')
  .action(async (type, name, cmd) => {
    console.log();
    console.log(chalk.bold.cyan(pjson.name) + ` version ${pjson.version}`);
    console.log();

    if (type === 'react' || type === 'node') {
      createApplication(type, name, cmd);
    } else {
      throw new Error(
        'Unrecognised application type. Options include `react` or `node`'
      );
    }
  });

program.parse(process.argv);
