# Partial: "luke:travis-grits" ([source](../../generators/travis-grits/index.js))

Generates a `.travis.yml` file with common options for Grits.js deployment.

## Usage Example

```
$ yo luke:travis-grits
```


## Files Created

* `scripts/grits/_vars.sh` (static, [source](../../grits/scripts/grits/_vars.sh))
* `.travis.yml` (static, [source](../../grits/_travis.yml))


## Other Operations

* Adds a NPM run script: `scripts/grits/render/ci.sh` (as `grits-render-ci`)


## Dependencies

This [partial](../partials.md) depends on, and automatically includes:

* [luke:package](../partials/package.md)
* [luke:grits-scripts](../partials/grits-scripts.md)


## Dependents

This [partial](../partials.md) is included by the following:

* [luke:grits](../project-scaffolds/grits.md) ([project scaffold](../project-scaffolds.md))

_Note: Additional, unlisted, [project scaffolds](../project-scaffolds.md) may
automatically include this [partial](../partials.md) by way of
[partial dependency](../partials.md#partial-dependency)._


# Further Reading

* [Source](../../generators/travis-grits/index.js) - The source code for this [partial](../partials.md)
* [Partial Listing](./) - Individual docs for each [partial](../partials.md)
* [About Partials](../partials.md) - Information about partials
* [About Project Scaffolds](../project-scaffolds.md) - Basic information about project scaffolds
* [About Sub-Generators](../generators.md) - General information about generators and sub-generators
* [Project README](../README.md) - Basic project information
