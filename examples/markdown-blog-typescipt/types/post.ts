export default interface IPost {
	title: string;
	description: string;
	tag: string[] | string;
	category: string[];
	publishedDate: string;
	lastModifiedDate: string;
	cover: string;
	slug: string;
	readingTime: string;
}
