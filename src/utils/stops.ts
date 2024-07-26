export const findStopDuplicate = (stops, station) => stops?.filter(obj => Object.keys(station).every(key => obj['station_descriptive_name'] === station['station_descriptive_name']));