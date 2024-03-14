import React, { useContext, useEffect } from 'react';
import Map from './components/Map';
import { MapContext, MapProvider, initiCenerType } from './MapContext';
import './styles/index.scss';
import useGetCurrentPosition from './hooks/useGetCurrentPosition';
import useWindowDimensions from './hooks/useWindowDimensions';

function App() {  
  const { location, setLocation } = useContext(MapContext);
  const {isLoading, currentLocation } = useGetCurrentPosition({initialCenter: {lat: 0, lng: 0}});
  const { height, width } = useWindowDimensions();
  useEffect(() => {
    if (isLoading) {
      setLocation(currentLocation as initiCenerType);
    }
  }, [isLoading, location]);

  return (
    <MapProvider value={{ location, setLocation, width, height }}>
      <article className="App">
        <Map height={height} width={width} currentLocation={currentLocation} loading={status} />
      </article>
    </MapProvider>
  );
}

export default App;
