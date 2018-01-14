# Partial: "luke:sls-config" ([source](../../generators/sls-config/index.js))

Generates the basic Serverless Framework configuration files.

## Usage Example

```
$ yo luke:sls-config
```


## Files Created

* `serverless.env.yml` (template, [source](../../templates/serverless/_serverless.env.yml))
* `serverless.yml` (template, [source](../../templates/serverless/_serverless.yml))
* `.sls/README.md` (static, [source](../../templates/serverless/_sls/_README.md))
* `.sls/projectConfig.json` (template, [source](../../templates/serverless/_sls/_projectConfig.json))
* `.sls/projectConfig.yml` (template, [source](../../templates/serverless/_sls/_projectConfig.yml))
* `.sls/serverless.common.yml` (template, [source](../../templates/serverless/_sls/_serverless.common.yml))


## Dependents

This [partial](../partials.md) is included by the following:

* [luke:sls-service](../project-scaffolds/sls-service.md) ([project scaffold](../project-scaffolds.md))

_Note: Additional, unlisted, [project scaffolds](../project-scaffolds.md) may
automatically include this [partial](../partials.md) by way of
[partial dependency](../partials.md#partial-dependency)._


# Further Reading

* [Source](../../generators/sls-config/index.js) - The source code for this [partial](../partials.md)
* [Partial Listing](./) - Individual docs for each [partial](../partials.md)
* [About Partials](../partials.md) - Information about partials
* [About Project Scaffolds](../project-scaffolds.md) - Basic information about project scaffolds
* [About Sub-Generators](../generators.md) - General information about generators and sub-generators
* [Project README](../../README.md) - Basic project information
