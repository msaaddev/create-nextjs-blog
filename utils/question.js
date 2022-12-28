const handleError = require('node-cli-handle-error');
const { inputPrompt, dropDownPrompt } = require('./ask');

/**
 * Get data from user
 *
 * @param {Object} flags - Flags from CLI
 */
module.exports = async ({ withTailwind, typescript, javascript }) => {
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

		let integrateTailwind = withTailwind;
		if (!withTailwind && !javascript) {
			integrateTailwind = await getIntegrateTailwind.run();
			integrateTailwind = integrateTailwind === 'Yes' ? true : false;
		}

		// set default value of projectLang
		let projectLang = 'TypeScript';

		// if user doesn't want to integrate Tailwind CSS
		if (!integrateTailwind) {
			// if user doesn't pass --typescript or --javascript flag
			if (!typescript && !javascript) {
				projectLang = await getProjectLang.run();
			} else if (javascript) {
				// if user pass --javascript flag
				projectLang = 'JavaScript';
			}
		}

		return { projectName, projectLang, integrateTailwind };
	} catch (err) {
		handleError(err);
	}
};
