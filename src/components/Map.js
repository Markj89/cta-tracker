/**
 * Map
 * @type {Component}
 */
import React, { useState, Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import GetCurrentPosition from '../hooks/GetCurrentPosition';
import GetStationsLocally from '../hooks/GetStationsLocally';
import useWindowDimensions from '../hooks/useWindowDimensions';
import Marker from './Marker';
import http from '../utils/http-common';
import InfoWindow from './InfoWindow';


function Map({ zoom }) {
  const {status, currentLocation } = GetCurrentPosition({initialCenter: {lat: 0, lng: 0}});
  const { places } = GetStationsLocally(process.env.DEV_URL);
  const [active, setActive] = useState(false);
  const [response, setResponse] = useState({data: null, isLoading: true, error: null});
  const { height, width } = useWindowDimensions();

  const mapRef = useRef();
  const options = {
    panControl: true,
    mayTypeControl: false,
    scrollwheel: false,
    fullscreenControl: false,
    disableDefaultUI: false,
    styles: require('../utils/map_style.json')
  };

  const arrivals = async (stop) => {
    await http.post('/arrivals', stop).then(res => {
      if (res.status === 200) {
          if (res.data.ctatt.errNm != null) {
              setResponse({ data: null, isLoading: false, error: res.data.ctatt.errNm });
          } else {
              setResponse({ data: res.data.ctatt.eta, isLoading: false, error: null });
          }
      }
    }).catch((error) => {
        console.log(`Error: ${error}`);
        setResponse({data: null, isLoading: false, error});
    });
    setActive(!active);
  }

  const markers = places.map((place, i) => place.stops.map((stop, j) => (
    <Marker 
    key={i[j]} 
    lat={stop.lat} 
    color={Object.keys(stop).find(key => stop[key] === true && key !== 'ada')}
    lng={stop.lng}
    alt={place.station_name} 
    markerClick={() => arrivals(stop)} />
  )));

  return (
    <Fragment>
      { status === "Found" || status === "Default Location" ? (
        <div style={{ position: 'relative', 'iframe': { pointerEvents: 'none'}, height: `${height}px`, width: `${width}px` }}>
          <GoogleMapReact
            bootstrapURLKeys={{ 
              key: `${process.env.GOOGLE_KEY}`,
              language: 'en',
              libraries: 'places'
            }}
            options={options}
            defaultCenter={currentLocation}
            defaultZoom={status === 'Default Location' ? 13 : zoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({map, maps}) => {
    	        mapRef.current = map;
              var service = new maps.places.PlacesService(map);
    	      }}
          >
            {
              active ? (
                <InfoWindow open={active} stationData={response['data']} />
              ): null}
            {markers}
          </GoogleMapReact>
      </div>
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