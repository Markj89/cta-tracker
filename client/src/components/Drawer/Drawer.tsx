/**
 * Drawer
 *
 * @type {Component} StationDrawer
 * @param Prop
 * @returns JSX.Element
 */
import Card from "../Card/Card";
import { CardContainer } from "../CardContainer";
import SearchInput from "../SearchInput";
import React, { useState, PropsWithChildren, ReactNode, useRef, useEffect } from "react";
import { OptionProps, GroupBase } from "react-select";
import useArrivals from "hooks";
import { Station } from "components/Map";
import { useSpring, animated } from "react-spring";
import clsx from "clsx";
import DrawerHeader from "./DrawerHeader";

interface Props {
  children: ReactNode;
  className?: string;
  onClick: () => void;
  side: string;
  open: boolean;
  headline: string;
}

const Drawer = React.forwardRef(
  (
    { children, className, onClick, headline, side = "bottom", open = false }: Props,
    ref
  ) => {
    const [isOpen, setIsOpen] = useState<boolean>(open);
    const mounted = useRef(false);
    const props = useSpring({
      height: open
        ? window.innerWidth - 0
        : window.innerWidth - window.innerHeight + 100,
      position: "absolute",
      //top: 0
    });

    useEffect(() => {
        if (open) {
            setIsOpen(open);
        }
    }, [open]);

    return (
        <animated.div
            onClick={() => onClick()}
            id={`dialog-${side}`}
            role="dialog"
            aria-labelledby="slide-over"
            aria-modal="true"
            className={clsx(
                "fixed z-10"
                ,
                className
            )}
        >
            <div className="outline-none rounded-lg touch-none height-74 drawer-header" role="button" tabIndex={0}>
                <Card ref={ref}>
                    { headline && (
                        <div className="py-8">
                            <DrawerHeader headline={headline} />
                        </div>
                    )}
                    <CardContainer
                        className=""
                        //className={"pointer-events-none max-w-full overflow-hidden text-base xs:w-auto md:w-32 lg:w-96"}
                        orientation={"vertical"}
                    >
                        <div 
                        //className={"flex flex-col h-full overflow-y-scroll p-1"}
                        >
                            {children}
                        </div>
                    </CardContainer>
                </Card>
            </div>
        </animated.div>
    );
  }
);

export default Drawer;
