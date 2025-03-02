/**
 * Icon Component
 * @type {Component}
 */
import React, { SVGProps } from "react";
import StationsIcon from './StationsIcon';
import TrainIcon from "./TrainIcon";
import ListIcon from "./ListIcon";

export enum ICONS {
    Stations = 'Stations',
    Train = 'Train',
    List = 'List'
}

const getIcons = (props: SVGProps<SVGSVGElement>) => ({
    Station: <StationsIcon {...props} />,
    Train: <TrainIcon {...props} />,
    List: <ListIcon {...props} />
});

interface IconProps extends SVGProps<SVGSVGElement> {
    icon: ICONS;
    [key: string]: any;
}

const Icon: React.FC<IconProps> = ({ icon, ...props }) => {
    const iconComponent = getIcons(props)[icon];
    return <>{iconComponent}</>;
};

export default Icon;