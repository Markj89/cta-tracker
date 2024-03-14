/**
 * Arrival
 * @type {Hooks}
 */
import React, { useState, useEffect, useRef, useCallback } from "react";

const useArrivals = (initialState) => {
  const isFetching = useRef(true);
  const [response, setResponse] = useState(initialState);

  const callForArrivals = async () => {
    try {
      const headers = {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      };

      fetch(`${process.env.DEV_URL}/arrivals/`, { headers })
        .then((response) => response.json())
        .then((res) => {
          if (res.data.ctatt.errNm != null) {
            setResponse({
              data: null,
              isLoading: false,
              error: res.data.ctatt.errNm,
            });
          } else {
            setResponse({
              data: res.data.ctatt.eta,
              isLoading: false,
              error: null,
            });
          }
        })
        .catch((error) => {
          console.log(`Error: ${error}`);
          setResponse({ data: null, isLoading: false, error });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const refreshData = useCallback((payload) => {
    setResponse((prevState) => ({ ...prevState, payload }));
    isFetching.current = true;
  });

  useEffect(() => {
    if (isFetching.current) {
      isFetching.current = false;
      callForArrivals();
    }
  }, [isFetching.current]);
  return [response, refreshData];
};
export default useArrivals;
