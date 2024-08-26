/**
 * Marker
 * A Marker point to show over the Overlay Container
 * @type {Component} Marker
 * @returns JSX.Element
 */

import * as React from "react";
import { Station } from "components/Map";
import clsx from 'clsx';

type MarkerProps = google.maps.MarkerOptions & {
  onClick?: () => void;
  onHover?: () => void;
  station: Station;
}
const Marker: React.FC<MarkerProps> = ({ station, onClick, onHover }: MarkerProps) => <div onMouseOver={onHover} className={clsx('Marker-component bubble-marker')} style={{ backgroundColor: `${station?.color}`}}></div>;

export default Marker;
