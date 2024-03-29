/**
 *  Map Component
 *
 * @type {Component} Map
 */
import React, { useState, Fragment, useRef, useContext } from "react";
import GoogleMapReact from "google-map-react";
import useGetStationsLocally from "./../hooks/useGetStationsLocally";
import { InitiCenerType, MapContext } from "../context/MapContext";
import Marker from "./Marker/Marker";

export interface MapProps {
  zoom?: number;
  [key: string]: any;
  width: number;
  height: number;
  currentLocation: InitiCenerType;
}

const Map = ({
  zoom = 15,
  width,
  height,
  currentLocation,
}: MapProps) => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState(`${process.env.DEV_URL}/stations`);
  const { stations } = useGetStationsLocally(`${process.env.DEV_URL}/stations`);

  const mapRef = useRef();
  const options = {
    panControl: true,
    mayTypeControl: false,
    scrollwheel: false,
    fullscreenControl: false,
    disableDefaultUI: false,
  };

  const markers = stations?.map((station, i) =>
    station.stops.map((stop, j) => (
      <Marker
        key={i[j]}
        lat={stop.lat}
        color={Object.keys(stop).find(
          (key) => stop[key] === true && key !== "ada"
        )}
        lng={stop.lng}
        alt={station.station_name}
      />
    ))
  );

  return (
    <Fragment>
        <div
          style={{
            position: "relative",
            //iframe: { pointerEvents: "none" },
            height: `${height}px`,
            width: `${width}px`,
          }}
        >
          <GoogleMapReact
            bootstrapURLKeys={{
              key: `${process.env.GOOGLE_KEY}`,
              language: "en",
              libraries: "places",
            }}
            defaultCenter={currentLocation}
            options={options}
            defaultZoom={13}
            onGoogleApiLoaded={({ map, maps }) => {
              mapRef.current = map;
              const service = new maps.places.PlacesService(map);
            }}
          />
        </div>
    </Fragment>
  );
};

export default Map;
