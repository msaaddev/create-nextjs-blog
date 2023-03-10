const { Input, AutoComplete } = require('enquirer');
const fs = require('fs');
const path = require('path');
const cwd = process.cwd();

/**
 * Create a user for input
 *
 * @param {string} name
 * @param {string} message
 * @param {string} hint
 */
const inputPrompt = ({ name, message, hint }) => {
	return new Input({
		name,
		message,
		hint,
		validate(value) {
			const regex = /\s/;
			if (regex.test(value)) return 'Project name cannot have spaces.';
			if (fs.existsSync(path.join(cwd, value)))
				return 'Project name already exists.';
			return true;
		}
	});
};

/**
 * Create a drop down prompt
 *
 * @param {string} name
 * @param {string} message
 * @param {array} choices
 */
const dropDownPrompt = ({ name, message, choices }) => {
	return new AutoComplete({
		name,
		message,
		choices
	});
};

module.exports = { inputPrompt, dropDownPrompt };
