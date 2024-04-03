import React, { useState, useContext, useEffect } from 'react';
import Map from './components/Map';
import { MapContext } from './context/MapContext';
import useGetCurrentPosition from './hooks/useGetCurrentPosition';
import useWindowDimensions from './hooks/useWindowDimensions';
import { LoadingPage } from './components/Loader';

function App() {  
  const {location, setLocation } = useContext(MapContext);
  const { height, width } = useWindowDimensions();
  const { isLoading, currentLocation } = useGetCurrentPosition({initialCenter: {lat: 0, lng: 0}});

  useEffect(() => {
    if (currentLocation) {
      setLocation(currentLocation);
    }
  }, [currentLocation, location]);

  const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => setLoading(false), 3300)
    }, [])
    if (loading) {
        return <LoadingPage />
    }
  return (
    <article>
      <div className="App">
        { isLoading && location?.lat !== 0 && (
          <Map height={height} width={width} currentLocation={location} />
        )}
      </div>
    </article>
  );
}

export default App;
