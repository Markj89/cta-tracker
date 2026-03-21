import { InitiCenerType } from "context";

export interface Stations {
    _id: number;
    station_name: string;
    stops: Station[];
}

export interface Station {
    color?: string;
    ada: boolean;
    blue: boolean;
    brn: boolean;
    direction: string;
    g: boolean;
    lat: number;
    lng: number;
    map_id: number;
    org: boolean;
    p: boolean;
    pink: boolean;
    purple_express: boolean;
    red: boolean;
    station_descriptive_name: string;
    stop_id: number;
    stop_name: string;
    y: boolean;
}

export interface MapProps {
    [key: string]: any;
    width: number;
    height: number;
    currentLocation?: Partial<InitiCenerType>;
    stations: Stations[];
    zoom?: number;
    arrivals: string[];
    nearbyLocations: string[];
    nearbyLocationsIds: string[];
    arrivalsLoading?: any;
    arrivalErrors?: any;
    showMap?: boolean;
}

export type screenSizeProps = {
    width: number;
    height: number;
}