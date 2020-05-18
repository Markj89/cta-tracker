import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const ENDPOINT = 'http://localhost:9000/locations';

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
  }
];

class Trains extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trains: [],
    };

    this.callAPI = this.callAPI.bind(this);
  }

  callAPI = (e, val) => {
    e.preventDefault();
    axios({
      method: 'post',
      url: ENDPOINT,
      data: {
        rt: val.id
      }
    }).then(res => {
      console.log(res);
      let routes = res.data.ctatt.route;
      let newState = [];

      for (let route in routes) {
        for (var i = 0; i < routes[route]['train'].length; i++) {
          newState.push(routes[route]['train'][i]);
        }
        this.setState({
          trains: newState,
        });
      }
    }).catch(err => {
      console.log(err);
    });
  };

  render() {
    return (
      <div>
        <div className="trainlist">
          <div className="container">
            {
              trainsList.map((train, index) => {
                return (
                  <button className="btn train" key={index} onClick={(e) => this.callAPI(e, train)}>
                    <ul>
                      <a href={`/${train.id}`}>
                        <div className={`${train.id}`} key={index}></div>
                        <li key={train[index]} value={train.id}>{ train.name } Line</li>
                      </a>
                    </ul>
                  </button>
                )
              }
            )
          }
          </div>
        </div>
      </div>
    );
  }
};

Trains.propTypes = {
  trains: PropTypes.object
}

export default Trains;
