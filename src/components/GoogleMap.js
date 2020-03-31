import React, { Component, Fragment } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import customStyles from '../assets/mapStyle.json';

// Components
import Trains from './Trains.js';

// JSON
import mapStyle from '../assets/mapStyle.json';

const mapStyles = {
  width: '100%',
  height: '100%',
  styles: mapStyle
};

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLocation: {
        lat: 0,
        lng: 0
      }
    };
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
  }

  static defaultProps = {
    lat: 0,
    lng: 0
  };

  componentDidMount() {
    this.getCurrentLocation();
  }

  getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState(prevState => ({
            currentLocation: {
              ...prevState.currentLocation,
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          }))
        }
      )
    }
  }

  render() {
    return (
      <Fragment>
        <Map
          google={this.props.google}
          style={mapStyles}
          zoom={16}
          streetViewControl={true}
          mapTypeControl={false}
          options={{styles: [ ...customStyles] }}
          center={this.state.currentLocation} />
        <Trains />
      </Fragment>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ''
})(MapContainer);
