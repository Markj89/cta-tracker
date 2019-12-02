import React, { Component } from 'react';


export default class Train extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      <div>
        {
          <h1>This is the {this.props.trainName} line</h1>
        }
      </div>
    )
  }
};
