# Partial: "luke:vagrant" ([source](../../generators/vagrant/index.js))

Generates a very basic `Vagrantfile` and provision configuration for the project.

## Usage Example

```
$ yo luke:vagrant
```


## Files Created

* `env/vagrant/always.sh` (static, [source](../../templates/core/env/vagrant/_always.sh))
* `env/vagrant/github-exec.sh` (static, [source](../../templates/core/env/vagrant/_github-exec.sh))
* `env/vagrant/README.md` (static, [source](../../templates/core/env/vagrant/_README.md))
* `env/vagrant/tmp.sh` (static, [source](../../templates/core/env/vagrant/_tmp.sh))
* `env/vagrant/project/README.md` (static, [source](../../templates/core/env/vagrant/project/_README.md))
* `Vagrantfile` (template, [source](../../templates/core/_Vagrantfile))
* `env/vagrant/provision.sh` (template, [source](../../templates/core/env/vagrant/_provision.sh))


## Dependents

This [partial](../partials.md) is included by the following:

* [luke:app](../project-scaffolds/app.md) ([project scaffold](../project-scaffolds.md))
* [luke:grits](../project-scaffolds/grits.md) ([project scaffold](../project-scaffolds.md))
* [luke:module](../project-scaffolds/module.md) ([project scaffold](../project-scaffolds.md))

_Note: Additional, unlisted, [project scaffolds](../project-scaffolds.md) may
automatically include this [partial](../partials.md) by way of
[partial dependency](../partials.md#partial-dependency)._


# Further Reading

* [Source](../../generators/vagrant/index.js) - The source code for this [partial](../partials.md)
* [Partial Listing](./) - Individual docs for each [partial](../partials.md)
* [About Partials](../partials.md) - Information about partials
* [About Project Scaffolds](../project-scaffolds.md) - Basic information about project scaffolds
* [About Sub-Generators](../generators.md) - General information about generators and sub-generators
* [Project README](../README.md) - Basic project information
