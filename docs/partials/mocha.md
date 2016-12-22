# Partial: "luke:mocha" ([source](../../generators/mocha/index.js))

A [partial](../partials.md) that adds a basic mocha scaffold for JS unit tests.

## Usage Example

```
$ yo luke:mocha
```

## Files Created

* `/test/index.js` (static, [source](../../templates/core/test/_mocha-index.js))
* `/test/lib/util.js` (static, [source](../../templates/core/test/lib/_util.js))

## Other Operations

* Adds a NPM run script: `scripts/test.sh` (as `test`)

## Dependencies

This [partial](../partials.md) depends on, and automatically includes:

* [luke:test-dir](../partials/test-dir.md)

## Included In

* [luke:module](../project-scaffolds/module.md)

_Note: Additional, unlisted, [project scaffolds](../project-scaffolds.md) may
automatically include this [partial](../partials.md) by way of
[partial dependency](../partials.md#partial-dependency)._

# Further Reading

* [Source](../../generators/mocha/index.js) - The source code for this [partial](../partials.md)
* [Partial Listing](./) - Individual docs for each [partial](../partials.md)
* [About Partials](../partials.md) - Information about partials
* [About Project Scaffolds](../project-scaffolds.md) - Basic information about project scaffolds
* [About Sub-Generators](../generators.md) - General information about generators and sub-generators
* [Project README](../README.md) - Basic project information