import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Location from './Location.js';

/*import {
  BrowserRouter,
  Route,
  Link,
  Switch
} from "react-router-dom";*/
//import Train from './components/Train';
const URL = 'http://localhost:9000/api/';
//const QUERY = [{ ARRIVALS : 'ttarrivals.aspx' }, { LOCATION : 'ttpositions.aspx' }];

const trains = [
  {
    name: 'Red',
    id: 'red',
    key: 1
  },
  {
    name: 'Blue',
    id: 'blue',
    key: 2
  }
];


export default class Trains extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trainList: [],
      showComponent: false
    };
    this.callAPI = this.callAPI.bind(this);
  }

  callAPI = (e, val) => {
    e.preventDefault();
    axios({
      method: 'post',
      url: URL,
      data: {
        rt: val
      }
    }).then(res => {
      let routes = res.data.ctatt.route;
      for (let route in routes) {
        console.log(route, routes[route]['train']);
      }
      this.setState({trainList: "", showComponent: true});
    }).catch(err => {
      console.log(err);
      //throw new Error('Error!');
    });
  };

  render() {
    return (
      <section>
        <div id="overlay"></div>
        <div className="trainlist">
          <div className="container">
            {
              trains.map((train, index) => {
                return (
                  <Fragment>
                    <button className="btn train" key={train.key} onClick={ e => this.callAPI(e, train.id) }>
                      <ul>
                        <a href={`/${train.id}`}>
                          <div className={`${train.id}`}></div>

                          <li key={train.key} value={train.id}>{ train.name }</li>
                        </a>
                      </ul>
                    </button>
                  </Fragment>
                )
              }
            )
          }
          </div>
          {this.state.showComponent ? <Location /> : null }

        </div>
      </section>
    );
  }
};
