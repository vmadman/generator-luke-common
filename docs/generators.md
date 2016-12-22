# Sub-Generators

## About Sub-Generators

This project, `generator-luke`, is considered to be a "Yeoman generator".
However, it is capable of generating different types of scaffolds for various
types of projects.  It is, therefore, subdivided into "sub-generators", with
each one generating a specific project type or portion thereof.

When you run `yo luke`, you are, technically, running the generator.  However,
behind the scenes, you are also running the _default_ sub-generator
("[app](project-scaffolds/app.md)"), which could also be run using `yo luke:app`.

While the [default sub-generator](project-scaffolds/app.md) creates a minimal
project scaffold, which is useful for most of my projects, there are other
options available.  [Some options](partials.md) produce even less than the
minimal scaffold, while others create more advanced scaffolds for specific types
of projects.

## Sub-Generator Types

There are two fundamental types of sub-generators:

* [Project Scaffolds](project-scaffolds.md) - Used to create a new project
* [Partials](partials.md) - Small, composable, project parts (aka "components")

_Note: Yeoman does not officially recognize this project's terminology for
"project scaffolds" and "partials", it is my own terminology._

# Further Reading

* [Project README](../README.md) - Basic project information


---




# Further Reading

* [Project Scaffolds](project-scaffolds.md) - Sub-generators for creating/recreating full projects
* [Partials](partials.md) - Sub-generators for creating/recreating individual project components

## The Sub-Generator List

### Project Scaffolds

* `luke:app` *(default)* - A minimal scaffold applicable to most of my projects.
* `luke:module` - A generic scaffold for Node.js module projects

### Partials

* `luke:env-dir` - Creates the `env/` directory and a few placeholder README files.
* `luke:git` - Creates a few GIT meta files
* `luke:js` - Adds meta files for JS development, such as linting configurations
* `luke:mit-license` - Adds a LICENSE.md file with an MIT license
* `luke:mocha` - Adds a basic mocha scaffold for JS unit tests
* `luke:npm` - Adds basic NPM meta files (.npmignore and .npmrc)
* `luke:package` - Creates a basic `package.json` file
* `luke:readme` - Creates a basic `README.md` with a generic message/description
* `luke:scripts` - Adds a scripts directory for `npm run` executions
* `luke:test-dir` - Creates the fundamental directories for unit testing (`test/`)
* `luke:vagrant` - Creates a basic Vagrant configuration w/ provisioning steps

