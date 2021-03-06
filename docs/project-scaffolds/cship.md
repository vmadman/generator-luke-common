# Project Scaffold: "luke:cship" ([source](../../generators/cship/index.js))

This is a "project scaffold" sub-generator that generates a project scaffold
for Docker image production.  The initally generated project will, also, be
biased towards deployment to AWS ECR + Containership.io and development on an
AWS Cloud9 Development Environment.


## Usage Example

```
$ npm install -g yo generator-luke
$ mkdir my-project
$ cd my-project
$ yo luke:cship
```


## Included Partials

The following [partials](../partials.md) are included when this
[project scaffold](../project-scaffolds.md) is used/specified:

* [luke:package](../partials/package.md)
* [luke:mit-license](../partials/mit-license.md)
* [luke:editor](../partials/editor.md)
* [luke:git](../partials/git.md)
* [luke:scripts](../partials/scripts.md)
* [luke:cship-files](../partials/cship-files.md)

_Note: Additional, unlisted, [partials](../partials.md) may be automatically
included as [partial dependencies](../partials.md#partial-dependency)._


# Further Reading

* [Source](../../generators/cship/index.js) - The source code for this [project scaffold](../project-scaffolds.md)
* [Project Scaffold Listing](./) - Individual docs for each [project scaffold](../project-scaffolds.md)
* [About Project Scaffolds](../project-scaffolds.md) - Basic information about project scaffolds
* [About Partials](../partials.md) - Information about partials
* [About Sub-Generators](../generators.md) - General information about generators and sub-generators
* [Project README](../../README.md) - Basic project information
