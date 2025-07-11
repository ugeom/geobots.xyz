// App  imports
import './styles.scss';

export const Trash = ({ onClick }: any) => {
	return (
      	<svg 
      		viewBox="0 0 20 20" 
      		width="20" 
      		style={{position: "absolute", right: "-10", top: "-10", cursor: "pointer"}}
      		onClick={onClick}
      	>
      		<circle
      			cx={10}
      			cy={10}
      			r={9}
      			className="trash-background"
      		/>
      		<line
				x1={5}
				x2={15}
				y1={5}
				y2={15}
				className="trash-cross"
			/>
			<line
				x1={15}
				x2={5}
				y1={5}
				y2={15}
				className="trash-cross"
			/>
			<rect
				x={0}
				y={0}
				width={20}
				height={20}
				fill="transparent"
			/>
		</svg>
	)
}