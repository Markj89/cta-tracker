import React, { Component, Fragment } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

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

  getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;

          this.setState((state, props) => ({
            currentLocation: {
              lat: state.lat,
              lng: state.lng
            }
          }));
        }
      );
    }
  }

  componentDidMount() {
    this.getCurrentLocation();
    console.log(this.state);
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
          mapCenter={this.state.currentLocation} />
        <Trains />
      </Fragment>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCVFrZNmZfDRCLwGoNJL30iJE6WG-W37zo'
})(MapContainer);
