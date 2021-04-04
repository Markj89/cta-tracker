/**
 * Station
 * @type {Component}
 */
import React, { Fragment } from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StationBox = styled.div`
    position: absolute;
    background-color: #fff;
    box-sizing: border-box;
    border: 1px solid #fafbfc;
    box-shadow: -3px 0 5px rgba(36,41,46,.05);
    border-radius: 2px;
    z-index: 1000000;
    padding: 15px;
    width: 300px;
    height: 240px;
    h2 {
        font-size: 18px;
        letter-spacing: 0.24px;
    }
`;

const InfoWindow = ({open, stationData}) => {
    return (
        <div style={{ display: `${open === true} ? block : none`}}>
            <StationBox>
                <div>
                    <div>
                        <h2>{stationData.station_descriptive_name}</h2>
                    </div>
                </div>
            </StationBox>
        </div>
    );
};

InfoWindow.defaultProps = {
    open: false
};

InfoWindow.propTypes = {
    open: PropTypes.bool,
    stationData: PropTypes.object
};

export default InfoWindow;