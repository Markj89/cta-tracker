/**
 * Modal (Station)
 * 
 * @param StationCardProps
 * @type {Component} StationModal
 */

import useArrivals from "../../hooks/useArrivals";
import Card from "./../Card/Card";
import { CardContainer } from "./../CardContainer";
import { Station } from "./../Map";
import React, { useEffect, useRef, useState } from "react";
import { formatArrivalTime, formatEstimatedTime } from "./StationModal.logic";

interface Position {
    top: number;
    left: number;
}

export type StationCardProps = {
    station: Station;
    stops: Station[];
    position?: Position;
    isOpen?: boolean;
    children?: React.ReactNode;
    handleClose?: () => void;
    style?: React.CSSProperties;
}

export default function StationModal({ station, position, style, isOpen, stops}: StationCardProps ): JSX.Element {
    const { data, loading, error } = useArrivals(station);
    const titleRef = useRef();
    const [title, setTitle] = useState<string>(station?.stop_name?.replace(/ *\([^)]*\) */g, ""));
    const [fontSize, setFontSize] = useState<string>('text-4xl');
    useEffect(() => {
        const width = document.getElementById('station-title').getBoundingClientRect()?.width;
        const height = document.getElementById('station-title').getBoundingClientRect()?.height;
        if (width >= 290 || height > 80) {
            setFontSize('text-2xl');
        }
    }, [fontSize, title]);
    return (
        <Card orientation="vertical" style={{ top: `${position?.left}px`, left: `${position?.top}px` }} className={"modal z-10 rounded-lg shadow-xl mx-auto p-6 bg-slate"}>
            <div className='text-base text-slate-900 font-semibold dark:text-slate-300 rounded-lg overflow-hidden mb-2'>
                <h1 ref={titleRef} id="station-title" className={`font-interTight mb-1.5 ${fontSize}`}>{title}</h1>
            </div>
            <CardContainer className="text-base overflow-y-auto" orientation={"vertical"}>
                { data !== null && loading === false ? (
                    <div className="space-y-4 station mb-1">
                        {data?.map((item) => (
                            <ul className="w-72 list-inside station-list-item flex align-middle arrival-list-item px-3.5" style={{ backgroundColor: `${station?.color}`}}>
                                <li className="text-left flex-none w-24 text-white text-base">{item?.stpDe?.replace('Service toward ', '')}</li>
                                <ul className="flex-auto w-32 arrival-list-item-times">
                                    <li className="text-right arrival-time text-white my-0 text-sm">{formatArrivalTime(item?.arrT).toString() === '0' ? 'Due' : `${formatArrivalTime(item?.arrT).toString()} mins`}</li>
                                    <li className="text-right estimated-time text-white">{formatEstimatedTime(item?.arrT)}</li>
                                </ul>
                            </ul>
                        ))}
                    </div>
                ) : (
                    <p>Loading</p>
                )}
            </CardContainer>
        </Card>
    );
}