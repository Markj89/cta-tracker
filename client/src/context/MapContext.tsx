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
    screenSize: { width: 0, height: 0 },
    setScreenSize: () => {},
    setLocation: () => {},
    stations: null,
    setStations: () => [],
    station: null,
    setStation: () => [],
    arrivals: [],
    setArrivals: () => [],
    showMap: false,
    setShowMap: () => {},
    drawerOpen: false,
    setDrawerOpen: () => {},
};

export const MapContext = createContext<MapContextType>(MapContextState);