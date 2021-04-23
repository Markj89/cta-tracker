/**
 * Arrival
 * @type {Hooks}
 */
import React, { useState } from 'react';
import axios from 'axios';

const Arrivals = ({url, headers, payload}) => {
    if (!url || !payload) return;
    const [ station, setStation ] = useState({ data: null, error: null, isLoading: false});
    const [ error, setError] = useState("");
    const callForArrivals = async() => {
        try {
            setStation(prevState => ({...prevState, isLoading: true}));
            const stationCall = axios.create({
                withCredentials: true,
                crossdomain: true,
            });
            await axios.post(url, payload, headers).then(res => {
                setStation({ data: res.data, isLoading: true, error: null });
            }).catch((error) => {
                console.log(`Error: ${error}`);
                setStation({data: null, isLoading: false, error});
            });
        } catch (error) {
            console.log(error);
        }
    };
    return [ station, callForArrivals ];
}

export default Arrivals;