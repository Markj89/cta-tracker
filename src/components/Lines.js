/**
 * Train Lines (Sidebar)
 * @type {Component}
 */
import React from 'react';
import PropTypes from 'prop-types';

const Lines = ({ handleClick, color, id }) => {
  return (
    <li className="route" role="option">
      <div className={`${id} train`}></div>
      <button onClick={() => handleClick()} style={{cursor: 'pointer', outline: 'none', border: 0, background: 'transparent', margin: '0 auto'}}>{color} Line</button>
    </li>
  );
}
Lines.propTypes = {
  handleClick: PropTypes.func,
  color: PropTypes.string,
  id: PropTypes.string
}

export default Lines;
