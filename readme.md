![cover](assets/cover.png)

<div align="center">
	<img src="https://img.shields.io/npm/v/create-nextjs-blog?color=1E1E1E" alt="version">
	<img src="https://img.shields.io/npm/l/create-nextjs-blog?color=1E1E1E" alt="license">
	<img src="https://img.shields.io/npm/dt/create-nextjs-blog?color=1E1E1E" alt="downloads">
	<a href="https://stars.github.com/nominate/">
		<img src="https://img.shields.io/badge/GitHub%20Star-Nominate-1E1E1E" alt="nominate @msaaddev for GitHub Star" />
	</a>
</div>
<br>

<p align="center">
	<strong>Instantly set up Next.js blog with TypeScript or JavaScript</strong>
</p>

![separator](assets/separator.jpeg)

- **JavaScript Blog**: Set up a blog with JavaScript in seconds
- **TypeScript Blog**: Set up a blog with TypeScript in seconds
- **Tailwind CSS**: Supports Tailwind CSS out of the box for TypeScript ATM
- **Unopinionated**: No opinionated styling or UI. You can build your own UI on top of it
- **Post**: Create a new blog post by creating a new markdown file in the `posts` directory
- **Route**: Automatically create routes for your blog posts based on the markdown file name
- **SEO**: Use your blog post frontmatter to add SEO tags to your blog post
- **Markdown components**: Use React components in your markdown blog posts
- **MIT License**: Free to use for personal and commercial projects

<br>

<img src="./assets/suitcase.png" width="10%" />

## Installation

```sh
# use it with npx (recommended)
npx create-nextjs-blog@latest

# install the CLI globally
npm i -g create-nextjs-blog@latest
```

<br>

<img src="./assets/rocket.png" width="10%" />

## Usage

```sh
# npx: create a new Next.js blog
npx create-nextjs-blog@latest

# npx create a next Next.js blog with TypeScript
npx create-nextjs-blog@latest --typescript

# npx create a next Next.js blog with Tailwind CSS & TypeScript
npx create-nextjs-blog@latest --withTailwind

# npx create a next Next.js blog with JavaScript
npx create-nextjs-blog@latest --javascript

# global: create a new Next.js blog
cnb

# global: create a next Next.js blog with TypeScript
cnb --typescript

# global: create a next Next.js blog with Tailwind CSS & TypeScript
cnb --withTailwind

# global: create a next Next.js blog with JavaScript
cnb --javascript
```

>Once the blog is set up, run the Next.js app and navigate to [`http://localhost:3000/blog`](http://localhost:3000/blog) to see your blog. To check demo

<br>

<img src="./assets/workflow.png" width="10%" />

## Inject Markdown Components

***Create a component***

The CLI uses [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) to render markdown files. You can create your own components and use them in your markdown files. To create a component, create a new file in the `components/markdown` directory. For example, if you want to create a `Note` component, create a new file in the `components/markdown` directory named `Note.js` or `Note.tsx` depending on the type of blog you created.

```js
const Note = ({ children }) => {
	return (
		<p
			style={{
				backgroundColor: '#fad',
				borderRadius: '10px',
				boxShadow: '0 0 5px #fad',
				padding: '10px',
				margin: '0 20px'
			}}
		>
			<em>{children}</em>
		</p>
	);
};

export default Note;
```

***Add the component in the `components/markdown/index.js` or `index.tsx` file***

```js
import dynamic from 'next/dynamic';

const Note = dynamic(() => import('./Note'), { ssr: false });

const MarkdownComponents = () => {
	return {
		// h1: (props: any) => <h1 {...props} />,
		Note: props => <Note {...props} />
	};
};

export default MarkdownComponents;
```

***Use this component in your markdown blog files***

```md
<Note>You can use this component in your markdown files.</Note>
```

[***Here is an example of how you can use this component in your markdown files.***](https://github.com/msaaddev/create-nextjs-blog/tree/main/examples/markdown-blog-javascript/components/markdown)

## Contributing Guidelines

Make sure you read the [contributing guidelines](https://github.com/msaaddev/create-nextjs-blog/blob/main/contributing.md) before opening a PR.

## Other Projects

I have curated a [detailed list](https://github.com/msaaddev/open-source) of all the open-source projects I have authored. Do take out a moment and take a look.

## License & Conduct

-   MIT © [Saad Irfan](https://github.com/msaaddev)
-   [Code of Conduct](https://github.com/msaaddev/create-nextjs-blog/blob/main/code-of-conduct.md)
