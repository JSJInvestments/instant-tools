#!/usr/bin/env node
import config from 'config';
import program from 'commander';
import clone from 'git-clone';
import chalk from 'chalk';
import pjson from '../package.json';
import { spawn } from 'child_process';
import pify from 'pify';
import fs from 'fs-extra';
import rimraf from 'rimraf';
// import firebase from 'firebase-tools';
// import path from 'path';

const print = {
  start: () => {
    console.log();
    console.log(chalk.bold.cyan(pjson.name) + ` version ${pjson.version}`);
    console.log();
  },
  create: (type, dir) => {
    // Creating a new React app in [/Users/craig/dev/sandbox/create-react-app-v2]green.
    console.log(
      `${chalk.bold.magenta(
        `Creating a new ${type} app in`
      )} ${chalk.bold.green(process.cwd() + '/' + dir)}`
    );
  },
  clone: url => {
    console.log(`${chalk.bold.cyan('Cloning')} ${url}...`);
  },
  install: () => {
    console.log(chalk.bold.cyan('Installing dependencies...'));
  },
  cleanup: () => {
    console.log(chalk.bold.cyan('Cleaning up...'));
  },
  end: dir => {
    console.log(
      `${chalk.bold.cyan('Application')} ${chalk.bold.green(
        dir
      )} ${chalk.bold.cyan('created!')}`
    );
    console.log(
      chalk.bold.magenta(
        'Please run `git init` and `firebase use --add` from your new directory to initialise your app and associate it  with a Firebase project'
      )
    );
    console.log();
  },
};

const cloneRepo = async (url, dir) => {
  try {
    print.clone(url);

    const exists = await fs.pathExists(dir);
    if (exists) {
      throw `Directory ${dir} already exists!`;
    } else {
      await pify(clone)(url, dir);
    }
  } catch (error) {
    throw error;
  }
};

const installDependencies = pify(async (dir, callback) => {
  try {
    print.install();

    const deps = spawn('npm', ['install'], {
      cwd: dir,
      stdio: 'inherit',
    });

    deps.on('error', error => {
      console.log(chalk.bold.red(error));
    });

    deps.on('close', callback);
  } catch (error) {
    throw error;
  }
});

const cleanup = async dir => {
  try {
    print.cleanup();
    console.log('Removing .git');
    rimraf(`${dir}/.git`, () => {});
    console.log('Removing .firebaserc');
    rimraf(`${dir}/.firebaserc`, () => {});
  } catch (error) {
    throw error;
  }
};

const createApplication = async (type, dir, cmd) => {
  try {
    print.create(type, dir);

    const repoUrl = config.get(`${type}.url`);
    await cloneRepo(repoUrl, dir);
    if (cmd.install) {
      await installDependencies(dir);
    }
    await cleanup(dir);

    // process.chdir(dir);
    // firebase.use({
    //   cwd: dir,
    // });

    print.end(dir);
  } catch (error) {
    throw error;
  }
};

export default async function execute() {
  try {
    let type;
    let name;
    let cmd;

    program
      .version('0.1.0')
      .command('create <type> <name>')
      .option('-i, --install', 'Install dependences')
      .action((t, n, c) => {
        type = t;
        name = n;
        cmd = c;
      });

    program.parse(process.argv);

    print.start();

    if (type === 'react' || type === 'node') {
      await createApplication(type, name, cmd);
    } else {
      throw 'Unrecognised application type. Options include `react` or `node`';
    }
  } catch (error) {
    console.log(chalk.bold.red(error));
  }
}
