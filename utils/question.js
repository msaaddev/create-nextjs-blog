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

	const getIntegrateTailwind = await dropDownPrompt({
		name: 'Tailwind CSS',
		message:
			'Do you want to integrate Tailwind CSS in Next.js blog? (Only TypeScript support ATM)',
		choices: ['Yes', 'No']
	});

	const getProjectLang = await dropDownPrompt({
		name: 'Project Language',
		message: 'What language do you want to use?',
		choices: ['JavaScript', 'TypeScript']
	});

	try {
		// get data from user
		const projectName = await getProjectName.run();
		let integrateTailwind = await getIntegrateTailwind.run();
		integrateTailwind = integrateTailwind === 'Yes' ? true : false;

		// set default value of projectLang
		let projectLang = 'TypeScript';

		// if user doesn't want to integrate Tailwind CSS
		if (!integrateTailwind) {
			projectLang = await getProjectLang.run();
		}

		return { projectName, projectLang, integrateTailwind };
	} catch (err) {
		handleError(err);
	}
};
