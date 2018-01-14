# Partial: "luke:mocha" ([source](../../generators/mocha/index.js))

This is a "partial" sub-generator that generates a very minimal skeleton
for unit testing via Mocha and Chai.

## Usage Example

```
$ yo luke:mocha
```


## Files Created

* `scripts/test/_test-and-wait.sh` (static, [source](../../core/scripts/test/_test-and-wait.sh))


## Dependencies

This [partial](../partials.md) depends on, and automatically includes:

* [luke:test-dir](../partials/test-dir.md)


## Dependents

This [partial](../partials.md) is included by the following:

* [luke:grits](../project-scaffolds/grits.md) ([project scaffold](../project-scaffolds.md))
* [luke:module](../project-scaffolds/module.md) ([project scaffold](../project-scaffolds.md))
* [luke:sls-tests](./sls-tests.md) ([partial](../partials.md))

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
