/**
 * Drawer
 *
 * @type {Component} StationDrawer
 */
import Card from "../Card/Card";
import { CardContainer } from "../CardContainer";
import React, { useState, ReactNode, useRef, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import clsx from "clsx";
import DrawerHeader from "./DrawerHeader";

interface DrawerProps {
  children: ReactNode;
  className?: string;
  onBackdropClick: () => void;
  side: string;
  open: boolean;
  headline: string;
}

const Drawer = React.forwardRef(
  (
    { children, className, onBackdropClick, headline, side = "bottom", open = false }: DrawerProps,
    ref
  ) => {
    const [isOpen, setIsOpen] = useState<boolean>(open);
    const mounted = useRef(false);

    useEffect(() => {
        if (open) {
            setIsOpen(open);
        }
    }, [open]);

    return (
        <animated.div
            onClick={onBackdropClick}
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
                    <CardContainer orientation={"vertical"}>
                        <div className="flex flex-col h-full p-1 overflow-y-auto">
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
