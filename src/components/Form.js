import React, {Component} from 'react';
import ReactDOM from 'react-dom';


export default class Form extends  {
  constructor(props) {
    super(props);
    this.state = {location: ''};
  }

  render() {
    return(
      <form>
        <div className="first-user">
          <label>Location</label>
          <input type="text" value={this.state.location} class=""/>
        </div>
        <div className="first-user">
          <input type="submit" value="Submit" class="btn"/>
        </div>
      </form>
    )
  }

}
