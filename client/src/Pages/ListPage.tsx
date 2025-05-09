import { Stations } from "components/Map";
import Card from "./../components/Card/Card";
import React, { useState, useEffect, useContext, useRef, useLayoutEffect } from "react";
import { InitiCenerType } from "context";
import { mapMarkers, mapStations } from "./../utils/map";
import { getGroupedDuplicateStops } from "./../components/Map/Map.logic";
import StopCard from "./../components/StopCard/StopCard";
import { MapContext } from "./../context/MapContext";
import { useNavigate } from "react-router-dom";
import Button from "./../components/Button/Button";
import Icon, { ICONS } from "./../components/Icon/Icon";

interface Props {
    stations: Stations[];
    currentLocation: Partial<InitiCenerType>;
    arrivals: string[];
}

const ListPage = ({ stations, currentLocation, arrivals }: Props) => {
    const navigate = useNavigate();
    const ref = useRef<HTMLDivElement>();
    const { showMap, setShowMap } = useContext(MapContext);
    const [drawerHeight, setDrawerHeight] = useState<number>(0);
    const [filteredArrivals, setFilteredArrivals] = useState([]);

    useEffect(() => {
        if (arrivals) {
            const groupedDuplicates = getGroupedDuplicateStops(arrivals);
            setFilteredArrivals(groupedDuplicates);
        }
    }, [arrivals]);

    function handleClick() {
      navigate(`/`, { replace: true });
    }

    useLayoutEffect(() => {
      if (ref.current && ref.current.clientHeight) {
        setDrawerHeight(ref.current?.clientHeight);
      }
    }, [filteredArrivals]);

    return (
        <Card orientation={"vertical"}>
          <div className="h-100 overflow-auto">
            <div 
              className='grid sm:grid-1 md:grid-cols-2 gap-4 lg:grid-cols-4 overflow-scroll px-2' 
              style={{
                maxHeight: drawerHeight ? `${drawerHeight}` : '100vh'
              }} 
              ref={ref}>
              {filteredArrivals?.map((arrival, i) => (
                <div>
                  <StopCard routeNumber={arrival?.stopId} stops={arrival?.arrivals} destinationName={arrival?.arrivals?.[0]?.raw?.destNm} />
                </div>
              ))}
            </div>
            <div className={'display-flex visible flex absolute left-0 right-0 bottom-1 justify-center py-2'}>
              <Button className={'background-black-light text-white px-4 py-2 rounded-full outline-none display-flex w-64 '} onClick={handleClick}>
                <span className="flex-1 flex self-center justify-self-center">
                  <span className="flex-1 flex self-center">
                    Show Map {' '}
                    <div className="flex-1 flex self-center ml-1"><Icon icon={ICONS.List} size={15} /> </div>   
                  </span>
                </span>
              </Button>
            </div>
          </div>
        </Card>
    )
}

export default ListPage;