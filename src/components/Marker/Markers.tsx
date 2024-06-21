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
import { ModalId } from "./../Modal/Modal";
import { useModal } from "./../Modal/Modal";
import Card from "./../Card/Card";
import StationModal from "./../Modal/StationModal";

type MarkersProps = {
    station: Station;
}

const Markers = ({ station }: MarkersProps) => {
    const [opened, setIsOpened] = useState<boolean>(false);
    const { openModal } = useModal();
    const handleOnOpen = () => {
        setIsOpened(true);
        openModal(ModalId.Station, { position: position, station: station, children: 'Test' })
    };
    //const handleOnClose = () => setIsOpened(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [position, getPosition] = useState({top: 0, left: 0});

    useEffect(() => {
        function handleClickOutside(this: Document, event: MouseEvent) {
            getPosition({ top: event?.clientX, left: event?.clientY });
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpened(false);
            }
        }
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [containerRef]);

    //const sidebarContentEl = document.getElementById('app');
    const modalPlacement = {
        top: `${position?.top}px`,
        left:  `${position?.left}px`,
    }
    return (
        <div ref={containerRef}>
            {opened ? createPortal( <StationModal station={station} style={modalPlacement}  position={position} />, document.getElementById('app') ) : <Marker station={station} onClick={handleOnOpen} /> }
        </div>
    )
};

export default Markers;