// App imports
import './styles.scss';

export const Icon = ({ onClick, image, name }: any) => {
	return (
		<div className="custom-marker" onClick={onClick}>
			<img 
				src={image} 
				alt="avatar"
				className="agent-avatar"
			/>
			<div className="marker-provider">
				{name}
			</div>
		</div>
	)
}

Icon.displayName="Icon";