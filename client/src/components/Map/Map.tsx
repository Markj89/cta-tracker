/**
 * Map Component
 * Creates a Google Maps with geocoding UI and marker are received from mongo databnase.
 * @type {Component} Map
 * @param MapProps
 * @returns JSX.Element
 */
import React, { useState, useRef, useEffect, useLayoutEffect, useContext } from "react";
import OverlayContainer from "./../Overlay/Overlay";
import Markers from "./../Marker/Markers";
import { MapProps } from "./Map.types";
import Drawer from "../Drawer/Drawer";
import clsx from "clsx";
import Button from "./../Button";
import { useNavigate } from "react-router-dom";
import Icon, { ICONS } from "./../Icon/Icon";
import { mapMarkers } from "./../../utils/map";
import StopCard from "./../StopCard/StopCard";
import { getGroupedDuplicateStops } from "./Map.logic";
import { MapContext } from "./../../context/MapContext";

const Map = ({ width, height, currentLocation, nearbyLocations, nearbyLocationsIds, stations, arrivalsLoading, arrivalErrors, arrivals, zoom = 15 }: MapProps) => {
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement>();
  const ref = useRef<HTMLDivElement>();
  const { showMap, setShowMap, setDrawerOpen } = useContext(MapContext);
  const [map, setMap] = useState<google.maps.Map>(null);
  const [filteredArrivals, setFilteredArrivals] = useState([]);
  const [drawerHeight, setDrawerHeight] = useState(0);
  const [isDrawerShowing, setDrawerShowing] = useState<boolean>(false);
  const markers = mapMarkers(stations);

  useEffect(() => {
    if (mapRef.current && !map) {
      setMap(
        new window.google.maps.Map(mapRef.current, {
          center: { lat: currentLocation?.lat, lng: currentLocation?.lng },
          zoom: 13,
          disableDefaultUI: true,
          clickableIcons: false,
          mapId: `${process.env.GOOGLE_MAP_ID}`
        })
      );
    }
  }, [map, zoom]);

  function handleClick() {
    mapRef.current.focus();
    setShowMap((prevValue) => {
      const newShowMap = !prevValue;
      if (newShowMap) {
        navigate(`/list`, { replace: true });
      } else {
        navigate(`/`, { replace: true });
      }
      return newShowMap;
    });   
  }

  useEffect(() => {
    if (arrivals) {
      const groupedDuplicates = getGroupedDuplicateStops(arrivals);
      setFilteredArrivals(groupedDuplicates);
    }
  }, [arrivals]);

  useLayoutEffect(() => {
    if (ref.current && ref.current.clientHeight) {
      setDrawerHeight(ref.current?.clientHeight);
    }
  }, [filteredArrivals]);

  const handleToggleDrawer = () => {
    setDrawerShowing((prev) => !prev);
    setDrawerOpen(isDrawerShowing);
  };
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
        {nearbyLocations?.map((marker: any, index: number) => (
          <OverlayContainer
            map={map}
            position={{ lat: marker?.lat, lng: marker?.lng }}
            key={index}
            className="min-h-screen flex items-center justify-center flex-col"
          >
            <Markers station={marker} stops={markers} map={map} />
          </OverlayContainer>
        ))}
      </div>
      <div className={clsx('visible md:invisible')}>
        <Drawer open={isDrawerShowing} onBackdropClick={handleToggleDrawer} side={"bottom"} headline="Train Stations near me" className={clsx(
          "bg-white right-0 left-0 shadow-xl rounded-lg white-background transition-transform duration-300 ease-in-out max-h-[80vh]", 
          isDrawerShowing ? "translate-y-0 opacity-100 height-calc-top bottom-0" : "translate-y-full height-calc bottom-calc-low"
          )}
            >
            <div className="flex flex-col max-h-[80vh] overflow-hidden overflow-y-scroll overscroll-y-contain px-2 sm:px-2"  onClick={(e) => e.stopPropagation()}>
              <div 
                className="overflow-y-visible flex-1" 
                style={{
                  maxHeight: drawerHeight ? `${drawerHeight}` : '100vh'
                }}
                ref={ref}
              >
                {arrivalsLoading && <p>Loading...</p>}
                {arrivalErrors && <p>Error fetching arrivals</p>}
                {filteredArrivals?.map((arrival, i) => (
                  <div>
                      <StopCard 
                        routeNumber={arrival?.stopId} 
                        stops={arrival?.arrivals} 
                        destinationName={arrival?.arrivals?.[0]?.raw?.destNm} />
                  </div>
                ))}
              </div>
              {/* Sticky bottom area */}
              <div className={'display-flex visible flex absolute left-0 right-0 bottom-1 justify-center py-2'}>
                <Button className={'background-black-light text-white px-4 py-2 rounded-full outline-none display-flex w-64 '} onClick={handleClick}>
                  <span className="flex-1 flex self-center justify-self-center">
                    <span className="flex-1 flex self-center">
                      Show List {' '}
                      <div className="flex-1 flex self-center ml-1"><Icon icon={ICONS.List} size={15} /> </div>   
                    </span>
                  </span>
                </Button>
              </div>
            </div>
          </Drawer>
        </div>
    </>
  );
};

export default Map;
