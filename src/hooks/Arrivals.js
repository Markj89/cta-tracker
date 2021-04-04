/**
 * Arrival
 * @type {Hooks}
 */
import React, { useState, useCallback } from 'react';
import axios from 'axios';

const Arrivals = ({url, headers, payload}) => {
    const [ station, setStation ] = useState({ data: null, error: null, isLoading: false});
    const [ error, setError] = useState("");
    const callForArrivals = useCallback(() => {
        setStation(prevState => ({...prevState, isLoading: true}));
        axios.post(url, headers, payload).then(res => {
            setStation({data: res.data, isLoading: false, error: null});
        }).catch((error) => {
            setStation({data: null, isLoading: false, error});
        })
    }, [url, headers, payload])
    console.log(station);
    return [res, callForArrivals];
}

export default Arrivals;