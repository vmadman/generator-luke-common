# Project Scaffolds

A "project scaffold" is a type of "[sub-generator](generators.md)" that is used
to create a new, full, project or to overwrite all or part of an existing project.

The [default sub-generator](project-scaffolds/app.md), `luke:app`, creates a
minimal project scaffold.  The [other project scaffolds]((project-scaffolds/))
create more specific scaffolds that include additional components
("[partials](partials.md)").

# Basic Usage

Creating a project using the [default scaffold](project-scaffolds/app.md):

```
$ mkdir myproject
$ cd myproject
$ yo luke
```

Creating a project using [another project scaffold](project-scaffolds/module.md):

```
$ mkdir myproject
$ cd myproject
$ yo luke:module
```

# Project Scaffold Listing

Documentation for each "project scaffold" can be found [here](project-scaffolds/).

# Further Reading

* [Project Scaffold Listing](project-scaffolds/) - Individual docs for each [project scaffold](../project-scaffolds.md)
* [Sub-Generators](generators.md) - General information about generators and sub-generators
* [Partials](partials.md) - The other type of sub-generator
* [Project README](../README.md) - Basic project information