const handleError = require('node-cli-handle-error');
const { inputPrompt, dropDownPrompt } = require('./ask');

/**
 * Get data from user
 *
 *
 */
module.exports = async () => {
	const getProjectName = await inputPrompt({
		name: 'Project Name',
		message: 'What is the name of your project?'
	});

	const getProjectLang = await dropDownPrompt({
		name: 'Project Language',
		message: 'What language do you want to use?',
		choices: ['JavaScript', 'TypeScript']
	});

	try {
		const projectName = await getProjectName.run();
		const projectLang = await getProjectLang.run();
		return { projectName, projectLang };
	} catch (err) {
		handleError(err);
	}
};
