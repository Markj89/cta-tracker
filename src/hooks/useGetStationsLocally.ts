/**
 * Find stations locally
 * @type {Hooks}
 */
import { useState, useEffect } from 'react';

export default function useGetStationsLocally(url) {
    const [stations, getStations] = useState([]);

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
    }, [url]);
    return { stations };
}