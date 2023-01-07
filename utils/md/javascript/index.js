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
		'javascript',
		'pages',
		'blog'
	);
	destination = path.join(cwd, projectName, 'pages', 'blog');
	copy(source, destination, (err, createdFiles) => {
		if (err) throw err;
	});

	// copy category page
	source = path.join(
		__dirname,
		'..',
		'..',
		'..',
		'template',
		'md',
		'javascript',
		'pages',
		'category'
	);

	destination = path.join(cwd, projectName, 'pages', 'category');
	copy(source, destination, (err, createdFiles) => {
		if (err) throw err;
	});

	// copy components
	source = path.join(
		__dirname,
		'..',
		'..',
		'..',
		'template',
		'md',
		'javascript',
		'components'
	);
	destination = path.join(cwd, projectName, 'components');
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
		'javascript',
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
