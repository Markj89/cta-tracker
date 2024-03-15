/**
 *  Map Component
 *
 * @type {Component} Map
 */
import React, { useState, Fragment, useRef } from "react";
import GoogleMapReact from "google-map-react";
import useGetStationsLocally from "./../hooks/useGetStationsLocally";
import { initiCenerType } from "./../MapContext";
import Marker from "./Marker/Marker";

export interface MapProps {
  zoom?: number;
  [key: string]: any;
  width: number;
  height: number;
  currentLocation: initiCenerType;
  loading: string;
}

const Map = ({
  zoom = 15,
  width,
  height,
  currentLocation,
  loading,
}: MapProps) => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState(`${process.env.DEV_URL}/stations`);
  const { stations } = useGetStationsLocally(url);

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
      {loading === "Found" || loading === "Default Location" ? (
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
            defaultZoom={loading === "Default Location" ? 13 : zoom}
            onGoogleApiLoaded={({ map, maps }) => {
              mapRef.current = map;
              const service = new maps.places.PlacesService(map);
            }}
          >
            {markers}
          </GoogleMapReact>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </Fragment>
  );
};

export default Map;
