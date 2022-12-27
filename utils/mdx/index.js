const question = require('../question');
const { command } = require('execa');
const ora = require('ora');

module.exports = async () => {
	const { projectName, projectLang } = await question();
};
