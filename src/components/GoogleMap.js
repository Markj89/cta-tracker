import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialCenter: {
        lat: 0,
        lng: 0,
      },
      places: []
    };

    this.loadMap = this.loadMap.bind(this);
    this.renderTransit = this.renderTransit.bind(this);
  }

  componentDidMount() {
    this.loadMap();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.initialCenter.lat !== this.state.initialCenter.lat) {
      this.renderTransit();
    }
  }

  loadMap = () => {
    if (this.props && this.props.google) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.setState(prevState => ({
              initialCenter: {
                ...prevState.initialCenter,
                lat: position.coords.latitude,
                lng: position.coords.longitude
              }
            }
          ));
        })
      }
    }
  }

  onMapReady = (mapProps, map) => this.renderTransit(map, map.center);

  renderTransit = (map, center) => {
    const { google } = this.props;
    const service = new google.maps.places.PlacesService(map);

    const request = {
      location: center,
      radius : '5500',
      type : [ 'train_station' ]
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.setState({places: results});
        console.log(this);
      }
    });
  }

  render() {
    const {
      google,
      zoom,
      panControl,
      mapTypeControl,
      fullscreenControl,
      centerAroundCurrentLocation
    } = this.props;

    const {
      lat,
      lng
    } = this.state.initialCenter;
    return (
      <div>
        <Map
        google={google}
        center={{ lat: lat, lng: lng }}
        zoom={zoom}
        defaultCenter={this.state.initialCenter}
        panControl={panControl}
        mapTypeControl={mapTypeControl}
        fullscreenControl={fullscreenControl}
        onReady={this.onMapReady}
        centerAroundCurrentLocation={centerAroundCurrentLocation}>
          <Marker position={{lat: lat, lng: lng }} />
        </Map>
      </div>
    );
  }
}

MapContainer.defaultProps = {
  initialCenter:  {
    lat: 0,
    lng: 0
  },
  zoom: 15,
  centerAroundCurrentLocation: true,
  panControl: false,
  mapTypeControl: false,
  fullscreenControl: false
};

MapContainer.propTypes = {
  google: PropTypes.object,
  initialCenter: PropTypes.object,
  zoom: PropTypes.number,
  centerAroundCurrentLocation: PropTypes.bool,
  places: PropTypes.object,
  panControl: PropTypes.bool,
  mapTypeControl: PropTypes.bool,
  fullscreenControl: PropTypes.bool
}

export default GoogleApiWrapper({
  apiKey: '',
  libraries: ['places'],
  language: 'en'
})(MapContainer);
