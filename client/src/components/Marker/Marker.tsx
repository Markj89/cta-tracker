/**
 * Marker
 * A Marker point to show over the Overlay Container
 * @type {Component} Marker
 * @returns JSX.Element
 */

import React, { FC, useContext, useEffect, useRef } from "react";
import { Station } from "components/Map";
import MapContext from "./../../context";

type MarkerProps = {
  onClick?: (event: google.maps.marker.AdvancedMarkerClickEvent) => void;
  station: Station;
  gmpClickable?: boolean;
  position: google.maps.LatLngLiteral;
  map: google.maps.Map;
  stops?: any;
  scale?: number;
};

const Marker: FC<MarkerProps> = ({
  map,
  station,
  stops,
  position,
  onClick,
  gmpClickable = true,
  scale = 1
}) => {
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
  const { setDrawerOpen, setStation } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    const pin = new google.maps.marker.PinElement({
      scale: scale,
      borderColor: "#FFFFFF",
      background: "#17A0DB",
      glyphColor: '#FFFFFF',
    });

    pin.title = station?.stop_name || "";

    const marker = new google.maps.marker.AdvancedMarkerElement({
      map,
      position,
      title: station?.stop_name,
      content: pin,
      gmpClickable: gmpClickable
    });

    markerRef.current = marker;

    const clickHandler = marker.addEventListener("click", (event: google.maps.marker.AdvancedMarkerClickEvent) => {
      if (onClick) {
        onClick(event);
      } else {
        setStation(station);
        setDrawerOpen(true);
      }
    });

    return () => {
      if (markerRef.current) {
        clickHandler.remove();
        markerRef.current.map = null;
        markerRef.current = null;
      }
    };
    
  }, [map, position, station, scale, onClick, gmpClickable]);

  return null;
};

export default Marker;
