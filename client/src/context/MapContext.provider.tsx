/**
 * The Map Context Provider
 */
import React, { useContext, useMemo, useState } from "react";
import { MapContext } from "./MapContext";
import { InitiCenerType, MapContextType } from "./MapContext.types";
import { screenSizeProps, Station, Stations } from "./../components/Map";

interface Props {
    children: React.ReactNode;
    locationValue?: InitiCenerType;
    screenSizeValue?: screenSizeProps;
    showMapValue: boolean;
    stationValue: Station;
    stationsValue: Stations;
    drawerValue: boolean;
}

const MapContextProvider: React.FunctionComponent<Props> = (props: Props): JSX.Element => {
    const { children, showMapValue, stationsValue, stationValue, drawerValue, locationValue = { lat: 0, lng: 0 } as InitiCenerType, screenSizeValue = { width: 0, height: 0 } as screenSizeProps } = props;
    const [location, setLocation] = useState<InitiCenerType>(locationValue);
    const [screenSize, setScreenSize] = useState<screenSizeProps>(screenSizeValue);
    const [showMap, setShowMap] = useState<boolean>(showMapValue);
    const [station, setStation] = useState<Station>(stationValue);
    const [stations, setStations] = useState<Stations>(stationsValue);
    const [drawerOpen, setDrawerOpen] = useState<boolean>(drawerValue);

    const mapState: MapContextType = useMemo(() => ({ 
        location, 
        setLocation, 
        screenSize, 
        setScreenSize, 
        showMap, 
        setShowMap, 
        station, 
        setStation,
        stations,
        setStations,
        arrivals: [],
        setArrivals: () => [],
        drawerOpen, 
        setDrawerOpen,
    }), [location, setLocation, screenSize, setScreenSize, showMap, setShowMap, station, setStation, drawerOpen, setDrawerOpen, stations, setStations ]);

    return (
        <MapContext.Provider value={mapState}>
            {children}
        </MapContext.Provider>
    );
}

const useGlobalState = () => {
    const context = useContext(MapContext);
    if (!context) {
        throw new Error("useGlobalState must be used within a GlobalStateContext");
    }
    return context;
};

export  {MapContextProvider, useGlobalState};