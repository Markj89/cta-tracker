/**
 * Map Component
 * Creates a Google Maps with geocoding UI and marker are received from mongo databnase.
 * @type {Component} Map
 * @param MapProps
 * @returns JSX.Element
 */
import React, { useState, useRef, useEffect } from "react";
import useGetStationsLocally from "../../hooks/useGetStationsLocally";
import OverlayContainer from "./../Overlay/Overlay";
import Markers from "./../Marker/Markers";
import { mapMarkers, mapStations } from "./../../utils/map";
import { MapProps } from "./Map.types";
import { findLocationsInRange } from "./Map.logic";
import Drawer from "../Drawer/Drawer";
import clsx from "clsx";
import Button from "./../Button";
import { useNavigate } from "react-router-dom";
import Icon, { ICONS } from "./../Icon/Icon";

const Map = ({ width, height, currentLocation, zoom = 15 }: MapProps) => {
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement>();
  const [map, setMap] = useState<google.maps.Map>(null);
  const { stations } = useGetStationsLocally(
    `${process.env.SERVER_URL}/stations`
  );
  const markers = mapMarkers(stations);
  const mappedStations = mapStations(markers);
  const [isDrawerShowing, setDrawerShowing] = useState<boolean>(false);

  useEffect(() => {
    if (mapRef.current && !map) {
      setMap(
        new window.google.maps.Map(mapRef.current, {
          center: { lat: currentLocation?.lat, lng: currentLocation?.lng },
          zoom: 15,
          disableDefaultUI: true,
          clickableIcons: false,
        })
      );
    }
  }, [map, zoom]);

  function handleClick() {
    mapRef.current.focus();
  }

  const nearbyLocations = findLocationsInRange(
    mappedStations,
    currentLocation,
    1
  );
  const handleToggleDrawer = () => setDrawerShowing((prev) => !prev);
  console.log(nearbyLocations)
  return (
    <>
      <div
        className="MapWrapper"
        style={{
          height: `${height}px`,
          width: `${width}px`,
          minHeight: `${height}px`,
        }}
        ref={mapRef as any}
      >
        {nearbyLocations?.map((marker, index) => (
          <OverlayContainer
            map={map}
            position={{ lat: marker?.lat, lng: marker?.lng }}
            key={index}
            className="min-h-screen flex
    items-center justify-center flex-col"
          >
            <Markers station={marker} stops={markers} />
          </OverlayContainer>
        ))}
      </div>
      <Drawer open={isDrawerShowing} onClick={() => handleToggleDrawer()} side={"bottom"} headline="Train Stations near me" className={clsx(
        "bg-white right-0 left-0 shadow-xl rounded-lg white-background transition-transform duration-300 ease-in-out", 
        isDrawerShowing ? "translate-y-0 opacity-100 height-calc-top bottom-0" : "translate-y-full height-calc bottom-calc-low"
        )}
          >
          <div className="px-4 sm:px-6">
            <div className="relative mt-6 flex-1 md:px-2 sm:px-1">
              {nearbyLocations?.map((location, index) => (
                <ul
                  className="sm:w-3xs list-inside station-list-item flex align-middle arrival-list-item px-3.5 gray-background mb-2"
                  key={index}
                >
                  <li className="text-left text-sm flex-none w-24 text-black text-base text-xs">
                    {location?.stop_name}
                  </li>
                  <ul className="flex-auto w-32 arrival-list-item-times">
                    <li className="text-right arrival-time text-black my-0 text-sm">
                      2 mins
                    </li>
                    <li className="text-right estimated-time text-black text-xs">
                      9:00pm
                    </li>
                  </ul>
                </ul>
              ))}
              <div className={'display-flex visible flex relative justify-center py-2'}>
                <Button className={'background-black-light text-white px-4 py-2 rounded-full outline-none display-flex w-64 '} onClick={() => {
                  navigate('drawer=false');
                }}>
                  <span className="flex-1 flex self-center justify-self-center">
                    <span className="flex-1 flex self-center">
                      Show List {' '}
                      <div className="flex-1 flex self-center ml-1"><Icon icon={ICONS.List} size={15} /> </div>   
                    </span>
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </Drawer>
    </>
  );
};

export default Map;
