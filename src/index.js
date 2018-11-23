#!/usr/bin/env node
import config from 'config';
import program from 'commander';
import clone from 'git-clone';
import chalk from 'chalk';
import pjson from '../package.json';
import { spawn } from 'child_process';
import pify from 'pify';

const cloneRepo = pify((url, name, callback) => {
  try {
    console.log(`${chalk.bold.cyan('Cloning')} ${url}...`);
    clone(url, name, callback);
  } catch (error) {
    console.log(chalk.bold.red(error));
  }
});

const installDependencies = pify(async (dir, callback) => {
  try {
    console.log(chalk.bold.cyan('Installing dependencies...'));
    const deps = spawn('npm', ['install'], {
      cwd: dir,
      stdio: 'inherit',
    });

    deps.on('error', error => {
      console.log(chalk.bold.red(error));
    });

    deps.on('close', callback);
  } catch (error) {
    console.log(chalk.bold.red(error));
  }
});

const createApplication = async (type, name, cmd) => {
  console.log(chalk.bold.magenta(`Initialising new ${type} application`));

  try {
    const repoUrl = config.get(`${type}.url`);
    await cloneRepo(repoUrl, name);
    if (cmd.install) {
      await installDependencies(name);
    }
    console.log(chalk.bold.cyan('Application created!'));
  } catch (error) {
    console.log(chalk.bold.red(error));
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
