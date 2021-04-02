/**
 * Marker
 * @type {Component}
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import marker from './../assets/img/marker.png';

const MarkerWrapper = styled.div`
position: absolute;
user-select: none;
transform: translate(-50%, 0);
cursor : pointer;
z-index: 1000000;
`;

const Marker = ({ alt, lat, lng }) => {
    return (
        <MarkerWrapper lat={lat} lng={lng}>
            <img src={`${marker}`} alt={alt} width='50' height='50' style={{position: 'absolute' }} />
            <div style={{ width: '200px', position: 'relative', display: 'block' }}>
            `   {alt}
            </div>
        </MarkerWrapper>
    );
};

Marker.propTypes = {
    lat: PropTypes.number,
    lng: PropTypes.number,
    //position: PropTypes.object,
    alt: PropTypes.string
};

export default Marker;