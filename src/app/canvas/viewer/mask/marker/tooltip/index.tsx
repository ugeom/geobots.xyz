// App imports
import { Header } from './header';
import { Options } from './options';
import './styles.scss';

export const Tooltip = ({ marker }: any) => {
  if (!marker) return <></>;

  const onClick = (e: any) => e.stopPropagation();

  return (
      <div className="popup-item" onClick={onClick}>
        <Header marker={marker}/>
        <Options marker={marker}/>
      </div>
  );
}

Tooltip.diplayName="Tooltip";