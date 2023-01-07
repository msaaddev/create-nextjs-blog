import dynamic from 'next/dynamic';

const Note = dynamic(() => import('./Note'), { ssr: false });

const MarkdownComponents = () => {
	return {
		// h1: (props: any) => <h1 {...props} />,
		Note: (props: any) => <Note {...props} />
	};
};

export default MarkdownComponents;
