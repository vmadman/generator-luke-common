# Partial: "luke:scripts" ([source](../../generators/scripts/index.js))

Generates the /scripts directory.

## Usage Example

```
$ yo luke:scripts
```


## Files Created

* `scripts/README.md` (static, [source](../../core/scripts/_README.md))
* `scripts/{script}` (generated)


## Other Operations

* Dynamically copies scripts that are specified by other partials.


## Dependents

This [partial](../partials.md) is included by the following:

* [luke:app](../project-scaffolds/app.md) ([project scaffold](../project-scaffolds.md))
* [luke:grits](../project-scaffolds/grits.md) ([project scaffold](../project-scaffolds.md))
* [luke:grits-scripts](./grits-scripts.md) ([partial](../partials.md))
* [luke:module](../project-scaffolds/module.md) ([project scaffold](../project-scaffolds.md))
* [luke:pm2](./pm2.md) ([partial](../partials.md))
* [luke:sls-service](../project-scaffolds/sls-service.md) ([project scaffold](../project-scaffolds.md))

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
