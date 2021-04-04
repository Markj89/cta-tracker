/**
 * Marker
 * @type {Component}
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import marker from './../assets/img/marker.png';

const MarkerWrapper = styled.div`
position: absolute;
top: -30px;
left: -10px;
user-select: none;
cursor : pointer;
z-index: 1;
`;

const Marker = ({ alt, lat, lng, onClick }) => {
    return (
        <MarkerWrapper lat={lat} lng={lng} onMouseDown={onClick}>
            <img src={`${marker}`} alt={alt} width='50' height='50' style={{position: 'absolute' }} />
            <div style={{ width: '200px',textAlign: 'center', position: 'absolute', top: '60px', left: '-50px', display: 'block' }}>
                {alt}
            </div>
        </MarkerWrapper>
    );
};

Marker.propTypes = {
    onClick: PropTypes.func,
    lat: PropTypes.number,
    lng: PropTypes.number,
    alt: PropTypes.string
};

export default Marker;