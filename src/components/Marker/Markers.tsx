/**
 * Markers
 * @type {Component} Markers
 * @param MarkersProps
 * @returns JSX.Element
 */
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Marker from "./Marker";
import { Station } from "components/Map";
import StationModal from "./../Modal/StationModal";
import useArrivals from "../../hooks/useArrivals";

type MarkersProps = {
    station: Station;
    stops: Station[];
}

const Markers = ({ station, stops }: MarkersProps) => {
    const [opened, setIsOpened] = useState<boolean>(false);
    const handleOnOpen = () => {
        setIsOpened(true);
    };
    const containerRef = useRef<HTMLDivElement>(null);
    const [position, getPosition] = useState({top: 0, left: 0});

    useEffect(() => {
        function handleClickOutside(this: Document, event: MouseEvent) {
            getPosition({ top: event?.clientX, left: event?.clientY });
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpened(false);
            }
        }
    
        document.addEventListener("mouseover", handleClickOutside);
        return () => {
            document.removeEventListener("mouseout", handleClickOutside);
        };
    }, [containerRef]);

    const sidebarContentEl: HTMLElement = document.getElementById('app');
    const modalPlacement = {
        top: `${position?.top}px`,
        left:  `${position?.left}px`,
    }
    return (
        <div ref={containerRef}>
             {opened && createPortal( <StationModal station={station} style={modalPlacement} stops={stops} position={position} />, sidebarContentEl )}
             <Marker station={station} onHover={handleOnOpen} />
        </div>
    )
};

export default Markers;