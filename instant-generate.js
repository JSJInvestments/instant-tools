#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const namedCasex = require('./namedCasex');

const templates = [
  {
    id: 'react/ui/component',
    outputDir: 'src/components',
  },
  {
    id: 'react/ui/container',
    outputDir: 'src/containers',
  },
  {
    id: 'react/redux/module',
    outputDir: 'src/redux/modules',
  },
  // {
  //   id: 'react/api/fetch',
  //   outputDir: 'src/api'
  // },
  // {
  //   id: 'react/api/firestore',
  //   outputDir: 'src/api',
  // },
];

const print = {
  generate: (id, name) =>
    console.log(chalk.bold.magenta(`Generating a new ${id} template`)),
  exists: path =>
    console.log(`${chalk.bold.yellow(`${path} exists. Skipping!`)}`),
  created: path =>
    console.log(
      `${chalk.bold.cyan('Generated file')} ${chalk.bold.green(path)}`
    ),
  end: () => console.log(),
};

class Template {
  constructor(id) {
    const template = templates.find(t => t.id === id);
    this.id = id;
    this.inputDir = path.join(__dirname, 'templates', this.id);
    this.outputDir = path.join(process.cwd(), template.outputDir);
    // console.log('inputDir', this.inputDir);
    // console.log('outputDir', this.outputDir);
  }

  create(name) {
    const files = fs.readdirSync(this.inputDir);
    files.forEach(filePath => {
      let content =
        fs.readFileSync(path.join(this.inputDir, filePath), 'utf8') || '';
      content = namedCasex(content, name);
      const outputPath = path.join(this.outputDir, namedCasex(filePath, name));
      const exists = fs.pathExistsSync(outputPath);
      if (exists) {
        print.exists(outputPath);
      } else {
        fs.ensureFileSync(outputPath);
        fs.writeFileSync(outputPath, content);
        print.created(outputPath);
      }
    });
  }
}

function generateTemplate(id, name, cmd) {
  try {
    print.generate(id, name);
    const template = new Template(id);
    template.create(name);
  } catch (error) {
    throw error;
  }
}

module.exports = () => {
  program
    // .option('-i, --install', 'install dependences')
    .action(async (template, name, cmd) => {
      try {
        if (templates.map(t => t.id).indexOf(template) !== -1) {
          await generateTemplate(template, name, cmd);
          print.end();
        } else {
          throw `Unrecognised template type. Options include ${templates
            .map(t => t.id)
            .join(', ')}`;
        }
      } catch (error) {
        console.log(chalk.bold.red(error));
      }
    })
    .parse(process.argv);
};
