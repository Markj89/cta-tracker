import React, { Component } from 'react';
import Lines from './Lines';
import Logo from './Logo';

class Sidebar extends Component {

  render() {
    return(
      <div className="sidebar_wrapper">
        <Logo />
        <Lines />
      </div>
    )
  }
}

export default Sidebar;
