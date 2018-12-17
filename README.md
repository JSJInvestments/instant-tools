# Instant Tools

Command Line Tools for assisting with creating [`instant`](https://github.com/cjmyles/instant) applications and generating project files.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Commands](#commands)
  - [create](#create)
  - [generate](#generate)
- [Contributing](#contributing)
- [License](#license)

## Installation

```bash
$ npm i instant-tools -g
```

You should now have access to the command `instant` in terminal.

## Usage

In order to execute a command, simply type the name of the command in teminal, after the word `instant`.

## Commands

### create

Create a new application.

```bash
$ instant create <type> <name> [-i]
```

type: string - the type of application, e.g 'react' or 'node'
name: string - the application name
-i: optional - install dependencies after the project templates have been cloned

#### Example Usage

```bash
$ instant create react my-react-app -i
```

### generate

Generate project files. Please ensure you execute this command within an existing project.

```bash
$ instant generate <template> <name>
```

template: string - the template to generate, e.g 'react/ui/component', 'react/ui/container', 'react/redux/module'
name: string - the file/variable name to use when creating template

## Contributing

We'd greatly appreciate any [contribution](CONTRIBUTING.md) you make.

## License

[MIT](LICENSE)
