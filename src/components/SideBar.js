import React, { Fragment } from 'react';
import Lines from './Lines';
import Logo from './Logo';

const Sidebar = () => {
  return (
    <Fragment>
      <div className="sidebar_wrapper">
        <Logo />
        <Lines />
      </div>
    </Fragment>
  );
}

export default Sidebar;
