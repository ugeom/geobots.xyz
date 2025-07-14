import { GaugeSizesProvider } from './gauge';
import { DotsSizesProvider } from './dots';
import { SliderSizesProvider } from './slider';

export const SizesProvider = ({ children }: any) => {
	return (
		<GaugeSizesProvider>
		<DotsSizesProvider>
		<SliderSizesProvider>
			{children}
		</SliderSizesProvider>
		</DotsSizesProvider>
		</GaugeSizesProvider>
	)
}

SizesProvider.displayName="SizesProvider";