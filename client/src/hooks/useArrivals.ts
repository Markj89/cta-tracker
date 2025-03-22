/**
 * Arrival
 * @type {Hooks}
 */
import React, { useState, useEffect, useRef, useCallback } from "react";

const useArrivals = (stopIds, refreshInterval = 1000) => {
  const isFetching = useRef(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const getArrivals = useCallback(async (stopIds) => {
    try {
      setLoading(true);
      setError(false);

      const headers = {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      };

      const stopIdsArray = Array.isArray(stopIds) ? stopIds : [stopIds];
      const response = await fetch(`${process.env.SERVER_URL}/arrivals`, { 
        method: "POST",
        headers,
        body: JSON.stringify({ stopIds: stopIdsArray })
      });

      const res = await response.json();
      if (res?.error) {
        setData(null);
        setLoading(false); 
        setError(true);
      } else {
        setData(res?.arrivals);
        setLoading(false);
        setError(false);
      }
    } catch (error) {
      console.error(`Error: ${error}`);
      setData(error);
      setLoading(false);
      setError(true);
    }
  }, [stopIds]);

  const refreshData = useCallback((payload) => {
    setLoading(true);
    setError(false);
    isFetching.current = true;
    getArrivals(payload);
  }, [getArrivals, stopIds]);

  useEffect(() => {
    if (isFetching.current && stopIds?.length > 0) {
      isFetching.current = false;
      getArrivals(stopIds);
    }

    intervalRef.current = setInterval(() => {
      getArrivals(stopIds);
    }, refreshInterval);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [getArrivals, refreshInterval, stopIds]);
  
  return { data, loading, error, refetch: refreshData };
};
export default useArrivals;
