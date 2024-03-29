import React, { useContext, useEffect } from 'react';
import Map from './components/Map';
import { MapContext } from './context/MapContext';
import './styles/index.scss';
import useGetCurrentPosition from './hooks/useGetCurrentPosition';
import useWindowDimensions from './hooks/useWindowDimensions';

function App() {  
  const {location, setLocation } = useContext(MapContext);
  const { height, width } = useWindowDimensions();
  const { isLoading, currentLocation } = useGetCurrentPosition({initialCenter: {lat: 0, lng: 0}});

  useEffect(() => {
    if (currentLocation) {
      setLocation(currentLocation);
    }
  }, [currentLocation, location]);

  return (
    <main>
      <article className="App">
        { isLoading && location?.lat !== 0 ? (
          <Map height={height} width={width} currentLocation={location} />
        ) : (
          <div>Loading</div>
        )}
      </article>
    </main>
  );
}

export default App;
