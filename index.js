#!/usr/bin/env node

/**
 * create-next-blog
 * Instantly set up Next.js blog
 *
 * @author Saad Irfan <twitter.com/msaaddev>
 */

const init = require('./utils/init');
const cli = require('./utils/cli');
const exit = require('./utils/exit');
const log = require('./utils/log');
const question = require('./utils/question');
const setupMarkDownBlog = require('./utils/md');

const input = cli.input;
const flags = cli.flags;
const { clear, debug, withTailwind, typescript, javascript } = flags;

(module.exports = async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);

	// ask questions
	const answers = await question({ withTailwind, typescript, javascript });

	// generate next mdx blog
	await setupMarkDownBlog(answers);

	debug && log(flags);
	!debug && (await exit(answers));
})();
