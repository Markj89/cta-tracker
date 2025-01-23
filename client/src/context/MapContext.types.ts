import React from "react";
import { screenSizeProps } from "components/Map";

export interface MapContextType {
    location: Partial<InitiCenerType>;
    screenSize: Partial<screenSizeProps>;
    setScreenSize: React.Dispatch<React.SetStateAction<screenSizeProps>>;
    setLocation: React.Dispatch<React.SetStateAction<InitiCenerType>>;
}

export interface InitiCenerType {
    lat: number;
    lng: number;
}