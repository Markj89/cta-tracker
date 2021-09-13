/**
 * Find Station by Color
 * @type {Hooks}
 */
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import http from '../utils/http-common';

export default function useStationsByColor(initialValue) {
    useEffect(() => {
        const [stations, getStations] = useState();

        
        return { stations };

    }, []);
}