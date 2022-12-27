const { command } = require('execa');
const ora = require('ora');
const handleError = require('node-cli-handle-error');
const question = require('../question');
const { start, succeed, fail } = require('../../functions/spinner');

/**
 * Create Next MDX blog
 *
 *
 */
module.exports = async () => {
	const { projectName, projectLang } = await question();
	const spinner = ora();
	console.log();
	try {
		start(spinner, 'Creating Next project...');
		if (projectLang === 'JavaScript') {
			await command(`npx create-next-app ${projectName}`);
		} else {
			await command(`npx create-next-app ${projectName} --typescript`);
		}
		succeed(spinner, 'Next project created successfully');
	} catch (err) {
		console.log();
		fail(spinner, err);
		handleError(err);
	}
};
