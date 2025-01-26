import React, { useState, useContext, useEffect } from 'react';
import Map from './components/Map/Map';
import { MapContext } from './context/MapContext';
import useGetCurrentPosition from './hooks/useGetCurrentPosition';
import useWindowDimensions from './hooks/useWindowDimensions';
import { LoadingPage } from './components/Loader';
import { Status, Wrapper } from '@googlemaps/react-wrapper';
import useScreenSize from './hooks/useScreenSize';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './Pages/404';

function App() {  
  const {location, setLocation, setScreenSize } = useContext(MapContext);
  const { height, width } = useWindowDimensions();
  const { isLoading, currentLocation } = useGetCurrentPosition({initialCenter: {lat: 0, lng: 0}});
  const render = (status: Status) => (<h1>{status}</h1>);
  const whatsTheScreenSize = useScreenSize();
  useEffect(() => {
    if (currentLocation) {
      setLocation(currentLocation);
    }
    if (whatsTheScreenSize?.width > 0) {
      setScreenSize(whatsTheScreenSize);
    }
  }, [currentLocation, location]);

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => setLoading(false), 3300)
  }, []);
  if (loading) {
    return <LoadingPage />
  }

  return (
    <article>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              isLoading && location?.lat !== 0 && (
                <Wrapper apiKey={`${process.env.GOOGLE_KEY}`} render={render}>
                  <Map height={height} width={width} currentLocation={location} zoom={11} />
                </Wrapper>
              )
            } />
            <Route path="404" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </article>
  );
}

export default App;
