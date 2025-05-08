/**
 * Arrival By ID
 * @type {Hooks}
 */
import React, { useState, useEffect, useRef, useCallback } from "react";

const useArrivals = (stopId, refreshInterval = 1000) => {
  const isFetching = useRef(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(false);
  const getArrivalById = useCallback(async (stopId) => {
    try {
      setLoading(true);
      setError(false);

      const headers = {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      };

      const response = await fetch(`${process.env.SERVER_URL}/arrivals/${stopId}`, { 
        method: "POST",
        headers,
        body: JSON.stringify({ stopId: stopId })
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
  }, [stopId]);

  const refreshData = useCallback((payload) => {
    setLoading(true);
    setError(false);
    isFetching.current = true;
    getArrivalById(payload);
  }, [getArrivalById, stopId]);

  useEffect(() => {
    if (isFetching.current) {
      isFetching.current = false;
      getArrivalById(stopId);
    }

    intervalRef.current = setInterval(() => {
      getArrivalById(stopId);
    }, refreshInterval);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [getArrivalById, refreshInterval, stopId]);
  
  return { data, loading, error, refetch: refreshData };
};
export default useArrivals;
