/**
 * Find stations locally
 * @type {Hooks}
 */
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export default function useGetStationsLocally(url) {
    const [stations, getStations] = useState([]);
    
    const getData = useCallback(() => {
        axios.get(url).then((response) => {
            getStations(response.data);
        }).catch((error) => {
            console.warn(error);
        });
    });

    useEffect(() => {
        getData();
    }, [url]);
    return { stations };
}