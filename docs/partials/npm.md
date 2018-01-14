# Partial: "luke:npm" ([source](../../generators/npm/index.js))

This is a "partial" sub-generator that generates a few standard NPM meta files.

## Usage Example

```
$ yo luke:npm
```


## Files Created

* `.npmrc` (static, [source](../../templates/core/_npmrc))
* `.npmignore` (static, [source](../../templates/core/_npmignore))


## Dependents

This [partial](../partials.md) is included by the following:

* [luke:grits](../project-scaffolds/grits.md) ([project scaffold](../project-scaffolds.md))
* [luke:module](../project-scaffolds/module.md) ([project scaffold](../project-scaffolds.md))

_Note: Additional, unlisted, [project scaffolds](../project-scaffolds.md) may
automatically include this [partial](../partials.md) by way of
[partial dependency](../partials.md#partial-dependency)._


# Further Reading

* [Source](../../generators/npm/index.js) - The source code for this [partial](../partials.md)
* [Partial Listing](./) - Individual docs for each [partial](../partials.md)
* [About Partials](../partials.md) - Information about partials
* [About Project Scaffolds](../project-scaffolds.md) - Basic information about project scaffolds
* [About Sub-Generators](../generators.md) - General information about generators and sub-generators
* [Project README](../README.md) - Basic project information
