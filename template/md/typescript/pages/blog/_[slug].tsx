// packages
import type { NextPage } from 'next';
import { GetStaticProps, GetStaticPaths } from 'next';
import readingTime from 'reading-time';
import fs from 'fs';
import matter from 'gray-matter';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

// data
import data from '../../data/blog.json';

interface IProps {
	mdxSource: MDXRemoteSerializeResult<
		Record<string, unknown>,
		Record<string, string>
	>;
	frontMatter: any;
	slug: string;
}

const BlogPost: NextPage<IProps> = ({ mdxSource, frontMatter, slug }) => {
	return <h2>hello</h2>;
};

export default BlogPost;

export const getStaticPaths: GetStaticPaths = () => {
	const paths: string[] = [];
	data.forEach((blog: any) => {
		paths.push(`/blog/${blog.slug}`);
	});

	return {
		paths,
		fallback: false
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { content, data } = matter(
		fs.readFileSync(`./posts/${params?.slug}.mdx`, 'utf8')
	);
	const mdxSource = await serialize(content);
	const { text } = readingTime(content);

	const dates = {
		publishedDate: JSON.stringify(data.publishedDate),
		lastModifiedDate: JSON.stringify(data.lastModifiedDate)
	}
	const frontMatter = { ...data, ...dates, readingTime: text };

	return {
		props: {
			mdxSource,
			frontMatter,
			slug: params?.slug || ''
		}
	};
};
