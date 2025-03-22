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
import useArrivals from "./../../hooks/useArrivals";
import { formatArrivalTime, formatEstimatedTime } from "../Modal/StationModal.logic";

const Map = ({ width, height, currentLocation, zoom = 15 }: MapProps) => {
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement>();
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>(null);
  const [filteredArrivals, setFilteredArrivals] = useState([]);
  const [drawerHeight, setDrawerHeight] = useState(0);

  const { stations } = useGetStationsLocally(
    `${process.env.SERVER_URL}/stations`
  );
  const markers = mapMarkers(stations);
  const mappedStations = mapStations(markers);
  const [isDrawerShowing, setDrawerShowing] = useState<boolean>(false);
  const nearbyLocations = findLocationsInRange(
    mappedStations,
    currentLocation,
    1
  );
  const nearbyLocationsIds = nearbyLocations?.map((location) => location?.map_id);
  const { data, loading, error } = useArrivals(nearbyLocationsIds, 30000);

  useEffect(() => {
    if (mapRef.current && !map) {
      setMap(
        new window.google.maps.Map(mapRef.current, {
          center: { lat: currentLocation?.lat, lng: currentLocation?.lng },
          zoom: 13,
          disableDefaultUI: true,
          clickableIcons: false,
        })
      );
    }
  }, [map, zoom]);

  // function handleClick() {
  //   mapRef.current.focus();
  // }

  useEffect(() => {
    if (data) {
      const now = new Date();

      const nearestArrivals = data?.filter((arrival, index, self) => {
        const arrivalTime = new Date(arrival?.arrT);
        const minutesUntilArrival = (arrivalTime - now) / 60000;

        return (
          minutesUntilArrival <= 5 && self.findIndex((a) => a.staId === arrival.staId && a.arrT === arrival.arrT) === index
        )
      });
      setFilteredArrivals(nearestArrivals);
      setDrawerHeight(ref.current.clientHeight);
    }
  }, [data, setDrawerHeight]);

  const handleToggleDrawer = () => setDrawerShowing((prev) => !prev);
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
            className="min-h-screen flex items-center justify-center flex-col"
          >
            <Markers station={marker} stops={markers} />
          </OverlayContainer>
        ))}
      </div>
      <div className={clsx('visible md:invisible')}>
        <Drawer open={isDrawerShowing} onClick={() => handleToggleDrawer()} side={"bottom"} headline="Train Stations near me" className={clsx(
          "bg-white right-0 left-0 shadow-xl rounded-lg white-background transition-transform duration-300 ease-in-out", 
          isDrawerShowing ? "translate-y-0 opacity-100 height-calc-top bottom-0" : "translate-y-full height-calc bottom-calc-low"
          )}
            >
            {loading && <p>Loading...</p>}
            {error && <p>Error fetching arrivals</p>}
            {data && (
              <div className={clsx(`px-4 sm:px-6 overflow-y-scroll overscroll-y-contain h-full` )}id="available_arrivals" ref={ref}>
                <div className="relative mt-6 flex-1 md:px-2 sm:px-1">
                  {filteredArrivals?.map((arrival, index) => (
                    <ul
                      className="sm:w-3xs list-inside station-list-item flex align-middle arrival-list-item px-3.5 gray-background mb-2"
                      key={index}
                    >
                      <li className="text-left text-sm flex-none w-24 text-black text-base text-xs">
                      {arrival?.stpDe?.replace('Service toward ', '')}
                      </li>
                      <ul className="flex-auto w-32 arrival-list-item-times">
                        <li className="text-right arrival-time text-black my-0 text-sm">
                          {formatArrivalTime(arrival?.arrT).toString() === '0' ? 'Due' : `${formatArrivalTime(arrival?.arrT).toString()} mins`}
                        </li>
                        <li className="text-right estimated-time text-black text-xs">
                          {formatEstimatedTime(arrival?.arrT)}
                        </li>
                      </ul>
                    </ul>
                  ))}
                </div>
              </div>
            )}
          </Drawer>
        </div>
    </>
  );
};

export default Map;
