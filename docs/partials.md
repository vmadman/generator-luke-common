# Partials

A "partial" is a type of "[sub-generator](generators.md)" that is used
to create a one part (or "component") of a project.  Partials typically only
include a small number or files and/or directories.

"[Project Scaffolds](project-scaffolds.md)" (the other [sub-generator](generators.md)
type), are particular collections and arrangements of various partials, but you
can also call partials, directly, when you only want to create or recreate a
single component, rather than an [entire project](project-scaffolds.md).

# Partial Dependency

Some partials _depend_ on other partials.  For example, the "[luke:vagrant](partials/vagrant.md)"
partial places files in the `env/` directory, which, itself, is created by the
[luke:env-dir](partials/env-dir.md) partial.  Partials will automatically
include any other partials that they need, so you may find slightly more output
than you expect in some cases.

# Basic Usage

Calling [a partial](partials/vagrant.md), directly:

```
$ mkdir myproject
$ cd myproject
$ yo luke:vagrant
```

# Partial Listing

Documentation for each "partial" can be found [here](partials/).

# Further Reading

* [Partial Listing](partials/) - Individual docs for each partial
* [Sub-Generators](generators.md) - General information about generators and sub-generators
* [Project Scaffolds](project-scaffolds.md) - The other type of sub-generator
* [Project README](../README.md) - Basic project information