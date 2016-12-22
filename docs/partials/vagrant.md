# Partial: "luke:vagrant" ([source](../../generators/vagrant/index.js))

A [partial](../partials.md) that creates a basic Vagrant configuration with 
provisioning steps.

## Usage Example

```
$ yo luke:vagrant
```

## Files Created

* `/Vagrantfile` (dynamic, [template](../../templates/core/_Vagrantfile))
* `/env/vagrant/provision.sh` (dynamic, [template](../../templates/core/env/vagrant/_provision.sh))
* `/env/vagrant/always.sh` (static, [source](../../templates/core/env/vagrant/_always.sh))
* `/env/vagrant/github-exec.sh` (static, [source](../../templates/core/env/vagrant/_github-exec.sh))
* `/env/vagrant/README.md` (static, [source](../../templates/core/env/vagrant/_README.md))
* `/env/vagrant/tmp.sh` (static, [source](../../templates/core/env/vagrant/_tmp.sh))
* `/env/vagrant/project/README.md` (static, [source](../../templates/core/env/vagrant/project/_README.md))

## Other Operations

This [partial](../partials.md) only creates files and/or directories.

## Dependencies

This [partial](../partials.md) does not depend on any others.

## Included In

* [luke:app](../project-scaffolds/app.md)
* [luke:module](../project-scaffolds/module.md)

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