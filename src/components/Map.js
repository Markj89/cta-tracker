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
import trainsList from '../utils/train_color.json';
import Marker from './Marker';
import http from '../utils/http-common';
import InfoWindow from './InfoWindow';
import Sidebar from './Sidebar';
import useModal from '../hooks/useModal';

function Map({ zoom }) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState(`${process.env.DEV_URL}/stations`);
  const {status, currentLocation } = useGetCurrentPosition({initialCenter: {lat: 0, lng: 0}});
  const { stations } = useGetStationsLocally(url);
  const [response, setResponse] = useState({data: null, isLoading: true, error: null});
  const { height, width } = useWindowDimensions();
  const {isVisible, toggleModal} = useModal();

  const mapRef = useRef();
  const options = {
    panControl: true,
    mayTypeControl: false,
    scrollwheel: false,
    fullscreenControl: false,
    disableDefaultUI: false,
    styles: require('../utils/map_style.json')
  };

  /**
   * arrivals
   * @Function
   * @param {*} stop 
   */
  const arrivals = async (id, station) => {
    await fetch(`${url}/${id}`, {
      method: 'GET',
      body: station
    }).then(res => {
      if (res.status === 200) {
          if (res === null) {
              setResponse({ data: null, isLoading: false, error: 'No data returned' });
          } else {
              setResponse({ data: res.data.ctatt.eta, isLoading: false, error: null });
          }
      }
    }).catch((error) => {
        console.log(`Error: ${error}`);
        setResponse({data: null, isLoading: false, error});
    });
    toggleModal();

  }

  const markers = stations.map((station, i) => station.stops.map((stop, j) => (
    <Marker 
    key={i[j]} 
    lat={stop.lat} 
    color={Object.keys(stop).find(key => stop[key] === true && key !== 'ada')}
    lng={stop.lng}
    alt={station.station_name} 
    markerClick={() => arrivals(station['_id'], stop)} />
  )));

  return (
    <Fragment>
      { status === "Found" || status === "Default Location" ? (
        <div style={{ position: 'relative', 'iframe': { pointerEvents: 'none'}, height: `${height}px`, width: `${width}px` }}>
          <Sidebar click={() => {
            setOpen(!open);
          }} open={open}>
            {trainsList.map((train, index) => (
              <li className="route" role="option" key={index}>
                <div className={`${train.id} train`}></div>
                <button onClick={(e) => {
                  e.preventDefault();
                  setUrl(`${process.env.DEV_URL}/stations/${train['_id']}`);
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
              isVisible ? (
                <InfoWindow isVisible={isVisible} hideModal={toggleModal} stationData={response['data']} />
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