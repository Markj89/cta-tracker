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
              console.log(error);
              setStatus('No Geolocation found');
            }, {enableHighAccuracy: false, timeout: 10000, maximumAge: 0}
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