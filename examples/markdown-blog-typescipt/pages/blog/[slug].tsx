// packages
import type { NextPage } from 'next';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import fs from 'fs';
import matter from 'gray-matter';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Link from 'next/link';

// components
import MarkdownComponents from '../../components/markdown';

// utils
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
		<>
			<Head>
				<title>{frontMatter.title}</title>
				<meta name="description" content={frontMatter.description} />
				<meta name="keywords" content={frontMatter.tag.join(', ')} />
			</Head>
			<div>
				<h1>{frontMatter.title}</h1>
				<p>
					<Link href={`/blog/category/${frontMatter.category}`}>{frontMatter.category}</Link>
					{` ${formatDate(frontMatter.publishedDate)} ${
						frontMatter.readingTime
					}`}
				</p>
				<MDXRemote {...mdxSource} components={MarkdownComponents()} />
			</div>
		</>
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
