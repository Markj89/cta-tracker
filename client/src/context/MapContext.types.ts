import React from "react";
import { screenSizeProps, Station, Stations } from "./../components/Map";

export interface MapContextType {
    location: Partial<InitiCenerType>;
    screenSize: Partial<screenSizeProps>;
    setScreenSize: React.Dispatch<React.SetStateAction<screenSizeProps>>;
    setLocation: React.Dispatch<React.SetStateAction<InitiCenerType>>;
    stations?: Stations;
    setStations?: React.Dispatch<React.SetStateAction<Stations>>;
    station: Station;
    setStation: React.Dispatch<React.SetStateAction<Station>>;
    arrivals: string[];
    setArrivals: React.Dispatch<React.SetStateAction<string[]>>;
    showMap?: boolean;
    setShowMap?: React.Dispatch<React.SetStateAction<boolean>>;
    drawerOpen: boolean;
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface InitiCenerType {
    lat: number;
    lng: number;
}