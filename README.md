# Instant Tools

CLI for assisting with common tasks such as creating applications and generating project files.

## Installation

```bash
$ npm i @hbagroup/instant-tools -g
```

You should now have access to the command `instant` in terminal.

## Commands

In order to execute a command, simply type the name of the command in teminal, after the word `instant`.

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

## Development

To contribute to the codebase, clone the repository and install the dependencies:

```bash
git clone https://github.com/JSJInvestments/instant-tools.git
cd instant-tools && npm i
```

Modify `bin` and `src` files accordingly.

Increment the [semver](https://semver.org/) version in package.json.

Run `npm link` to enable the `instant` command in development.

## Publication

Publish to npm:

```bash
$ npm publish
```

## Running Tests

```bash
npm run test
```

## License
