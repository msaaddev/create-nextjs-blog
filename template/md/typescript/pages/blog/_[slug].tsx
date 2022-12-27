// packages
import type { NextPage } from 'next';
import { GetStaticProps, GetStaticPaths } from 'next';
import fs from 'fs';
import matter from 'gray-matter';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import formatDate from '../../utils/formatDate';

// data
import data from '../../data/blog.json';

interface IProps {
	mdxSource: MDXRemoteSerializeResult<
		Record<string, unknown>,
		Record<string, string>
	>;
	frontMatter: any;
}

const BlogPost: NextPage<IProps> = ({ mdxSource, frontMatter }) => {
	return (
		<div>
			<h1>{frontMatter.title}</h1>
			<p>
				{`${frontMatter.category} ${formatDate(
					frontMatter.publishedDate
				)} ${frontMatter.readingTime}`}
			</p>
			<MDXRemote {...mdxSource} />
		</div>
	);
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
	const { content } = matter(
		fs.readFileSync(`./posts/${params?.slug}.md`, 'utf8')
	);
	const mdxSource = await serialize(content, {
		mdxOptions: {
			development: false
		}
	});
	const frontMatter = data.find((blog: any) => blog.slug === params?.slug);

	return {
		props: {
			mdxSource,
			frontMatter
		}
	};
};
