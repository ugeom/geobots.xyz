import { GaugeSizesProvider } from './gauge';
import { DotsSizesProvider } from './dots';
import { RadiusSizesProvider } from './radius';
import { SliderSizesProvider } from './slider';

export const SizesProvider = ({ children }: any) => {
	return (
		<GaugeSizesProvider>
		<DotsSizesProvider>
		<RadiusSizesProvider>
		<SliderSizesProvider>
			{children}
		</SliderSizesProvider>
		</RadiusSizesProvider>
		</DotsSizesProvider>
		</GaugeSizesProvider>
	)
}

SizesProvider.displayName="SizesProvider";