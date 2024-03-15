/**
 * Marker
 * 
 * @type {Component}
 */

import React, { useRef } from "react";
import Icon, { ICONS } from './../Icon/Icon';

interface MarkerProp {
  markerClick?: () => void;
  lat: number;
  lng: number;
  alt: string;
  color: string;
}

const Marker = ({ color, alt, lat, lng, markerClick }: MarkerProp) => {
  function clickHandler(event) {
    event.preventDefault();
    markerClick();
    return false;
  }
  const markerRef = useRef(null);
  return (
    <div
      onMouseDown={(event) => clickHandler(event)}
      ref={markerRef}
      style={{
        position: "absolute",
        top: "-30px",
        left: "-10px",
        cursor: "pointer",
        zIndex: "100",
      }}
    >
      <Icon icon={ICONS.Stations} style={{ position: "absolute" }} />
    </div>
  );
};

export default Marker;
