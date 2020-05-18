import React, { Component } from 'react';
import Lines from './Lines';
import Logo from './Logo';

class Sidebar extends Component {

  render() {
    return(
      <div>
        <aside>
          <Logo />
          <Lines />
        </aside>
      </div>
    )
  }
}

export default Sidebar;
