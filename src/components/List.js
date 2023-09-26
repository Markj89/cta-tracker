/**
 * List Display
 * @type {Component}
 */

import React, { useState, Fragment, useRef } from 'react';
import useGetCurrentPosition from '../hooks/useGetCurrentPosition';
import useGetStationsLocally from '../hooks/useGetStationsLocally';
import PropTypes from 'prop-types';


export default function List() {
    const [url, setUrl] = useState(`${process.env.DEV_URL}/`);
    const {status, currentLocation } = useGetCurrentPosition({initialCenter: {lat: 0, lng: 0}});
    const { stations } = useGetStationsLocally(url);

}