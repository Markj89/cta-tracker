import { getColorByStation } from "./color";

export const mapMarkers = (stations) => stations && stations?.map((station, i) => station?.stops.map((stop) => ({
    color: getColorByStation(Object.keys(stop).find((key, i) => stop[key] === true && key !== 'ada')),
    lat: stop?.lat,
    lng: stop?.lng,
    title: stop?.stop_name,
    ada: stop?.ada,
    blue: stop?.blue,
    brn: stop?.brn,
    direction: stop?.direction,
    g: stop?.g,
    map_id: stop?.map_id,
    org: stop?.org,
    p: stop?.p,
    pink: stop?.pink,
    purple_express: stop?.purple_express,
    red: stop?.red,
    station_descriptive_name: stop?.station_descriptive_name,
    stop_id: stop?.stop_id,
    stop_name: stop?.stop_name,
    y: stop?.y,
}))).flat();


export const mapStations = (stations) => stations && stations?.filter((obj1, i, station) => station.findIndex(obj2 => (obj2.station_descriptive_name === obj1.station_descriptive_name)) === i);