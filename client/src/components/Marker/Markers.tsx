/**
 * Markers
 * @type {Component} Markers
 * @param MarkersProps
 * @returns JSX.Element
 */
import React, { useEffect, useRef, useState, useContext } from "react";
import Marker from "./Marker";
import { Station } from "components/Map";
import StationModal from "./../Modal/StationModal";
import { MapContext } from "./../../context/MapContext";

type MarkersProps = {
    station: Station;
    stops: Station[];
    map: any;
}

const Markers = ({ station, stops, map }: MarkersProps) => {
    const [opened, setIsOpened] = useState<boolean>(false);
    const { setStation } = useContext(MapContext);
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
    
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [containerRef]);

    const handleOnClick = (station) => {
        setStation(station);
    };

    const sidebarContentEl = document.getElementById('app');
    if (!sidebarContentEl) return null;
    const modalPlacement = {
        top: `${position?.top}px`,
        left:  `${position?.left}px`,
    }

    return (
        <div ref={containerRef}>
            <Marker map={map} position={{ lat: station.lat, lng: station.lng }} station={station} stops={stops} onHover={() => setIsOpened(true)} onClick={(station) => handleOnClick(station)} gmpClickable={true} />
        </div>
    );
};

export default Markers;