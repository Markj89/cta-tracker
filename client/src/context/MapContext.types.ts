import React from "react";
import { screenSizeProps } from "components/Map";

export interface MapContextType {
    location: Partial<InitiCenerType>;
    screenSize: Partial<screenSizeProps>;
    setScreenSize: React.Dispatch<React.SetStateAction<screenSizeProps>>;
    setLocation: React.Dispatch<React.SetStateAction<InitiCenerType>>;
    stations: string[];
    setStations: React.Dispatch<React.SetStateAction<string[]>>;
    station: string[];
    setStation: React.Dispatch<React.SetStateAction<string[]>>;
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