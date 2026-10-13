/**
 * Arrival By ID
 * @type {Hooks}
 */
import React, { useState, useEffect, useCallback, useRef } from "react";

const useArrivalById = (stopId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(false);

  const stopIdRef = useRef<AbortController | null>(null);

  const getArrivalById = useCallback(async (id: string, signal?: AbortSignal) => {
    try {
      const response = await fetch(`${process.env.SERVER_URL}/arrivals/${stopId}`, {
        signal,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stopId: stopId })
      });

      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const res = await response.json();

      if (signal.aborted) return;

      if (res?.error) {
        setData(null);
        setError(true);
      } else {
        setData(res?.arrivals);
        setError(false);
      }
    } catch (error: any) {
        if (signal.aborted) return;
        setData(error);
        setError(true);
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }
  }, []);

  const executeHook = useCallback((id: string) => {
    stopIdRef.current.abort();

    const controller = new AbortController();
    stopIdRef.current = controller;
    void getArrivalById(id, controller.signal);
  }, [getArrivalById]);

  useEffect(() => {
    if (!stopId) {
      setData(null);
      setLoading(false);
      setError(false);
      return;
    }

    stopIdRef.current?.abort();

    const controller = new AbortController();
    stopIdRef.current = controller;

    void getArrivalById(stopId, controller.signal);
    return () => {
      controller.abort();

      if (stopIdRef.current === controller) {
        stopIdRef.current = null;
      }
    };
  }, [getArrivalById, stopId]);
  
  useEffect(() => {
    return () => {
      stopIdRef?.current?.abort();
    }
  }, []);

  return { data, loading, error, executeHook };
};
export default useArrivalById;
