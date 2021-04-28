/**
 * Station
 * @type {Component}
 */
import React, { Fragment } from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import Moment from 'react-moment';


const StationBox = styled.div`
    position: absolute;
    background-color: #fff;
    box-sizing: border-box;
    border: 1px solid #fafbfc;
    box-shadow: -3px 0 5px rgba(36,41,46,.05);
    border-radius: 2px;
    z-index: 1000000;
    padding: 15px;
    width: 320px;
    height: 240px;
    z-index: 1000;
    overflow: auto;
    h2 {
        font-size: 18px;
        letter-spacing: 0.24px;
    }
`;

function findColor(stationColor) {
    let color;
    switch (stationColor) {
        case "Pink":
            color = '#e27ea6';
            break;
        case 'Blue':
            color = '#00a1de';
            break;
        case 'Green':
            color = '#009b3a';
            break;
        case 'Brown':
            color = '#62361b';
            break;
        case 'Purple':
            color = '#522398';
            break;
        case 'Yellow':
            color = '#f9e300';
            break;
        case 'Red':
            color = '#c60c30';
            break;
        case 'Orange':
            color = '#f9461c';
            break;
        default:
            color = '#565a5c';
            break;
    }
    return color;
}


const InfoWindow = ({open, stationData}) => {
    const getName = stationData.map((station, i) => {
        return station.staNm.split("(").shift();
    });

    return (
        <div style={{ display: `${open === true} ? block : none`}}>
            <StationBox>
                <div style={{ position: 'relative'}}>
                    <div>
                        <h2 style={{ fontSize: '2rem'}}>{getName[0]}</h2>
                    </div>
                    <div style={{height: '100%', overflow: 'scroll' }}>
                    {stationData.map((incoming, i) => (
                        <div key={i}>
                            <div style={{ backgroundColor: findColor(incoming.rt), borderRadius: '2px', alignContent: 'center', flexWrap: 'wrap', flexFlow: 'row', alignItems: 'center',  display: 'flex', marginBottom: '10px' }}>
                                <div style={{ width: '50px'}}>
                                    <p style={{ color: '#fff', fontSize: '1.6rem'}}>{incoming.rn}</p>
                                </div>
                                <div style={{ width: '200px'}}>
                                    <p style={{ color: '#fff', fontSize: '.8rem'}}>{incoming.stpDe}</p>
                                </div>
                                <div style={{ width: '100px'}}>
                                    <p style={{ color: '#fff', fontSize: '1.2rem'}}>
                                        <Moment date={incoming.arrT} format="hh:mm:ss" durationFromNow />
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}       

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
    stationData: PropTypes.array,
};

export default InfoWindow;