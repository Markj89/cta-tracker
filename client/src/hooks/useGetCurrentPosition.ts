import { useState, useEffect } from 'react';

export default function useGetCurrentPosition(initialCenter: any) {
  const [currentLocation, setCurrentLocation] = useState({lat: 0, lng: 0});
    const [isLoading, setLoading] = useState(false);
    const [status, setStatus] = useState('idle');
    const [locationEnabled, isLocationEnabled] = useState(false);
    
    useEffect(() => {
      async function fetchCoords() {
        try {
          if (navigator.geolocation) {
            await navigator.geolocation.getCurrentPosition((position) => {
              setCurrentLocation({lat: position.coords.latitude, lng: position.coords.longitude});
              setLoading(true);
              isLocationEnabled(true);
            }, (error) => {
              isLocationEnabled(false);
              if (error.message === 'User denied geolocation prompt') {
                setCurrentLocation({
                  lat: 41.8715602,
                  lng: -87.6688045
                })
                setStatus("Default Location");
              } else {
                setStatus('No Geolocation found');
              }
            }, {enableHighAccuracy: false, maximumAge:Infinity, timeout:10000}
            );
          } else {
            isLocationEnabled(false);
            setLoading(false);
          }
        } catch (error) {
          console.warn(error);
          setLoading(false);
        }
      }
      fetchCoords();
    }, []);
    return { isLoading, currentLocation };
};