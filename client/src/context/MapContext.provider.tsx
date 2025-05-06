/**
 * The Map Context Provider
 */
import React, { useContext, useMemo, useState } from "react";
import { MapContext } from "./MapContext";
import { InitiCenerType } from "./MapContext.types";
import { screenSizeProps } from "components/Map";

interface Props {
    children: React.ReactNode;
    locationValue?: InitiCenerType;
    screenSizeValue?: screenSizeProps;
    showMapValue: boolean;
}

const MapContextProvider: React.FunctionComponent<Props> = (props: Props): JSX.Element => {
    const { children, showMapValue, locationValue = { lat: 0, lng: 0 } as InitiCenerType, screenSizeValue = { width: 0, height: 0 } as screenSizeProps } = props;
    const [location, setLocation] = useState<InitiCenerType>(locationValue);
    const [screenSize, setScreenSize] = useState<screenSizeProps>(screenSizeValue);
    const [showMap, setShowMap] = useState<boolean>(showMapValue);
    
    const mapState = useMemo(() => ({ location, setLocation, screenSize, setScreenSize, showMap, setShowMap}), [location, setLocation, screenSize, setScreenSize, showMap, setShowMap ]);

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