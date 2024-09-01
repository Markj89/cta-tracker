/**
 * Arrival
 * @type {Hooks}
 */
import React, { useState, useEffect, useRef, useCallback } from "react";

const useArrivals = (initialState) => {
  const isFetching = useRef(true);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const getArrivals = useCallback(async (initialState) => {

    try {
      const headers = {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      };
      await fetch(`${process.env.SERVER_URL}/arrivals/${initialState?.map_id}`, { headers })
      .then((response) => response.json())
      .then((res) => {
        if (res?.ctatt.errNm != null) {
          setData(res?.ctatt.errNm);
          setLoading(false); 
          setError(false);
        } else {
          setData(res?.ctatt.eta);
          setLoading(false);
          setError(true);
        }
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
        setData(error);
        setLoading(false);
        setError(true);
      });
    } catch (error) {
      console.log(error);
      setData(error);
      setLoading(false);
      setError(true);
    }
  }, []);

  const refreshData = useCallback((payload) => {
    setData(null);
    setLoading(null);
    setError(null);
    isFetching.current = true;
  }, []);

  useEffect(() => {
    if (isFetching.current) {
      isFetching.current = false;
      getArrivals(initialState);
    }
  }, [isFetching.current]);
  return { data, loading, error, refetch: refreshData };
};
export default useArrivals;
