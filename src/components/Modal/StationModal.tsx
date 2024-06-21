/**
 * Modal (Station)
 * 
 * @param StationCardProps
 * @type {Component} StationModal
 */

import Card from "./../Card/Card";
import { CardContainer } from "./../CardContainer";
import { Station } from "./../Map";
import React from "react";

interface Position {
    top: number;
    left: number;
}

export type StationCardProps = {
    station: Station;
    position?: Position;
    isOpen?: boolean;
    children?: React.ReactNode;
    handleClose?: () => void;
    style?: React.CSSProperties;
}

export default function StationModal({ station, position, style }: StationCardProps ): JSX.Element {
    return (
        <Card orientation="vertical" style={{ top: `${position?.top}px`, left: `${position?.left}px` }} className={"modal"}>
            <div className='text-base text-slate-900 font-semibold dark:text-slate-300'>
                <h1>{station?.stop_name}</h1>
            </div>
            <CardContainer className="text-base" orientation={"vertical"}>
                <p className="mt-6 text-slate-700 dark:text-slate-300">This is a test</p>
            </CardContainer>
        </Card>
    );
}