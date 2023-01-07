import Head from 'next/head';
import Link from 'next/link';

import categories from '../../data/categories.json';

const Category = () => {
	return (
		<>
			<Head>
				<title>Blog Categories</title>
				<meta name="description" content="Category page" />
			</Head>
			<section>
				{categories.map((category, index) => (
					<Link href={`/category/${category.name}`} key={index}>
						<div>
							<h2>{category.name}</h2>
						</div>
					</Link>
				))}
			</section>
		</>
	);
};

export default Category;
