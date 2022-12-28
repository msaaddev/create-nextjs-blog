const exit = require('exit-cli');
const pkgJSON = require('../package.json');
const chalk = require('chalk');
const log = require('log-symbols');

/**
 * Show end message
 *
 * @param {object} answers - User answers
 */
module.exports = async answers => {
	// extract answers
	const { projectName, projectLang, integrateTailwind } = answers;

	console.log();
	console.log(
		log.info,
		chalk.bgGreen.hex(`#000000`).bold(` Next.js ${projectLang} blog ${integrateTailwind ? 'with TailwindCSS ' : ''}`),
		'created successfully.'
	);

	console.log(`\n${chalk.dim('I suggest that you begin by typing: \n')}`);
	console.log(chalk.cyan(`cd`), `${projectName}`);
	console.log(chalk.cyan(`npm run dev`));

	await exit({
		github: `https://github.com/msaaddev/create-nextjs-blog`,
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
