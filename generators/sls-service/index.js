/**
 * This is a "project scaffold" sub-generator that generates a project scaffold
 * for a Serverless service (c2c style).
 *
 * @scaffold
 * @example
 * $ npm install -g yo generator-luke
 * $ mkdir my-project
 * $ cd my-project
 * $ yo luke:sls-service
 *
 * @uses package, sls-config, sls-endpoints-dir, sls-deps
 * @uses proprietary-license, readme, js, editor, git
 * @uses sls-tests, scripts
 * @author Luke Chavers <me@lukechavers.com>
 * @created 2017-08-31
 */

var yeoman = require( "yeoman-generator" );

module.exports = yeoman.generators.Base.extend({

	initializing : function() {

		// Locals
		var me = this;

		// Compose
		me.composeWith("luke:package");
		me.composeWith("luke:sls-config");
		me.composeWith("luke:sls-endpoints-dir");
		me.composeWith("luke:sls-deps");
		me.composeWith("luke:proprietary-license");
		me.composeWith("luke:readme");
		me.composeWith("luke:js");
		me.composeWith("luke:editor");
		//me.composeWith("luke:npm");
		me.composeWith("luke:git");
		//me.composeWith("luke:vagrant");
		me.composeWith("luke:sls-tests");
		me.composeWith("luke:scripts");
		//me.composeWith("luke:bower");
		//me.composeWith("luke:travis-grits");

		//README.md

	},

	configuring: function() {
		this.log(" ");
	}

});


/*

IMMEDIATE:
[X] /.sls (dir)
[X] /.sls/projectConfig.json
[X] /.sls/projectConfig.yml
[X] /.sls/serverless.common.yml
[X] /.sls/README.md
[X] /endpoints (dir)
[X] /endpoints/README.md
[X] /scripts (dir)
[X] /scripts/test (dir)
[X] /scripts/test/_test-and-wait.sh
[X] /scripts/test/run-unit-tests.sh
[X] /scripts/README.md
[X] /tests (dir)
[X] /tests/lib (dir)
[X] /tests/lib/util.js
[X] /tests/README.md
[X] /LICENSE.md
[ ] /package.json
[X] /serverless.env.yml
[X] /serverless.yml
[X] /typedefs.js



DEFERRED:
[ ] /README.md
[ ] /.travis.yml
[ ] /auth (dir)
[ ] /auth/README.md
[ ] /env (dir)
[ ] /env/README.md
[ ] /env/vagrant/project (dir)
[ ] /env/vagrant/project/README.md
[ ] /env/vagrant/README.md
[ ] /env/vagrant (dir)
[ ] /env/vagrant/project/pm2-gui (dir)
[ ] /env/vagrant/project/pm2-gui/pm2-gui-config.ini
[ ] /env/vagrant/project/pm2-gui/pm2-run-config.json
[ ] /env/vagrant/project/source-watchers/pm2-run-config.json
[?] /env/vagrant/project/load-credentials.sh
[ ] /env/vagrant/project/sls-devutils.sh
[ ] /env/vagrant/always.sh
[ ] /env/vagrant/github-exec.sh
[ ] /env/vagrant/provision.sh
[ ] /env/vagrant/tmp.sh
[ ] /scripts/deploy-to-dev-stage.sh
[ ] /scripts/pm2-gui-delete.sh
[ ] /scripts/pm2-gui-reload.sh
[ ] /scripts/pm2-gui-restart.sh
[ ] /scripts/pm2-gui-start.sh
[ ] /scripts/pm2-gui-status.sh
[ ] /scripts/pm2-gui-stop.sh
[ ] /scripts/update-devutils.sh
[ ] /scripts/view-logs.sh
[ ] /scripts/watchers-delete.sh
[ ] /scripts/watchers-monitor-logs.sh
[ ] /scripts/watchers-reload.sh
[ ] /scripts/watchers-restart.sh
[ ] /scripts/watchers-start.sh
[ ] /scripts/watchers-status.sh
[ ] /scripts/watchers-stop.sh
[X] /.editorconfig
[X] /.eslintrc
[X] /.gitattributes
[X] /.gitignore
[ ] /Vagrantfile
[ ] /yarn.lock



 */