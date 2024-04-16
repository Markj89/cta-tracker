
export const getColorByStation = (stationColor: string) => {
    let color;
    switch (stationColor) {
        case "pink":
            color = '#e27ea6';
            break;
        case 'blue':
            color = '#00a1de';
            break;
        case 'g':
            color = '#009b3a';
            break;
        case 'brn':
            color = '#62361b';
            break;
        case 'p':
            color = '#522398';
            break;
        case 'y':
            color = '#f9e300';
            break;
        case 'red':
            color = '#c60c30';
            break;
        case 'org':
            color = '#f9461c';
            break;
        default:
            color = '#565a5c';
            break;
    }
    return color;
}

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