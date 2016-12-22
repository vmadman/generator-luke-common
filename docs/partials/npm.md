# Partial: "luke:npm" ([source](../../generators/npm/index.js))

A [partial](../partials.md) that adds basic NPM meta files (.npmignore and .npmrc).

## Usage Example

```
$ yo luke:npm
```

## Files Created

* `/.npmignore` (static, [source](../../templates/core/_npmignore))
* `/.npmrc` (static, [source](../../templates/core/_npmrc))

## Other Operations

* Adds a Vagrant provisioning step: `yum-install-node-js`

## Dependencies

This [partial](../partials.md) does not depend on any others.

## Included In

* [luke:module](../project-scaffolds/module.md)

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