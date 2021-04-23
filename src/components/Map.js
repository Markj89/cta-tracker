/**
 * Map
 * @type {Component}
 */
import React, { useState, Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import GetCurrentPosition from '../hooks/GetCurrentPosition';
import GetStationsLocally from '../hooks/GetStationsLocally';
import Arrivals from '../hooks/Arrivals';
import styled from 'styled-components';
import Marker from './Marker';
import InfoWindow from './InfoWindow';

const MapWrapper = styled.div`
  position: relative;
  height: 100vh;
  width: 1000px;
  iframe {
    pointer-events: none;
  }
`;

function Map({ zoom }) {
  const {status, currentLocation } = GetCurrentPosition({initialCenter: {lat: 0, lng: 0}});
  const { places } = GetStationsLocally(process.env.DEV_URL);
  const [active, setActive] = useState(false);
  const [station, setStation] = useState([]);
  const [ res, callForArrivals ] = Arrivals({
    url: `${process.env.DEV_URL}/arrivals`,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    payload: station
  });

  const mapRef = useRef();
  
  const options = {
    panControl: true,
    mayTypeControl: false,
    scrollwheel: false,
    fullscreenControl: false,
    disableDefaultUI: false,
  };

  function openStation() {
    setActive(!active);
  }

  function handleCursor(arg) {
    setStation(arg);
    callForArrivals();
  }

  const markers = places.map((place, i) => place.stops.map((stop, j) => (
    <Marker 
    key={i[j]} 
    lat={stop.lat} 
    lng={stop.lng} 
    alt={stop.station_descriptive_name} 
    onClick={(event) => {
      event.preventDefault();
      document.addEventListener("mousedown", handleCursor(stop));
    }} />
  )));

  return (
    <Fragment>
      { status === "Found" ? (
        <MapWrapper>
          <GoogleMapReact
            bootstrapURLKeys={{ 
              key: `${process.env.GOOGLE_KEY}`,
              language: 'en',
              libraries: 'places'
            }}
            options={options}
            defaultCenter={currentLocation}
            defaultZoom={zoom}
            yesIWantToUseGoogleMapApiInternals
            onChildClick={openStation}
            onGoogleApiLoaded={({map, maps}) => {
    	        mapRef.current = map;
              var service = new maps.places.PlacesService(map);
    	      }}
          >
            {
              active && res['isLoading'] === true ? (
                <InfoWindow open={active} stationData={res['data']} />
              ): null}
            {markers}
          </GoogleMapReact>
      </MapWrapper>
      ) : null}
    </Fragment>
  );
}

Map.defaultProps = {
  zoom: 15,
};

Map.propTypes = {
  zoom: PropTypes.number,
}

export default Map;