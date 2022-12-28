const exit = require('exit-cli');
const pkgJSON = require('../package.json');
const chalk = require('chalk');
const log = require('log-symbols');

module.exports = async () => {
	await exit({
		github: `https://github.com/msaaddev/create-next-blog`,
		twitter: `https://twitter.com/msaaddev`,
		pkgJSON
	});

	console.log();
	console.log(
		`${log.info} ${chalk.dim(
			'Liked my work?! Nominate @msaaddev for GitHub star: https://stars.github.com'
		)}`
	);
	console.log();
};
