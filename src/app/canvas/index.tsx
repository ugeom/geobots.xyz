// App imports
import { Sections } from './sections';
import { Viewer } from './viewer';
import { Widgets } from './widgets';

export const Canvas = () => {
	return (
		<div className="canvas">
          <Sections/>
          <Viewer/>
          <Widgets/>
        </div>
	)
}

Canvas.displayName="Canvas";