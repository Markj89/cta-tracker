/**
 * The Map Context Provider
 */
import React, { useContext, useMemo, useState } from "react";
import { MapContext } from "./MapContext";
import { InitiCenerType } from "./MapContext.types";

interface Props {
    children: React.ReactNode;
    value?: InitiCenerType;
}

const MapContextProvider: React.FunctionComponent<Props> = (props: Props): JSX.Element => {
    const { children, value = { lat: 0, lng: 0 } as InitiCenerType } = props;
    const [location, setLocation] = useState<InitiCenerType>(value);
    const mapState = useMemo(() => ({ location, setLocation }), [location, setLocation]);

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