/**
 * Arrival
 * @type {Hooks}
 */
import React, { useState, useEffect, useRef, useCallback } from "react";

const useArrivals = (stopIds, refreshInterval = 1000) => {
  const stopIdRefs = useRef(stopIds);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    stopIdRefs.current = stopIds;
  }, [stopIds]);
  
  const getArrivals = useCallback(async (ids: string | string[], signal?: AbortSignal) => {
    try {
      setError(false);
     
      const stopIdsArray = Array.isArray(stopIds) ? stopIds : [stopIds];
      if (stopIdsArray.length === 0) return;
      
      const response = await fetch(`${process.env.SERVER_URL}/arrivals`, {
        signal,
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ stopIds: stopIdsArray })
      });

      const res = await response.json();
      if (res?.error) {
        setData(null);
        setError(true);
      } else {
        setData(res?.arrivals);
        setError(false);
      }
    } catch (error: any) {
      if (error?.name !== "AbortError") {
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  }, [stopIds]);

  const refreshData = useCallback(() => {
    setLoading(true);
    getArrivals(stopIdRefs.current);
  }, [getArrivals]);

  useEffect(() => {
    const abort = new AbortController();
    const currentIds = stopIdRefs.current;
    const hasStops = Array.isArray(currentIds) ? currentIds.length > 0 : !!currentIds;
    if (hasStops) {
      setLoading(true);
      getArrivals(currentIds, abort.signal);
    }

    const intervalId = setInterval(() => {
      getArrivals(stopIdRefs.current, abort.signal);
    }, refreshInterval);

    return () => {
      clearInterval(intervalRef.current);
      abort.abort();
    };
  }, [getArrivals, refreshInterval, stopIds]);
  
  return { data, loading, error, refetch: refreshData, getArrivals };
};
export default useArrivals;
