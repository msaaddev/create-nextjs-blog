import type { NextPage } from 'next';
import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';

// types
import IPost from '../../types/post';

// utils
import formatDate from '../../utils/formatDate';

// data
import blog from '../../data/blog.json';
import category from '../../data/categories.json';

interface IProps {
	blog: IPost[];
}

const SingleCategory: NextPage<IProps> = ({ blog }) => {
	return (
		<>
			{blog.map((post: IPost, index: number) => {
				return (
					<div key={index}>
						<article>
							<Link href={`/blog/${post.slug}`}>
								<h2>{post.title}</h2>
							</Link>
							<p>
								{`${
									post.category[0].charAt(0).toUpperCase() +
									post.category[0].slice(1)
								} ${formatDate(post.publishedDate)} ${
									post.readingTime
								}`}
							</p>
							<p>{post.description}</p>
						</article>
						<hr />
					</div>
				);
			})}
		</>
	);
};

export default SingleCategory;

export const getStaticPaths: GetStaticPaths = () => {
	const paths: string[] = [];
	category.forEach(catgy => {
		paths.push(`/category/${catgy.name}`);
	});

	return {
		paths,
		fallback: false
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const blogData = blog.filter(post => post.category[0] === params?.slug);
	return {
		props: {
			blog: blogData
		}
	};
};
