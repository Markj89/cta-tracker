import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(
  faAngleUp,
  faAngleDown
);

const Sidebar = ({open, click, children}) => {
  function clickHandler(e) {
    e.preventDefault();
    click();
    return false;
  }

  return (
    <div className="sidebar_wrapper">
      <Logo />
      <Fragment>
        <div className="dropdown_container">
          <div className="dropdown">
            <ul>
              <li className="dropdown_trigger">
                <div className="train_wrapper"role="listbox" tabIndex="0" onMouseDown={(e) => clickHandler(e)}>
                  <div className="train routes" style={{ width: '60px', height: '57px', textDecoration: 'none', color: '#fff', backgroundColor: '#000', display: 'flex', borderRadius: '3px 0px 0px 3px'}}></div>
                  <div className="view_route">
                    <span>View Routes</span>
                    { open ? <FontAwesomeIcon icon={faAngleUp} size="2x" /> : <FontAwesomeIcon icon={faAngleDown} size="2x" /> }
                  </div>
                </div>
                { open && (
                  <ul className="trainlist">
                    {children}
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>
      </Fragment>
    </div>
  );
}

Sidebar.defaultProps = {
  open: false
};

Sidebar.propTypes = {
  open: PropTypes.bool,
  click: PropTypes.func,
  children: PropTypes.element
}

export default Sidebar;
