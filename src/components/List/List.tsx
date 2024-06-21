/**
 * List Component
 * @type {Component} List
 */
import React from 'react';
import { ListProps } from './List.types';
const Lines = ({ handleClick, color, id }: ListProps) => {
  return (
    <li className="route" role="option">
      <div className={`${id} train`}></div>
      <button onClick={() => handleClick()} style={{cursor: 'pointer', outline: 'none', border: 0, background: 'transparent', margin: '0 auto'}}>{color} Line</button>
    </li>
  );
}

export default Lines;
