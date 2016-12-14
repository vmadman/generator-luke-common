# Luke's Yeoman Generator

<img src="https://cdn.rawgit.com/vmadman/generator-luke-common/master/docs/images/yeoman.svg" alt="Yeoman" width="100px" />

[![Travis](https://img.shields.io/travis/vmadman/generator-luke-common.svg)](https://travis-ci.org/vmadman/generator-luke-common)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/vmadman/generator-luke-common/master/LICENSE.md)
[![NPM](https://img.shields.io/npm/v/generator-luke.svg)](https://www.npmjs.com/package/generator-luke)
[![GitHub watchers](https://img.shields.io/github/watchers/vmadman/generator-luke-common.svg?style=social&label=Watch)](https://github.com/vmadman/generator-luke-common)


> Yeoman generator for scaffolding basic projects.  I give this generator to
developers who work for and with me in order to maintain consistent project
structure.  Although it was built for my own use, anyone can use it.

## Basic Usage

### Install w/ NPM

```
$ npm install -g yo generator-luke
```

### Usage Examples

Creating a project using the [default scaffold](docs/generators.md#project-scaffolds-1) ..

```
$ mkdir myproject
$ cd myproject
$ yo luke
```

Creating a project using a different [project scaffold](docs/generators.md#project-scaffolds-1) ..

```
$ mkdir myproject
$ cd myproject
$ yo luke:module
```

Using [partials](docs/generators.md#partials-1) to build individual components for a new or existing project..

```
$ mkdir myproject
$ cd myproject
$ yo luke:vagrant
```

Full usage information can be found in the "[Sub-Generators](docs/generators.md)" documentation.


## Documentation

* [Sub-Generators](docs/generators.md) - Usage information for all available sub-generators within this project.

## License

* See: [LICENSE.md](LICENSE.md)

## Development Links

* [GitHub Project Page](https://github.com/vmadman/generator-luke-common)
* [Travis-CI Project Page](https://travis-ci.org/vmadman/generator-luke-common)
* [NPM Package](https://www.npmjs.com/package/generator-luke)

