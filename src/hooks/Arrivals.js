/**
 * Arrival
 * @type {Hooks}
 */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import http from '../utils/http-common';
import PropTypes from "prop-types";


const Arrivals = initialState => {
    const isFetching = useRef(true);
    const [response, setResponse] = useState(initialState);

    const callForArrivals = async () => {
        try {
            await http.post('/arrivals', response.payload).then(res => {
                if (res.status === 200) {
                    if (res.data.ctatt.errNm != null) {
                        setResponse({ data: null, isLoading: false, error: res.data.ctatt.errNm });
                    } else {
                        setResponse({ data: res.data.ctatt.eta, isLoading: false, error: null });
                    }
                }
            }).catch((error) => {
                console.log(`Error: ${error}`);
                setResponse({data: null, isLoading: false, error});
            });
        } catch (error) {
            console.log(error);
        }
    };

    const refreshData = useCallback(payload => {
        setResponse(prevState => ({...prevState, payload}) );
        isFetching.current = true;
    });

    useEffect(() => {
        if (isFetching.current) {
            isFetching.current = false;
            callForArrivals();
        }
    }, [isFetching.current]);
    return [response, refreshData];
}

Arrivals.propTypes = {
    initialState: PropTypes.shape({
        data: PropTypes.any,
        error: PropTypes.string,
        isLoading: PropTypes.bool.isRequired,
        payload: PropTypes.any
    }).isRequired
};
  
export default Arrivals;