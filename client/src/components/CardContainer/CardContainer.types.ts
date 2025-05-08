import React from "react"

export interface CardContainerProps {
    children: React.ReactNode;
    className: string;
    orientation: string;
    style?: any[];
}

export type OrNull<T> = T | null
