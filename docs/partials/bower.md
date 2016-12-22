# Partial: "luke:bower" ([source](../../generators/bower/index.js))

A [partial](../partials.md) that creates [Bower](https://bower.io/) meta files.

## Usage Example

```
$ yo luke:bower
```

## Files Created

* `/.bowerrc` (dynamic, [template](../../templates/core/_bowerrc.json))
* `/bower.json` (dynamic, [template](../../templates/core/_bower.json))
* `/{bower-dir}/README.md` (static, [source](../../templates/core/_bower-readme.md))

## Other Operations

* Adds a Vagrant provisioning step: `npm-install-bower`

## Dependencies

This [partial](../partials.md) does not depend on any others.

## Included In

This partial is included in the following [project scaffolds](../project-scaffolds.md):

* [luke:grits](../project-scaffolds/grits.md)

# Further Reading

* [Source](../../generators/bower/index.js) - The source code for this [partial](../partials.md)
* [Partial Listing](./) - Individual docs for each [partial](../partials.md)
* [About Partials](../partials.md) - Information about partials
* [About Project Scaffolds](../project-scaffolds.md) - Basic information about project scaffolds
* [About Sub-Generators](../generators.md) - General information about generators and sub-generators
* [Project README](../README.md) - Basic project information