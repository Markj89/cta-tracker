/**
 * Map
 * @type {Component}
 */
import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import GetCurrentPosition from '../hooks/GetCurrentPosition';
import GetStationsLocally from '../hooks/GetStationsLocally';
import styled from 'styled-components';
import Marker from './Marker';

const MapWrapper = styled.div`
  position: relative;
  height: 100vh;
  width: 1000px;
`;

function Map({ zoom }) {
  const {status, currentLocation } = GetCurrentPosition({initialCenter: {lat: 0, lng: 0}});
  const { places } = GetStationsLocally(process.env.DEV_URL);
  const options = {
    panControl: true,
    mayTypeControl: false,
    scrollwheel: false,
    fullscreenControl: false,
    disableDefaultUI: false,
  };

  const handleApiLoaded = (map, maps) => {
    var service = new maps.places.PlacesService(map);
  };

  const markers = places.map((place, i) => place.stops.map((stop, j) => (
    <Marker key={i[j]} lat={stop.lat} lng={stop.lng} alt={stop.station_descriptive_name} />
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
          >
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