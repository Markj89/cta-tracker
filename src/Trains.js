import React, { Component } from 'react';
import axios from 'axios';

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
      trainList: ""
    };

    this.callAPI = this.callAPI.bind(this);
  }

  callAPI = (e) => {
    console.log(this.state.trainList);
    axios({
      method: 'post',
      url: URL,
      data: {
        rt: e.target.value
      }
    }).then(res => {
      console.log(res.data);
      this.setState({trainList: res.data});
    }).catch(err => {
      console.log(err);
    });
  };

  componentDidMount() {}

  render() {
    return (
      <aside className={'sidebar-nav'}>
        {
          trains.map((train, index) => {
            return <button key={train.key} onClick={this.callAPI} className={`btn train ${train.id}`} value={train.id}>{train.name}</button>
        })}

      </aside>
    );
  }
};
