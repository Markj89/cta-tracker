/**
 * Arrival By ID
 * @type {Hooks}
 */
import React, { useState, useEffect, useRef, useCallback } from "react";

const useArrivals = (stopId) => {
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

  useEffect(() => {
    getArrivalById(stopId);
  }, [getArrivalById, stopId]);
  
  return { data, loading, error };
};
export default useArrivals;
