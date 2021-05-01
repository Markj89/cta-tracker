import { useState, useEffect } from 'react';

function GetCurrentPosition(initialCenter) {
  const [currentLocation, setCurrentLocation] = useState({lat: 0, lng: 0});
    const [status, setStatus] = useState("idle");
    const [locationEnabled, isLocationEnabled] = useState(false);
    
    useEffect(() => {
      async function fetchCoords() {
        try {
          setStatus("Searching");
          if (navigator.geolocation) {
            await navigator.geolocation.getCurrentPosition((position) => {
              setCurrentLocation({lat: position.coords.latitude, lng: position.coords.longitude});
              setStatus("Found");
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
            setStatus('Geolocation turned off');
          }
        } catch (error) {
          console.warn(error);
          setStatus("Error found");      
        }
      }
      fetchCoords();
    }, []);
    return { status, currentLocation };
};

export default GetCurrentPosition;