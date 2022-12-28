// external packages
const { command } = require('execa');
const ora = require('ora');
const handleError = require('node-cli-handle-error');
const copy = require('copy-template-dir');

// built-in Node.js modules
const cwd = process.cwd();
const path = require('path');
const fs = require('fs').promises;

// local imports
const question = require('../question');
const { start, succeed, fail } = require('../../functions/spinner');
const generateTypeScriptNextBlog = require('./typescript');
const generateJavaScriptNextBlog = require('./javascript');

/**
 * Create Next MDX blog
 *
 * @param {object} answers - User answers
 */
module.exports = async answers => {
	// extract answers
	const { projectName, projectLang, integrateTailwind } = answers;

	const spinner = ora();
	let source, destination, variables;

	console.log();
	try {
		/* create Next.js application */
		start(spinner, 'Creating Next project...');

		if (projectLang === 'JavaScript') {
			// create javascript Next.js app
			await command(`npx create-next-app ${projectName}`);
		} else if (projectLang === 'TypeScript' && integrateTailwind) {
			// create typescript Next.js app with Tailwind CSS
			await command(
				`npx create-next-app -e with-tailwindcss ${projectName}`
			);
		} else {
			// create typescript Next.js app
			await command(`npx create-next-app ${projectName} --typescript`);
		}

		succeed(spinner, 'Next project created successfully');

		/* copy demo posts to Next.js app */
		start(spinner, 'Creating demo posts...');

		source = path.join(__dirname, '..', '..', 'template', 'md', 'posts');
		destination = path.join(cwd, projectName, 'posts');

		copy(source, destination, (err, createdFiles) => {
			if (err) throw err;
		});

		succeed(spinner, 'Demo posts created successfully');

		/* create blog page */
		start(spinner, 'Creating blog page...');

		if (projectLang === 'JavaScript') {
			generateJavaScriptNextBlog(projectName);
		} else {
			generateTypeScriptNextBlog(projectName);
		}

		succeed(spinner, 'Blog page created successfully');

		/* install dependencies */
		start(spinner, 'Installing dependencies...');

		process.chdir(path.join(cwd, projectName));
		await command(
			'npm install reading-time@1.5.0 gray-matter@4.0.3 next-mdx-remote@4.2.0'
		);
		await command('npm dedupe');

		succeed(spinner, 'Dependencies installed successfully');

		/* updating package.json */
		start(spinner, 'Updating package.json...');

		// read Next.js app package.json
		const pkgJSONPath = path.join(cwd, projectName, 'package.json');
		const packageJson = require(pkgJSONPath);

		// update package.json scripts
		const script = {
			dev: 'npm run generate-data && next dev',
			'generate-data': 'node ./scripts/generate-blog-data.js',
			build: 'npm run generate-data && next build'
		};
		packageJson.scripts = { ...packageJson.scripts, ...script };

		// write updated package.json
		await fs.writeFile(
			pkgJSONPath,
			JSON.stringify(packageJson, null, 2),
			err => {
				if (err) throw err;
			}
		);

		succeed(spinner, 'package.json updated successfully');
	} catch (err) {
		console.log();
		fail(spinner, err);
		handleError(err);
	}
};
