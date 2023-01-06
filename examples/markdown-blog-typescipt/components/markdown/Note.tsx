const Note = ({children}: {children: React.ReactNode}) => {
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
			<em>
				{children}
			</em>
		</p>
	);
};

export default Note;
