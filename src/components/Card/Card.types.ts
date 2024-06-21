import { Station } from "components/Map";
import React, { Ref } from "react";

export interface CardProps {
    children?: React.ReactNode;
    className?: string;
    orientation?: string;
    station?: Station
    style?: React.CSSProperties;
    onClick?: () => void;
}