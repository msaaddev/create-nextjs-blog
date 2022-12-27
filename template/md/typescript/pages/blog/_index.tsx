import type { NextPage } from 'next';
import Link from 'next/link';

// data
import data from '../../data/blog.json';

// utils
import formatDate from '../../utils/formatDate';

// types
import IPost from '../../types/post';

const Blog: NextPage = () => {
	return (
		<section>
			{data.map((post: IPost, index: number) => {
				return (
					<article>
						<span>
							{post.category[0].charAt(0).toUpperCase() +
								post.category[0].slice(1)}
						</span>
						<Link href={`/blog/${post.slug}`} key={index}>
							<h2>{post.title}</h2>
						</Link>
						<span>{formatDate(post.publishedDate)}</span>
						<p>{post.description}</p>
					</article>
				);
			})}
		</section>
	);
};

export default Blog;
