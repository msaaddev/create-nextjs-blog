// external packages
const copy = require('copy-template-dir');

// built-in Node.js modules
const cwd = process.cwd();
const path = require('path');

module.exports = (projectName = '') => {
	let source, destination;
	// copy blog page
	source = path.join(
		__dirname,
		'..',
		'..',
		'..',
		'template',
		'md',
		'typescript',
		'pages',
		'blog'
	);
	destination = path.join(cwd, projectName, 'pages', 'blog');
	copy(source, destination, (err, createdFiles) => {
		if (err) throw err;
	});

	// copy post type
	source = path.join(
		__dirname,
		'..',
		'..',
		'..',
		'template',
		'md',
		'typescript',
		'types'
	);
	destination = path.join(cwd, projectName, 'types');
	copy(source, destination, (err, createdFiles) => {
		if (err) throw err;
	});

	// copy utils
	source = path.join(
		__dirname,
		'..',
		'..',
		'..',
		'template',
		'md',
		'typescript',
		'utils'
	);
	destination = path.join(cwd, projectName, 'utils');
	copy(source, destination, (err, createdFiles) => {
		if (err) throw err;
	});

	// copy scripts
	source = path.join(
		__dirname,
		'..',
		'..',
		'..',
		'template',
		'md',
		'scripts'
	);
	destination = path.join(cwd, projectName, 'scripts');
	copy(source, destination, (err, createdFiles) => {
		if (err) throw err;
	});
};
