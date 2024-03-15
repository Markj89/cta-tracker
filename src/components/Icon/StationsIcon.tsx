/**
 * Station Icon 
 * @type {Component}
 */
import React, { SVGProps } from "react";
import { ReactComponent as Station } from './../../assets/img/stationPoint.svg';


const StationsIcon = (props: SVGProps<SVGSVGElement>) => (
    <Station />
);

export default StationsIcon;