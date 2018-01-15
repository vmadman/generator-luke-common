# Partial: "luke:cship-files" ([source](../../generators/cship-files/index.js))

This is a "partial" sub-generator that generates a simple scaffold for
authoring Docker containers using the "Base/Deploy" pattern.

## Usage Example

```
$ yo luke:docker-bd
```


## Files Created

* `scripts/base-image/build-base-image.sh` (static, [source](../../templates/docker-bd-ecr-cship/scripts/base-image/_build-base-image.sh))
* `scripts/base-image/run-shell.sh` (static, [source](../../templates/docker-bd-ecr-cship/scripts/base-image/_run-shell.sh))
* `scripts/deploy-image/build-deploy-image.sh` (static, [source](../../templates/docker-bd-ecr-cship/scripts/deploy-image/_build-deploy-image.sh))
* `scripts/deploy-image/run-shell.sh` (static, [source](../../templates/docker-bd-ecr-cship/scripts/deploy-image/_run-shell.sh))
* `scripts/deploy-image/run-in-foreground.sh` (static, [source](../../templates/docker-bd-ecr-cship/scripts/deploy-image/_run-in-foreground.sh))
* `scripts/ci/push-base-image-to-ecr.sh` (static, [source](../../templates/docker-bd-ecr-cship/scripts/ci/push-base-image-to-ecr.sh))
* `scripts/ci/push-deploy-image-to-ecr.sh` (static, [source](../../templates/docker-bd-ecr-cship/scripts/ci/push-deploy-image-to-ecr.sh))
* `scripts/ci/update-cs-application.sh` (static, [source](../../templates/docker-bd-ecr-cship/scripts/ci/update-cs-application.sh))
* `scripts/containership/force-production-relaunch.sh` (static, [source](../../templates/docker-bd-ecr-cship/scripts/containership/force-production-relaunch.sh))
* `scripts/containership/show-production-status.sh` (static, [source](../../templates/docker-bd-ecr-cship/scripts/containership/show-production-status.sh))
* `scripts/_vars.sh` (template, [source](../../templates/docker-bd-ecr-cship/scripts/_vars.sh))
* `docker/base-image/config/README.md` (static, [source](../../templates/docker-bd-ecr-cship/docker/base-image/config/_README.md))
* `docker/base-image/Dockerfile` (template, [source](../../templates/docker-bd-ecr-cship/docker/base-image/_Dockerfile))
* `docker/deploy-image/config/README.md` (static, [source](../../templates/docker-bd-ecr-cship/docker/deploy-image/config/_README.md))
* `docker/deploy-image/Dockerfile` (template, [source](../../templates/docker-bd-ecr-cship/docker/deploy-image/_Dockerfile))
* `docs/deploy-config.md` (static, [source](../../templates/docker-bd-ecr-cship/docs/_deploy-config.md))
* `docs/dev-base-image.md` (static, [source](../../templates/docker-bd-ecr-cship/docs/_dev-base-image.md))
* `docs/dev-deploy-image.md` (static, [source](../../templates/docker-bd-ecr-cship/docs/_dev-deploy-image.md))
* `docs/image-hierarchy.md` (static, [source](../../templates/docker-bd-ecr-cship/docs/_image-hierarchy.md))
* `docs/installation.md` (static, [source](../../templates/docker-bd-ecr-cship/docs/_installation.md))
* `docs/project-scripts.md` (static, [source](../../templates/docker-bd-ecr-cship/docs/_project-scripts.md))
* `.travis.yml` (static, [source](../../templates/docker-bd-ecr-cship/_travis.yml))
* `README.md` (template, [source](../../templates/docker-bd-ecr-cship/_README.md))


## Other Operations

* Adds a NPM run script named `base:build`
* Adds a NPM run script named `base:shell`
* Adds a NPM run script named `deploy:build`
* Adds a NPM run script named `deploy:shell`
* Adds a NPM run script named `deploy:fg`
* Adds a NPM run script named `ci:base:push`
* Adds a NPM run script named `ci:deploy:push`
* Adds a NPM run script named `ci:base:cs`
* Adds a NPM run script named `cship:relaunch`
* Adds a NPM run script named `cship:status`


## Dependents

This [partial](../partials.md) is included by the following:

* [luke:cship](../project-scaffolds/cship.md) ([project scaffold](../project-scaffolds.md))

_Note: Additional, unlisted, [project scaffolds](../project-scaffolds.md) may
automatically include this [partial](../partials.md) by way of
[partial dependency](../partials.md#partial-dependency)._


# Further Reading

* [Source](../../generators/cship-files/index.js) - The source code for this [partial](../partials.md)
* [Partial Listing](./) - Individual docs for each [partial](../partials.md)
* [About Partials](../partials.md) - Information about partials
* [About Project Scaffolds](../project-scaffolds.md) - Basic information about project scaffolds
* [About Sub-Generators](../generators.md) - General information about generators and sub-generators
* [Project README](../../README.md) - Basic project information
