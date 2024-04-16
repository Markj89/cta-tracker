/**
 * Marker
 * A Marker point to show over the Overlay Container
 * @type {Component} Marker
 * @returns JSX.Element
 */

import * as React from "react";
import { Station } from "components/Map";

type MarkerProps = google.maps.MarkerOptions & {
  onClick?: () => void;
  station: Station;
}

const Marker: React.FC<MarkerProps> = ({ station, onClick }: MarkerProps) => (
  <div onClick={onClick} style={{
    background: `${station?.color}`,
    cursor: 'pointer',
    color: 'white',
    fontWeight: 800,
    letterSpacing: '0.04em',
    borderRadius: '12px',
    padding: '8px',
    width: '60px',
    zIndex: 1000,
    position: 'relative',
    transform: 'scale(1)',
    transformOrigin: '50% 50%',
    transition: 'margin 0.2s ease 0s',
    pointerEvents: 'auto',
    boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.18), 0px 0px 0px 1px rgba(0, 0, 0, 0.08)',
  }}>
    {station?.station_descriptive_name?.replace(/ *\([^)]*\) */g, "")}
  </div>
);

export default Marker;
