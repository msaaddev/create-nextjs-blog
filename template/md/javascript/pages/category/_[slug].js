import Link from 'next/link';
import Head from 'next/head';

// utils
import formatDate from '../../utils/formatDate';

// data
import blog from '../../data/blog.json';
import category from '../../data/categories.json';

const SingleCategory = ({ blog }) => {
	return (
		<>
			<Head>
				<title>{`${blog[0].category} category page`}</title>
				<meta name="description" content="Blog" />
			</Head>
			{blog.map((post, index) => {
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

export const getStaticPaths = () => {
	const paths = [];
	category.forEach(catgy => {
		paths.push(`/category/${catgy.name}`);
	});

	return {
		paths,
		fallback: false
	};
};

export const getStaticProps = async ({ params }) => {
	const blogData = blog.filter(post => post.category[0] === params?.slug);
	return {
		props: {
			blog: blogData
		}
	};
};
