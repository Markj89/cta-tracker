/**
 * Drawer
 *
 * @type {Component} StationDrawer
 */
import Card from "../Card/Card";
import { CardContainer } from "../CardContainer";
import React, { useState, ReactNode, useEffect, useContext} from "react";
import { animated } from "react-spring";
import clsx from "clsx";
import DrawerHeader from "./DrawerHeader";
import { MapContext } from "./../../context/MapContext";
import { getStationsNames } from './../Map/Map.logic'
import SearchInput from "./../SearchInput/SearchInput";

interface DrawerProps {
  children: ReactNode;
  className?: string;
  onBackdropClick: () => void;
  side: string;
  open: boolean;
  headline?: string;
  ariaLabel?: string;
  searchBar?: boolean;
}

const Drawer = React.forwardRef(
  (
    { children, className, onBackdropClick, headline, side = "bottom", open = false, searchBar = false, ariaLabel = "Search Bar" }: DrawerProps,
    ref
  ) => {
    const [isOpen, setIsOpen] = useState<boolean>(open);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { stations } = useContext(MapContext);
    const stationNames = getStationsNames(stations);
    
    useEffect(() => {
        if (open) {
            setIsOpen(open);
        }
    }, [open]);

    return (
        <animated.div
            onClick={() => onBackdropClick()}
            id={`dialog-${side}`}
            role="dialog"
            aria-labelledby="slide-over"
            aria-modal="true"
            className={clsx(
                "fixed z-40",
                className
            )}
        >
            <div 
                className="outline-none rounded-lg touch-none height-74 drawer-header" 
                role="button" 
                tabIndex={0}
                >
                <Card ref={ref}>
                    { headline && (
                        <div className="py-8">
                            <DrawerHeader headline={headline} />
                            
                        </div>
                    )}
                    <CardContainer orientation={"vertical"} className={"drawer-container"}>
                        <div className="flex flex-col h-full p-1 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                            {searchBar && (
                                <SearchInput suggestions={stationNames} />
                            )}
                            <>
                                {children}
                            </>
                        </div>
                    </CardContainer>
                </Card>
            </div>
        </animated.div>
    );
  }
);

export default Drawer;
