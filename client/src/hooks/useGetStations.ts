/**
 * Find stations locally
 * @type {Hooks}
 */
import { useState, useEffect } from 'react';
import { Stations } from 'components/Map';

export default function useGetStations(url) {
    const [stations, getStations] = useState<Stations[]>([]);
    const [isStationsLaoding, setStatiionsLaoding] = useState<boolean>(true);
   
    const getData = (url: string) => {
        try {
            fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
            })
            .then(response => response.json())
            .then(result => getStations(result))
            .catch(error => console.log('error', error));
        } catch (err) {
            console.error(err);
        } finally {
            setStatiionsLaoding(false);
        }
    };
    useEffect(() => getData(url), []);
    return { stations, isStationsLaoding };
}