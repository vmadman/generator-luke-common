# Partial: "luke:sls-endpoints-dir" ([source](../../generators/sls-endpoints-dir/index.js))

Generates a [basically] empty`/endpoints` directory.
For the most part, this generator is used by other generators (such as the
sls-service generator), to ensure that the `/endpoints` directory exists.

## Usage Example

```
$ yo luke:sls-endpoints-dir
```


## Files Created

* `endpoints/README.md` (static, [source](../../templates/serverless/endpoints/_README.md))


## Dependents

This [partial](../partials.md) is included by the following:

* [luke:sls-service](../project-scaffolds/sls-service.md) ([project scaffold](../project-scaffolds.md))

_Note: Additional, unlisted, [project scaffolds](../project-scaffolds.md) may
automatically include this [partial](../partials.md) by way of
[partial dependency](../partials.md#partial-dependency)._


# Further Reading

* [Source](../../generators/sls-endpoints-dir/index.js) - The source code for this [partial](../partials.md)
* [Partial Listing](./) - Individual docs for each [partial](../partials.md)
* [About Partials](../partials.md) - Information about partials
* [About Project Scaffolds](../project-scaffolds.md) - Basic information about project scaffolds
* [About Sub-Generators](../generators.md) - General information about generators and sub-generators
* [Project README](../README.md) - Basic project information
