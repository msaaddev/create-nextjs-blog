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
					<>
						<article key={index}>
							<Link href={`/blog/${post.slug}`}>
							<h2>{post.title}</h2>
							</Link>
							<p>
								{`${post.category[0].charAt(0).toUpperCase() +
									post.category[0].slice(1)} ${formatDate(
									post.publishedDate
									)} ${post.readingTime}`}
							</p>
									<p>{post.description}</p>
						</article>
						<hr />
					</>
				);
			})}
		</section>
	);
};

export default Blog;
