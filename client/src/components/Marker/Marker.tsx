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
  onClick?: (event: MouseEvent) => void;
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
  const pinRef = useRef<google.maps.marker.PinElement | null>(null);
  const { setDrawerOpen, setStation } = useContext(MapContext);

  useEffect(() => {
    if (!map || markerRef?.current) return;

    const pin = new google.maps.marker.PinElement({ scale });

    pin.element.tabIndex = 0;
    pin.element.setAttribute("role", "button");
    pin.element.setAttribute("title", station?.stop_name);
    if (gmpClickable) {
      pin.element.setAttribute("gmpClickable", "true");
    }

    const marker = new google.maps.marker.AdvancedMarkerElement({
      map,
      position,
      title: station?.stop_name,
      content: pin.element,
      gmpClickable
    });

    markerRef.current = marker;
    pinRef.current = pin;
    
    if (onClick) {
      marker.addListener("click", () => {
        setStation(station);
        setDrawerOpen(true);
      });  
    }

    return () => {
      marker.map = null;
      markerRef.current = null;
      setStation(null);
    };
  }, [map, position, station, scale, onClick, gmpClickable]);

  return null;
};

export default Marker;
