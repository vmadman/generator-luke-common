<%= projectName %>
======================

[![Build Status](https://travis-ci.com/<%= githubOwner %>/<%= gitRepoName %>.svg?token=XXXXXXXXX&branch=master)](https://travis-ci.com/<%= githubOwner %>/<%= gitRepoName %>)

<%= projectDesc %>

The images produced by this project are deployed to AWS ECR which are
later deployed, as containers, to a [ContainerShip](https://cloud.containership.io/)
cluster.


## Documentation

1. [Installation](docs/installation.md)
2. [Image Hierarchy](docs/image-hierarchy.md)
3. [Developing the Base Image](docs/dev-base-image.md)
4. [Developing the Deploy Image](docs/dev-deploy-image.md) (todo)
5. [Project Scripts](docs/project-scripts.md)
6. [Deployment Configuration Notes](docs/deploy-config.md)


## Development Links

* [Travis-CI Project Page](https://travis-ci.com/<%= githubOwner %>/<%= gitRepoName %>)
* [GitHub Project Page](https://github.com/<%= githubOwner %>/<%= gitRepoName %>)
