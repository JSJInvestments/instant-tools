#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const pjson = require('./package.json');

module.exports = () => {
  console.log();
  console.log(chalk.bold.cyan(pjson.name) + ` version ${pjson.version}`);
  console.log();

  program
    .version(pjson.version)
    .description('Instant Tools')
    .command('create <type> <name>', 'create application')
    .alias('c')
    .command('generate <template> <name>', 'generate template')
    .alias('g')
    .parse(process.argv);
};
