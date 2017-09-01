Project Scripts
===============

This directory contains the "project scripts" for this repository.
Collectively, the project scripts represent just about anything that you
can do to the project and its files at the project level.

Most (or all) of the project scripts within this directory will have
links in the `package.json` file, allowing you to run them using the
`npm run` command, like so:

```
$ cd /project
$ npm run do-something
```

You should always try to use the `npm run` command to execute scripts,
instead of executing them directly, because some scripts depend on
the environment variables that are injected by `npm` at run-time.