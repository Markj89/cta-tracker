import { createContext } from 'react';

type MapContextType = {
    location: initiCenerType | null,
    setLocation: React.Dispatch<React.SetStateAction<initiCenerType | null>>,
    height: number,
    width: number
}

type initiCenerType = {
    lat: number,
    lng: number
}

const MapContextState = {
    location: { lat: 0, lng: 0},
    setLocation: () => {},
    height: 0,
    width: 0
}

const MapContext = createContext<MapContextType>(MapContextState);
const MapProvider = MapContext.Provider;

export { MapContext, MapProvider, initiCenerType };