/**
 * Marker
 * @type {Component}
 */

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from './Icon';

const MarkerWrapper = styled.div`
position: absolute;
top: -30px;
left: -10px;
cursor : pointer;
z-index: 100;
`;

const Marker = ({ color, alt, lat, lng, markerClick }) => {
    function clickHandler(event) {
        event.preventDefault();
        markerClick();
        return  false;
    }
    const markerRef = useRef(null);
    return (
        <MarkerWrapper lat={lat} lng={lng} onMouseDown={clickHandler} ref={markerRef}>
            <Icon color={color} style={{ position: 'absolute' }} />
        </MarkerWrapper>
    );
};

Marker.propTypes = {
    markerClick: PropTypes.func,
    lat: PropTypes.number,
    lng: PropTypes.number,
    alt: PropTypes.string,
    color: PropTypes.string
};

export default Marker;