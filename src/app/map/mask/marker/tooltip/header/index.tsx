// App imports
import { SectionItem } from './item';
import './styles.scss';

export const Header = ({ marker }: any) => {
	return (
		<div className="header-selector">
			<SectionItem name={"circle"} marker={marker}/>
			<SectionItem name={"iso"} marker={marker}/>
		</div>
	)
}

Header.displayName="Header";