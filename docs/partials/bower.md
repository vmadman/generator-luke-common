# Partial: "luke:bower" ([source](../../generators/bower/index.js))

Adds Bower configurations to a project.

## Usage Example

```
$ yo luke:bower
```


## Files Created

* `bower.json` (template, [source](../../templates/core/_bower.json))
* `.bowerrc` (template, [source](../../templates/core/_bowerrc.json))
* `{bowerComponentsPath}/README.md` (template, [source](../../templates/core/_bower-readme.md))


## Other Operations

* Adds a Vagrant provisioning step: `npm-install-bower`


## Dependents

This [partial](../partials.md) is included by the following:

* [luke:grits](../project-scaffolds/grits.md) ([project scaffold](../project-scaffolds.md))

_Note: Additional, unlisted, [project scaffolds](../project-scaffolds.md) may
automatically include this [partial](../partials.md) by way of
[partial dependency](../partials.md#partial-dependency)._


# Further Reading

* [Source](../../generators/bower/index.js) - The source code for this [partial](../partials.md)
* [Partial Listing](./) - Individual docs for each [partial](../partials.md)
* [About Partials](../partials.md) - Information about partials
* [About Project Scaffolds](../project-scaffolds.md) - Basic information about project scaffolds
* [About Sub-Generators](../generators.md) - General information about generators and sub-generators
* [Project README](../../README.md) - Basic project information
