// App imports
import './styles.scss';

export const Icon = ({ onClick, image, name, activePointer }: any) => {
	return (
		<div 
			className="custom-marker" 
			onClick={onClick} 
			style={{pointerEvents: activePointer ? "none" : "auto"}}
		>
			<img 
				className="agent-avatar" 
				src={image} 
				alt="avatar"
			/>
			<div className="marker-provider">
				{name}
			</div>
		</div>
	)
}

Icon.displayName="Icon";