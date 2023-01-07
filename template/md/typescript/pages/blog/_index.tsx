import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

// data
import data from '../../data/blog.json';

// utils
import formatDate from '../../utils/formatDate';

// types
import IPost from '../../types/post';

const Blog: NextPage = () => {
	return (
		<>
			<Head>
				<title>Blog</title>
				<meta name="description" content="Blog" />
			</Head>
			<section>
				{data.map((post: IPost, index: number) => {
					return (
						<div key={index}>
							<article>
								<Link href={`/blog/${post.slug}`}>
									<h2>{post.title}</h2>
								</Link>

								<p>
									<Link href={`/category/${post.category}`}>
										{post.category[0]
											.charAt(0)
											.toUpperCase() +
											post.category[0].slice(1)}
									</Link>
									{` ${formatDate(post.publishedDate)} ${
										post.readingTime
									}`}
								</p>
								<p>{post.description}</p>
							</article>
							<hr />
						</div>
					);
				})}
			</section>
		</>
	);
};

export default Blog;
