// packages
import Head from 'next/head';
import fs from 'fs';
import matter from 'gray-matter';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import formatDate from '../../utils/formatDate';

// data
import data from '../../data/blog.json';

const BlogPost = ({ mdxSource, frontMatter }) => {
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
					{`${frontMatter.category} ${formatDate(
						frontMatter.publishedDate
					)} ${frontMatter.readingTime}`}
				</p>
				<MDXRemote {...mdxSource} />
			</div>
		</>
	);
};

export default BlogPost;

export const getStaticPaths = () => {
	const paths = [];
	data.forEach(blog => {
		paths.push(`/blog/${blog.slug}`);
	});

	return {
		paths,
		fallback: false
	};
};

export const getStaticProps = async ({ params }) => {
	const { content } = matter(
		fs.readFileSync(`./posts/${params?.slug}.md`, 'utf8')
	);
	const mdxSource = await serialize(content, {
		mdxOptions: {
			development: false
		}
	});
	const frontMatter = data.find(blog => blog.slug === params?.slug);

	return {
		props: {
			mdxSource,
			frontMatter
		}
	};
};
