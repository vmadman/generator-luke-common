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