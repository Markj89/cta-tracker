/**
 * Marker
 * A Marker point to show over the Overlay Container
 * @type {Component} Marker
 * @returns JSX.Element
 */

import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { Station } from "components/Map";
import clsx from 'clsx';
import { MapContext } from "./../../context/MapContext";
import StationModal from "./../Modal/StationModal";
import { renderToString } from 'react-dom/server';
import { createRoot } from 'react-dom/client';
import Card from "./../Card/Card";
import { CardContainer } from "./../CardContainer";
import { formatArrivalTime, formatEstimatedTime } from "./..//Modal";
import { error } from "console";
import { title } from "process";
import { data } from "react-router-dom";
import useScreenSize from "./../../hooks/useScreenSize";

type MarkerProps = {
  onClick?: (station: Station) => void;
  onHover?: () => void;
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
  onHover,
  gmpClickable = true,
  scale = 1
}) => {
  const { setDrawerOpen } = useContext(MapContext);
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
  const pinRef = useRef<google.maps.marker.PinElement | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const whatsTheScreenSize = useScreenSize();

  useEffect(() => {
    if (!map || markerRef?.current) return;

    const pin = new google.maps.marker.PinElement({
      scale,
      background: "grey",
      borderColor: "transparent"
    });

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

    const infoWindowDiv = document.createElement("div");
    const root = createRoot(infoWindowDiv);
    root.render(<StationModal station={station} stops={stops} position={position} />);
    const infoWindow = new google.maps.InfoWindow({
      content: infoWindowDiv,
      ariaLabel: station?.stop_name
    });
    
    if (onHover && whatsTheScreenSize?.width <= 767) { 
      marker.content.addEventListener("mouseenter", () => {
        infoWindow.setHeaderContent(station?.stop_name);
        infoWindow.open(map, marker);
        infoWindow.close();
      });
    }

    if (onClick && whatsTheScreenSize.width >= 767)
      marker.addListener("click", () => {      
        onClick(station);
        infoWindow.setHeaderContent(station?.stop_name);
        infoWindow.open(map, marker);
        infoWindow.close();
      });
  

    return () => {
      infoWindow.close();
      marker.map = null;
      markerRef.current = null;
    };
  }, [map]);

  return null;
};

export default Marker;
