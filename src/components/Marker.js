/**
 * Marker
 * @type {Component}
 */

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import marker from './../assets/img/marker.png';

const MarkerWrapper = styled.div`
position: absolute;
top: -30px;
left: -10px;
cursor : pointer;
z-index: 100;
`;

const Marker = ({ alt, lat, lng, markerClick }) => {
    function clickHandler(event) {
        event.preventDefault();
        markerClick();
        return  false;
    }
    const markerRef = useRef(null);
    return (
        <MarkerWrapper lat={lat} lng={lng} onMouseDown={clickHandler} ref={markerRef}>
            <img src={`${marker}`} alt={alt} width='50' height='50' style={{position: 'absolute' }} loading="lazy" />
        </MarkerWrapper>
    );
};

Marker.propTypes = {
    markerClick: PropTypes.func,
    lat: PropTypes.number,
    lng: PropTypes.number,
    alt: PropTypes.string
};

export default Marker;