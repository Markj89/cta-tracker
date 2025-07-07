/**
 * Find stations locally
 * @type {Hooks}
 */
import { useState, useEffect } from 'react';
import { Stations } from 'components/Map';

export default function useGetStations(url) {
    const [stations, getStations] = useState<Stations[]>([]);

    const getData = (url: string) => {
        fetch(url, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(result => {
            getStations(result);
        })
        .catch(error => console.log('error', error));
    };

    useEffect(() => {
        return getData(url);
    }, []);
    return { stations };
}