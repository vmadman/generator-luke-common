Project Scripts
===============

Even though this project is not a Node.js project, we still use
`npm run` to execute the project scripts for it, because it helps to
keep us consistent, organized, and provides some handy functionality
that makes some things easier.

With that in mind, all of the "project scripts" for this project
must be executed by way of a call to `npm run`.

Although it may be possible to run the scripts for this project on any
Linux machine that has `npm` installed, these scripts were designed for
execution in one of two environments:

* Most scripts were designed to be executed on a pre-configured Cloud9
Development Environment ([More Info](http://www.c2c.aws/development/tools/cloud9/index.html)).
* The others were designed to be executed, exclusively, within a CI/CD
environment, such as Travis-CI.

You should never need to run the Travis-CI specific scripts, directly,
during development and you can distinguish them from the other scripts
because they'll have `ci` in their name, path, or in the script
name that is defined in `package.json`.


## Project Script Listing

This section still need to be written :(


## Further Reading

All documentation for this project stems from the main [README.md](../README.md)
in the project's root directory.  Please find additional articles and
documentation there.