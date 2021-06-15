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
    width: 380px;
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
        case 'G':
            color = '#009b3a';
            break;
        case 'Brn':
            color = '#62361b';
            break;
        case 'P':
            color = '#522398';
            break;
        case 'Y':
            color = '#f9e300';
            break;
        case 'Red':
            color = '#c60c30';
            break;
        case 'Org':
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
                    <div style={{height: '100%' }}>
                    {stationData.map((incoming, i) => (
                        <div key={i}>
                            <div style={{ marginBottom: '10px', padding: '10px', backgroundColor: findColor(incoming.rt), borderRadius: '2px', alignContent: 'center', flexWrap: 'wrap', flexFlow: 'row', alignItems: 'center',  display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ width: '50px'}}>
                                    <p style={{ color: '#fff', fontSize: '1.6rem', marginBottom: '0'}}>{incoming.rn}</p>
                                </div>
                                <div style={{ width: '110px'}}>
                                    <p style={{ color: '#fff', fontSize: '.8rem', marginBottom: '0' }}>{incoming.stpDe}</p>
                                </div>
                                <div style={{ width: '100px'}}>
                                    <p style={{ color: '#fff', fontSize: '1rem', marginBottom: '0'}}>
                                        <Moment fromNow>{incoming.arrT}</Moment>
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