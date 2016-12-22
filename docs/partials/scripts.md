# Partial: "luke:scripts" ([source](../../generators/scripts/index.js))

A [partial](../partials.md) that adds a scripts directory for `npm run` executions.

## Usage Example

```
$ yo luke:scripts
```

## Files Created

* `/scripts/READNE.md` (static, [source](../../templates/core/scripts/_README.md))
* `/scripts/*` (dynamic, _varies_)

## Other Operations

* Dynamically copies scripts that are specified by other partials.

## Dependencies

This [partial](../partials.md) does not depend on any others.

## Included In

* [luke:app](../project-scaffolds/app.md)
* [luke:module](../project-scaffolds/module.md)

_Note: Additional, unlisted, [project scaffolds](../project-scaffolds.md) may
automatically include this [partial](../partials.md) by way of
[partial dependency](../partials.md#partial-dependency)._

# Further Reading

* [Source](../../generators/scripts/index.js) - The source code for this [partial](../partials.md)
* [Partial Listing](./) - Individual docs for each [partial](../partials.md)
* [About Partials](../partials.md) - Information about partials
* [About Project Scaffolds](../project-scaffolds.md) - Basic information about project scaffolds
* [About Sub-Generators](../generators.md) - General information about generators and sub-generators
* [Project README](../README.md) - Basic project information