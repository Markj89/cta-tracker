/**
 * Card 
 * @type {Component}
 */

import React from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';


const StationCard = styled.div`
    position: relative;
    box-sizing: border-box;
    border-radius: 4px;
    background-color: white;
    box-sizing: -3px 0 5px rgba(36,41,46,.05);
`;
const TextWrapper = styled.div`
    padding-right: 15px;
    padding-left: 15px;

`;

const Card = ({ name, color, address }) => {
    return (
        <StationCard>
            <div>
                <div>
                    <div>
                        {{ name }}
                    </div>
                </div>
                <TextWrapper>
                    {{ address }}
                </TextWrapper>
            </div>
        </StationCard>
    );
}

Card.propTypes = {
    address: PropTypes.string,
    color: PropTypes.string,
    name: PropTypes.string,
};

export default Card;
