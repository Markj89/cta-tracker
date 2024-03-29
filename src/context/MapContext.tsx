/**
 * Application state context
 */
import { createContext } from 'react';
import { MapContextType } from './MapContext.types';

/**
 * Default Map state
 */
const MapContextState: MapContextType = {
    location: { lat: 0, lng: 0 },
    setLocation: () => {},
};

export const MapContext = createContext<MapContextType>(MapContextState);