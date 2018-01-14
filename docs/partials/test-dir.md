# Partial: "luke:test-dir" ([source](../../generators/test-dir/index.js))

Generates a [basically] empty `/test` directory.
For the most part, this generator is used by other generators (such as the
mocha generator), to ensure that the `/test` directory exists.

## Usage Example

```
$ yo luke:test-dir
```


## Files Created

* `test/README.md` (static, [source](../../core/test/_README.md))
* `test/lib/README.md` (static, [source](../../core/test/lib/_README.md))


## Dependents

This [partial](../partials.md) is included by the following:

* [luke:mocha](./mocha.md) ([partial](../partials.md))

_Note: Additional, unlisted, [project scaffolds](../project-scaffolds.md) may
automatically include this [partial](../partials.md) by way of
[partial dependency](../partials.md#partial-dependency)._


# Further Reading

* [Source](../../generators/test-dir/index.js) - The source code for this [partial](../partials.md)
* [Partial Listing](./) - Individual docs for each [partial](../partials.md)
* [About Partials](../partials.md) - Information about partials
* [About Project Scaffolds](../project-scaffolds.md) - Basic information about project scaffolds
* [About Sub-Generators](../generators.md) - General information about generators and sub-generators
* [Project README](../README.md) - Basic project information
