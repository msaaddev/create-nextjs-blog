const fs = require('fs');
const matter = require('gray-matter');
const readingTime = require('reading-time');

/**
 * Generates a data file for the blog at runtime
 *
 *
 */
(async () => {
	if (!fs.existsSync('data')) {
		fs.mkdirSync('data');
	}

	fs.readdir('./posts', (err, files) => {
		if (err) {
			console.log(err);
		}

		const blogData = [];

		files.forEach(async file => {
			const fileName = file.split('.')[0];
			const { content, data } = matter(
				fs.readFileSync(`./posts/${file}`, 'utf8')
			);
			const { text } = readingTime(content);

			const obj = {
				title: data.title,
				description: data.description,
				tag: data.tag,
				category: data.category,
				publishedDate: new Date(data.publishedDate),
				lastModifiedDate: new Date(data.lastModifiedDate),
				cover: data.cover,
				slug: fileName,
				readingTime: text
			};
			blogData.push(obj);
		});

		blogData.sort((a, b) => b.date - a.date);
		fs.writeFileSync(`./data/blog.json`, JSON.stringify(blogData));
	});
})();
