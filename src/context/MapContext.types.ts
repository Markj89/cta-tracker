import React from "react";

export interface MapContextType {
    location: Partial<InitiCenerType>;
    setLocation: React.Dispatch<React.SetStateAction<InitiCenerType>>;
}

export interface InitiCenerType {
    lat: number;
    lng: number;
}