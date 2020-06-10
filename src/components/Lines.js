import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
faAngleUp,
faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(
  faAngleUp,
  faAngleDown
);
const ENDPOINT = 'http://localhost:9000/stations';
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

class Trains extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trains: [],
      open: false
    };

    this.callAPI = this.callAPI.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.toggleRoutes = this.toggleRoutes.bind(this);
  }

  handleClickOutside = () => {
    this.setState({
      open: false
    });
  }

  toggleRoutes = () => {
    this.setState(prevState => ({
      open: !prevState.open
    }));
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
    const {
      open
    } = this.state;
    return (
      <div className="dropdown_container">
        <div className="dropdown">
          <ul>
            <li className="dropdown_trigger">
              <div className="train_wrapper" onClick={() => this.toggleRoutes()}>
                <div className="train routes"></div>
                <div className="view_route">
                  <span>View Routes</span>
                    { open ? <FontAwesomeIcon icon={faAngleUp} size="2x" /> : <FontAwesomeIcon icon={faAngleDown} size="2x" /> }
                </div>
              </div>
              { open && <ul className="trainlist">
                {
                trainsList.map((train, index) => {
                  return (
                    <li className="route" key={index} onClick={(e) => this.callAPI(e, train)}>
                      <div className={`${train.id}`  + ' train'}></div>

                      <a href={`/${train.id}`}>
                        { train.name } Line
                      </a>
                    </li>
                  )
                }
              )}</ul> }
            </li>
          </ul>
        </div>
      </div>
    );
  }
};

Trains.propTypes = {
  trains: PropTypes.object
}

export default Trains;
