Using the Doc Generator
=======================

This document is on the todo list.. but here are a bunch of samples
that illustrate how the tags are used in sub-generator source files.


```
/**
 * This is a "partial" sub-generator that generates a very basic and generic
 * `package.json` file for the project.
 *
 * @partial
 * @promptsFor projectName, projectDesc, projectVersion, fullName
 * @promptsFor emailAddress, githubOwner, gitRepoName
 * @example
 * $ yo luke:package
 *
 * @author Luke Chavers <me@lukechavers.com>
 * @created 2016-12-14
 */

@operation Adds a NPM run script: `scripts/grits/render/ci.sh` (as `grits-render-ci`)

@creates static:core/env/vagrant/project/_README.md->env/vagrant/project/README.md
@creates generated:package.json
@creates template:core/env/vagrant/_provision.sh->env/vagrant/provision.sh


		case "scaffold":
			item.type = "scaffold";
			break;

		case "partial":
			item.type = "partial";
			break;

		case "example":
			item.example = tag.string;
			break;

		case "uses":
			parseUsesTag( item, tag );
			break;

		case "creates":
			parseCreatesTag( item, tag );
			break;

		case "promptsfor":
			parsePromptsForTag( item, tag );
			break;

		// ignore
		case "author":
		case "created":
			break;

		default:
			console.log("--- unknown tag!! ---");
			console.log( tag );
			break;
```