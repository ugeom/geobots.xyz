import { MarkerEventsProvider } from './marker';

export const EventsProvider = ({ children }: any) => {
	return (
		<MarkerEventsProvider>
			{ children }
		</MarkerEventsProvider>
	)
}

EventsProvider.displayName="EventsProvider";