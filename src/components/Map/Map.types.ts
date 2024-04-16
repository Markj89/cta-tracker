export interface Stations {
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