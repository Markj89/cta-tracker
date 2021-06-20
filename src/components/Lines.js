/**
 * Train Lines (Sidebar)
 * @type {Component}
 */
import React, { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(
  faAngleUp,
  faAngleDown
);
const trainsList = [
  {
    name: 'Red',
    id: 'red',
  },
  {
    name: 'Blue',
    id: 'blue',
  },
  {
    name: 'Orange',
    id: 'org',
  },
  {
    name: 'Pink',
    id: 'pink',
  },
  {
    name: 'Brown',
    id: 'brn',
  },
  {
    name: 'Green',
    id: 'g',
  },
  {
    name: 'Purple',
    id: 'p'
  },
  {
    name: 'Yellow',
    id: 'y'
  }
];

const Lines = () => {
  const [open, setOpen] = useState(false);
  function toggleRoutes() {
    setOpen(!open);
  }

  return (
    <div className="dropdown_container">
      <div className="dropdown">
        <ul>
          <li className="dropdown_trigger">
            <div className="train_wrapper" onClick={() => toggleRoutes()}>
              <div className="train routes"></div>
              <div className="view_route">
                <span>View Routes</span>
                  { open ? <FontAwesomeIcon icon={faAngleUp} size="2x" /> : <FontAwesomeIcon icon={faAngleDown} size="2x" /> }
              </div>
            </div>
            { open && <ul className="trainlist">
              {
              trainsList.map((train, index) => {
                return (
                  <li className="route" key={index}>
                    <div className={`${train.id}`  + ' train'}></div>
                    <a href={`/${train.id}`}>
                      { train.name } Line
                    </a>
                  </li>
                )
              }
            )}</ul> }
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Lines;
