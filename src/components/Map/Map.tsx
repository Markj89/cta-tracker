/**
 * Map Component
 * Creates a Google Maps with geocoding UI and marker are received from mongo databnase.
 * @type {Component} Map
 * @param MapProps
 * @returns JSX.Element
 */
import React, { useState, useRef, useEffect } from "react";
import useGetStationsLocally from "../../hooks/useGetStationsLocally";
import { InitiCenerType } from "../../context";
import OverlayContainer from "./../Overlay/Overlay";
import Markers from "./../Marker/Markers";
import { mapMarkers } from "./../../utils/color";

export interface MapProps {
  [key: string]: any;
  width: number;
  height: number;
  currentLocation?: Partial<InitiCenerType>;
  zoom?: number;
}

const Map = ({
  width,
  height,
  currentLocation,
  zoom = 15,
}: MapProps) => {
  const mapRef = useRef<HTMLDivElement>();
  const [map, setMap] = useState<google.maps.Map>(null);
  const { stations } = useGetStationsLocally(`${process.env.SERVER_URL}/stations`);
  const markers = mapMarkers(stations);

  useEffect(() => {
    if (mapRef.current && !map) {
      setMap(new window.google.maps.Map(mapRef.current, {
        center: { lat: currentLocation?.lat, lng: currentLocation?.lng },
        zoom: 15,
        disableDefaultUI: true,
        clickableIcons: false
      }));
    }
  }, [map, zoom]);

  return (
        <div
          className="MapWrapper"
          style={{
            height: `${height}px`,
            width: `${width}px`,
            minHeight: `${height}px`,
          }}
          ref={mapRef as any}
        >
          {markers?.map((marker, index) => (
            <OverlayContainer map={map} position={{ lat: marker?.lat, lng: marker?.lng }} key={index}>
              <Markers station={marker} />
            </OverlayContainer>
          ))}
        </div>
  );
};

export default Map;
