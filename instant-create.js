#!/usr/bin/env node
const program = require('commander');
const clone = require('git-clone');
const chalk = require('chalk');
const { spawn } = require('child_process');
const pify = require('pify');
const fs = require('fs-extra');
const rimraf = require('rimraf');
// import firebase from 'firebase-tools';

const config = require('./config');

const print = {
  create: (type, dir) => {
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
        `Please run the following command to initialize your repository and associate the app with a Firebase project: \`cd ${dir} && git init && firebase use --add\``
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

    const repoUrl = config[type].url;
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

module.exports = () => {
  program
    .option('-i, --install', 'install dependences')
    .action(async (type, name, cmd) => {
      try {
        if (type === 'react' || type === 'node') {
          await createApplication(type, name, cmd);
        } else {
          throw 'Unrecognised application type. Options include `react` or `node`';
        }
      } catch (error) {
        console.log(chalk.bold.red(error));
      }
    })
    .parse(process.argv);
};
