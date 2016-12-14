# Sub-Generators

## About Sub-Generators

This project, `generator-luke`, is considered to be a "Yeoman generator".
However, it is capable of generating different types of scaffolds for various
types of projects.  It is, therefore, subdivided into "sub-generators", with
each one generating a specific portion of a project scaffold.

When you run `yo luke`, you are, technically, running the generator.  However,
behind the scenes, you are also running the _default_ sub-generator, which
could also be run using `yo luke:app`.

While the default generator creates a minimal project scaffold, which is useful
for most of my projects, there are other options available.  Some options
produce even less than the minimal scaffold, while others create more advanced
scaffolds for specific types of projects.

One last thing before we dive into the sub-generators available.. there are two,
fundamental, types of generators...

### Project Scaffolds

These create a full project scaffold.  The default sub-generator, `luke:app`,
creates a minimal scaffold.  The other project scaffolds create more specific
scaffolds that include additional components (partials).

### Partials

Partials are composable scaffold components that include a relatively small
number of files and directories.

Project scaffolds are, actually, just a particular grouping of partials.
Depending on the project type, different partials are mixed together to form the
final scaffold.

You can, also, call partials directly to create individual components, one-by-one,
or as a means of recreating an individual part of an existing scaffold/project.

Finally, some partials actually _depend_ on other partials.  For example, the
`luke:vagrant` partial places files in the `env/` directory, which, itself, is
created by the `luke:env-dir` partial.  Partials will automatically include any
other partials that they need, so you may find slightly more output than
you expect.

## The Sub-Generator List

### Project Scaffolds

* `luke:app` *(default)* - A minimal scaffold applicable to most of my projects.
* `luke:module` - A generic scaffold for Node.js module projects

### Partials

* `luke:bower` - Creates the [Bower](https://bower.io/) meta files
* `luke:editor` - Adds editor configuration meta (.editorconfig)
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

