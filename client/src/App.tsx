import React, { useState, useContext, useEffect } from 'react';
import Map from './components/Map/Map';
import { MapContext } from './context/MapContext';
import useGetCurrentPosition from './hooks/useGetCurrentPosition';
import useGetStations from './hooks/useGetStations';
import useWindowDimensions from './hooks/useWindowDimensions';
import { LoadingPage } from './components/Loader';
import { Status, Wrapper } from '@googlemaps/react-wrapper';
import useScreenSize from './hooks/useScreenSize';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './Pages/404';
import ListPage from './Pages/ListPage';
import { mapMarkers, mapStations } from './utils/map';
import { findLocationsInRange } from './components/Map/Map.logic';
import useArrivals from './hooks/useArrivals';
import useArrivalById from './hooks/useArrivalById';

function App() {  
  const {location, setLocation, setScreenSize, station } = useContext(MapContext);
  const { height, width } = useWindowDimensions();
  const { isLoading, currentLocation } = useGetCurrentPosition({initialCenter: {lat: 0, lng: 0}});
  const render = (status: Status) => (<h1>{status}</h1>);
  const whatsTheScreenSize = useScreenSize();
  const { stations } = useGetStations(
    `${process.env.SERVER_URL}/stations`
  );

  const markers = mapMarkers(stations);
  const mappedStations = mapStations(markers);
  const nearbyLocations = findLocationsInRange(
      mappedStations,
      currentLocation,
      1
  );
  const nearbyLocationsIds = nearbyLocations?.map((location) => location?.map_id);
  const { data: arrivalsData, loading: dataLoading, error } = useArrivals(nearbyLocationsIds, 30000);
  const { data: arrivalData, loading: arrivalDataLoading } = useArrivalById(station?.map_id);

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

  
  if (loading && dataLoading) {
    return <LoadingPage />
  }

  return (
    <article>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path={"/"}  element={
              isLoading && location?.lat !== 0 && (
                <Wrapper apiKey={`${process.env.GOOGLE_KEY}`} render={render} libraries={["maps", "marker"]}>
                  <Map height={height} width={width} currentLocation={location} nearbyLocations={nearbyLocations} stations={stations} arrivals={arrivalData ?? arrivalsData} nearbyLocationsIds={nearbyLocationsIds} arrivalsLoading={dataLoading} arrivalErrors={error} zoom={11} />
                </Wrapper>
              )
            } />

            <Route path="404" element={<NotFound />} />
            <Route path="/list" element={<ListPage stations={stations} currentLocation={location} arrivals={arrivalData ?? arrivalsData} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </article>
  );
}

export default App;
