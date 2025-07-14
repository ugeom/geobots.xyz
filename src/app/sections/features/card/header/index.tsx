// App imports
import { Buttons } from './buttons';
import './styles.scss';

export const Header = ({ marker, activeCharts, setActiveCharts }: any) => {
	const { name, image } = marker

	return (
		<div className="card-header">
			<img className="agent-icon" src={image} alt="agent-icon"/>
			<div>
				<div className="card-header-item">
					<div className="agent-title">{name}</div>
					<Buttons 
						marker={marker} 
						activeCharts={activeCharts} 
						setActiveCharts={setActiveCharts}
					/>
				</div>
			</div>
		</div>
	)
}

Header.displayName="Header";