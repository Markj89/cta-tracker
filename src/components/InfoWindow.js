/**
 * Station
 * @type {Component}
 */
import React, { useState, Fragment } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import Moment from 'react-moment';

const StationBox = styled.div`
    position: relative;
    background-color: #fff;
    box-sizing: border-box;
    border: 1px solid #fafbfc;
    box-shadow: -3px 0 5px rgba(36,41,46,.05);
    border-radius: 2px;
    z-index: 1000000;
    padding: 15px;
    width: 420px;
    height: 450px;
    alignItems: center;
    z-index: 1000;
    overflow: auto;
`;

const Headline = styled.h2`
    font-size: 2rem;
    letter-spacing: 0.24px;
`;

const ModalOverlay = styled.div`
    height: 100vh;
    left: 0;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 500;
`;

const ModalWrapper = styled.div`
    display: flex;
    justify-content: center;
    outline: 0;
    overflow-x: hidden;
    overflow-y: auto;
    position: absolute;
    top: 25%;
    width: 100%;
    z-index: 100;
    right: 37%;
`;

const CloseButton = styled.button`
    background-color: transparent;
    font-size: 1.8rem;
    box-sizing: border-box;
    border: 0px;
    cursor: pointer;
    position: relative;
    display: flex;
    marging-left: auto; 
    fill: #565a5c;
    justify-content: end;
`;
const Flex = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: strech;
`;

const StationContainer = styled.div`
    border-radius: 2px; 
    align-content: center; 
    flex-wrap: wrap; 
    flex-flow: row; 
    align-items: center;
    display: flex; 
    justify-content: space-between;
    margin-bottom: 10px; 
    padding: 10px;
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

const InfoWindow = ({isVisible, hideModal, stationData}) => {
    const getName = stationData.map((station, i) => {
        return station.staNm.split("(").shift();
    });
    
    return isVisible ? createPortal(
        <Fragment>
            <ModalOverlay>
                <ModalWrapper
                    aria-modal={true}       
                    aria-modal={true}
                    aria-hidden={true}
                    tabIndex={-1}
                    role="dialog">
                    <div style={{ display: `block`}}>
                        <StationBox>
                            <div style={{ position: 'relative'}}>
                                <Flex>
                                    <div>
                                        <Headline>{getName[0]}</Headline>
                                    </div>
                                    <CloseButton onClick={hideModal} type="reset" role="button">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 10 45 40" enableBackground="new 0 0 45 40" width="25">
                                            <line x1="15" y1="15" x2="25" y2="25" stroke="#000" stroke-width="2.5" strokeLinecap="round" strokeMiterlimit="10"></line>
                                            <line x1="25" y1="15" x2="15" y2="25" stroke="#000" stroke-width="2.5" strokeLinecap="round" strokeMiterlimit="10"></line>    
                                            <circle class="circle" cx="20" cy="20" r="19" opacity="0" stroke="#565a5c" strokeWidth="2.5" stroke-linecap="round" stroke-miterlimit="10" fill="none"></circle>
                                            <path d="M20 1c10.45 0 19 8.55 19 19s-8.55 19-19 19-19-8.55-19-19 8.55-19 19-19z" class="progress" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeMiterlimit="10" fill="none"></path>
                                        </svg>
                                    </CloseButton>
                                </Flex>
                                <div style={{height: '100%' }}>
                                    {stationData.map((incoming, i) => (
                                        <div key={i}>
                                            <StationContainer style={{ backgroundColor: findColor(incoming.rt) }}>
                                                <div style={{ width: '50px'}}>
                                                    <p style={{ color: '#fff', fontSize: '1.6rem', marginBottom: '0'}}>{incoming.rn}</p>
                                                </div>
                                                <div style={{ width: '110px'}}>
                                                    <p style={{ color: '#fff', fontSize: '.8rem', marginBottom: '0', lineHeight: '1.2rem' }}>{incoming.stpDe}</p>
                                                </div>
                                                <div style={{ width: '100px'}}>
                                                    <p style={{ color: '#fff', fontSize: '1rem', marginBottom: '0'}}>
                                                        <Moment fromNow>{incoming.arrT}</Moment>
                                                    </p>
                                                </div>
                                            </StationContainer>
                                        </div>
                                    ))}       
                                </div> 
                            </div>
                        </StationBox>
                    </div>
                </ModalWrapper>
            </ModalOverlay>
        </Fragment>,
        document.body,
    )
    : null;
};

InfoWindow.propTypes = {
    isVisible: PropTypes.bool,
    hideModal: PropTypes.bool,
    stationData: PropTypes.array,
};

export default InfoWindow;