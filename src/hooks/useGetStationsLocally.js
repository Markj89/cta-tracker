/**
 * Find stations locally
 * @type {Hooks}
 */
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export default function useGetStationsLocally(url) {
    const [places, getPlaces] = useState([]);
    
    const getData = useCallback(() => {
        axios.get(url).then((response) => {
            getPlaces(response.data);
        }).catch((error) => {
            console.warn(error);
        });
    });

    useEffect(() => {
        getData();
    }, []);
    return { places };
}