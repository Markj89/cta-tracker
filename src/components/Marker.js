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

const Marker = ({ alt, position }) => {
    console.log(marker);
    return (
        <MarkerWrapper position={position}>
            <img src={`${marker}`} alt={alt} width='50' height='50' style={{position: 'absolute' }} />
        </MarkerWrapper>
    );
};

Marker.propTypes = {
    position: PropTypes.object,
    alt: PropTypes.string
};

export default Marker;