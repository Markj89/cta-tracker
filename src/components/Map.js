import React, { useState, Fragment, createContext } from 'react';
import GoogleMapReact from 'google-map-react';
import GetCurrentPosition from '../hooks/GetCurrentPosition';
import PropTypes from 'prop-types';

const Context = createContext({
  initialCenter: {
    lat: 0, 
    lng: 0
  },
});

function Map({ zoom, places }: props) {
  const {status, currentLocation} = GetCurrentPosition(Context.initialCenter);
  const [stations, setStations] = useState([]);
  const [visible, setVisible] = useState(false);
  const options = {
    panControl: false,
    mayTypeControl: false,
    scrollwheel: false,
    fullscreenControl: false,
    disableDefaultUI: true,
  };

  const handleApiLoaded = (map, maps) => {
    var service = new maps.places.PlacesService(map);

    const request = {
      location: currentLocation,
      radius : '5000',
      types: ['subway_station', 'transit_station', 'point_of_interest', 'establishment']
    };

    service.nearbySearch(request, (results, placeStatus) => {
      if (placeStatus === maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          console.log(results[i]);
          let infowindow = new maps.InfoWindow({
            content: `<h1>${results[i].name}</h1>`,
            position: {
              lat: parseFloat(results[i].geometry.location.lat()),
              lng: parseFloat(results[i].geometry.location.lng()) 
            },
          });

          let marker = new maps.Marker({
            position: {lat: parseFloat(results[i].geometry.location.lat()), lng: parseFloat(results[i].geometry.location.lng())},
            map: map,
            title: results[i].name
          });
      
          marker.addListener('click', () => {
            infowindow.open(map, marker);
          });
        }
      }
      setStations(results);
    });
  };


  return (
    <Fragment>
      { status === "Found" ? (
        <div style={{ height: '100vh', width: '1000px' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ 
              key: "AIzaSyCVFrZNmZfDRCLwGoNJL30iJE6WG-W37zo",
              language: 'en',
              libraries: 'places',
            }}
            options={options}
            defaultCenter={currentLocation}
            defaultZoom={zoom}
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          />
      </div>
      ) : null}
    </Fragment>
  );
}

Map.defaultProps = {
  zoom: 16,
};

Map.propTypes = {
  zoom: PropTypes.number,
  places: []
}


export default Map;