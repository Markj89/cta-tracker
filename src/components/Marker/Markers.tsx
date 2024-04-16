/**
 * Markers
 * @type {Component} Markers
 * @param MarkersProps
 * @returns JSX.Element
 */
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Marker from "./Marker";
import Card from "./../Card/Card";
import { Station } from "components/Map";

type MarkersProps = {
    station: Station;
}

const Markers = ({ station }: MarkersProps) => {
    const [opened, setIsOpened] = useState<boolean>(false);
    const handleOnOpen = () => setIsOpened(true);
    const handleOnClose = () => setIsOpened(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(this: Document, event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpened(false);
            }
        }
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [containerRef]);

    return (
        <div ref={containerRef}>
            {opened ? createPortal( <Card children={station} onClick={handleOnClose} />, document.body ) : ( <Marker station={station} onClick={handleOnOpen} /> )}
        </div>
    );    
};

export default Markers;