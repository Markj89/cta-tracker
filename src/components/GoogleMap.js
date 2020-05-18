import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Sidebar from './SideBar';
import Station from './Station';
import axios from 'axios';
import icon from './../assets/img/marker.png';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const URL = 'http://localhost:9000/arrivals';

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialCenter: {
        lat: 0,
        lng: 0,
      },
      places: [],
      name: '',
      visible: false,
      selectedStation: null,
      oncoming: null
    };

    this.loadMap = this.loadMap.bind(this);
    this.renderTransit = this.renderTransit.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.loadMap();
  }

  componentDidMount() {}

  /*handleErrors(response) {
    if (response.ok !== true) {
      throw Error(response);
    }
    return response;
  }*/

  stationArrivals() {
    if (this.state.selectedStation !== null) {
      axios({
        method: 'post',
        url: URL,
        data: { station: this.state.selectedStation.name }
      }).then(response => {
        for (let variable in response) {
          if (response.hasOwnProperty(variable)) {
            this.setState({
              oncoming : response[variable].ctatt.eta
            });
          }
        }
      }).catch(error => {
        console.log(error);
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.initialCenter.lat !== this.state.initialCenter.lat) {
      this.renderTransit();
    }
    if (prevState.selectedStation !== this.state.selectedStation) {
      this.stationArrivals();
    }
  }

  onMarkerClick = (i) => {
    this.setState(prevState => ({
      visible: !prevState.visible,
      selectedStation: i
    }));
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
      types : [ 'subway_station' ]
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.setState({places: results});
      }
    });
  }

  renderStation = () => {
    this.stationArrivals = this.stationArrivals.bind(this);
    if (this.state.selectedStation && this.state.oncoming !== null && this.state.visible !== false) {

      const {
        selectedStation,
        visible
      } = this.state;
      return (
        <Station selectedStation={selectedStation.name} visible={visible} oncoming={this.state.oncoming} />
      )
    }
  }

  render() {
    const {
      google,
      zoom,
      panControl,
      mapTypeControl,
      fullscreenControl,
      centerAroundCurrentLocation,
    } = this.props;

    const {
      lat,
      lng
    } = this.state.initialCenter;
    const {
      places,
     } = this.state;
    return (
      <div>
        <Sidebar />
        {this.renderStation()}

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
          <Marker google={this.props} name="Current Location" position={{lat: lat, lng: lng }} />
          {
            places.map((place, index) => {
              return (
                <Marker
                name={place.name}
                position={{ lat: place.geometry.viewport.Ya.g, lng: place.geometry.viewport.Ta.g}}
                icon={{ url: icon }}
                key={index}
                onClick={(index) => this.onMarkerClick(index)} />
              )
            })
          }
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
  fullscreenControl: false,
  visible: false
};

MapContainer.propTypes = {
  google: PropTypes.object,
  name: PropTypes.string,
  initialCenter: PropTypes.object,
  zoom: PropTypes.number,
  centerAroundCurrentLocation: PropTypes.bool,
  places: PropTypes.object,
  panControl: PropTypes.bool,
  mapTypeControl: PropTypes.bool,
  fullscreenControl: PropTypes.bool,
  visible: PropTypes.bool
}

// Disable default map loading container
const LoadingContainer = props => null;

export default GoogleApiWrapper({
  apiKey: '',
  libraries: ['places'],
  language: 'en',
  LoadingContainer: LoadingContainer
})(MapContainer);
