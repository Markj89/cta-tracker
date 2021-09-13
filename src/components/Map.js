/**
 * Map
 * @type {Component}
 */
import React, { useState, Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import useGetCurrentPosition from '../hooks/useGetCurrentPosition';
import useGetStationsLocally from '../hooks/useGetStationsLocally';
import useWindowDimensions from '../hooks/useWindowDimensions';
import Marker from './Marker';
import http from '../utils/http-common';
import InfoWindow from './InfoWindow';
import Sidebar from './Sidebar';

function Map({ zoom }) {
  const [open, setOpen] = useState(false);
  const [stations, getStations] = useState([]);
  const {status, currentLocation } = useGetCurrentPosition({initialCenter: {lat: 0, lng: 0}});
  const { places } = useGetStationsLocally(`${process.env.DEV_URL}/Stations`);
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

  const trainsList = [
    {
      name: 'Red',
      id: 'red',
    },
    {
      name: 'Blue',
      id: 'blue',
    },
    {
      name: 'Orange',
      id: 'org',
    },
    {
      name: 'Pink',
      id: 'pink',
    },
    {
      name: 'Brown',
      id: 'brn',
    },
    {
      name: 'Green',
      id: 'g',
    },
    {
      name: 'Purple',
      id: 'p'
    },
    {
      name: 'Yellow',
      id: 'y'
    }
  ];

  function toggleRoutes() {
    setOpen(!open);
  }

  function useStationsByColor(initialValue) {
    http.get(`/Stations/find/${initialValue}`).then(res => {
      if (res.status !== 200) {
          getStations('No Stations detected');
      } else {
          getStations(res.data);
      }
    }).catch((error) => {
        console.warn(error);
    });
  }

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
          <Sidebar click={() => toggleRoutes()} open={open}>
            {trainsList.map((train, index) => (
              <li className="route" role="option" key={index}>
                <div className={`${train.id} train`}></div>
                <button onClick={(e) => {
                  e.preventDefault();
                  useStationsByColor(train.id);
                  return false;
                }} 
                style={{
                  cursor: 'pointer', 
                  outline: 'none', 
                  border: 0, 
                  background: 'transparent', 
                  margin: '0 auto'
                }}>
                  {train.name} Line
                </button>
              </li>
            ))}
          </Sidebar>
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