/**
 * Markers
 * @type {Component} Markers
 * @param MarkersProps
 * @returns JSX.Element
 */
import React, { useRef, useState, useContext } from "react";
import Marker from "./Marker";
import { Station } from "components/Map";
import StationModal from "./../Modal/StationModal";
import { MapContext } from "./../../context/MapContext";
import { createPortal } from "react-dom";

type MarkersProps = {
    stationMarker: Station;
    stops: Station[];
    map: google.maps.Map;
}

const Markers = ({ stationMarker, stops, map }: MarkersProps) => {
    const { drawerOpen, setStation } = useContext(MapContext);
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedStation, setSelectedStation] = useState<Station | null>(null);
    const [position, setPosition] = useState({bottom: 10, left: 0});

    function handleOnClick(event: MouseEvent) {
        const mobileEl = document.getElementById('app');
        let rect = mobileEl.offsetParent.getBoundingClientRect();

        setPosition({ bottom: 1, left: rect.left });
        setSelectedStation(stationMarker);
        setStation(selectedStation);
    };
    
    const sidebarContentEl = document.getElementById('app');
    const modalPlacement = {
        bottom: `10px`,
        left:  `${position?.left}px`,
    }
    if (!sidebarContentEl) return null;

    return (
        <div ref={containerRef}>
            <Marker map={map} position={{ lat: stationMarker.lat, lng: stationMarker.lng }} station={stationMarker} stops={stops} onClick={(event) => handleOnClick(event)} gmpClickable={true} />
            {/* {drawerOpen ? createPortal( <StationModal station={stationMarker} stops={stops} style={modalPlacement} position={position} />, sidebarContentEl ) : <Marker map={map} position={{ lat: stationMarker.lat, lng: stationMarker.lng }} station={stationMarker} stops={stops} onClick={(event) => handleOnClick(event)} gmpClickable={true} /> } */}
        </div>
    );
};

export default Markers;