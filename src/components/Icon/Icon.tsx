/**
 * Marker (Icon)
 * @type {Component}
 */
import React, { SVGProps } from "react";
import StationsIcon from './StationsIcon';

export enum ICONS {
    Stations = 'Stations'
}

const getIcons = (props: SVGProps<SVGSVGElement>) => ({
    Station: <StationsIcon />
});

interface IconProps extends SVGProps<SVGSVGElement> {
    icon: ICONS;
    //color?: string;
    [key: string]: any;
}

const Icon: React.FC<IconProps> = ({ icon, ...props }) => {
    const iconComponent = getIcons(props)[icon];
    return <>{iconComponent}</>;
};

export default Icon;