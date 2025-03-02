/**
 * OverlayContainer
 * An Overlay container to customize markers.
 * @type {Component} Overlay
 * @param Props
 * @returns JSX.Element
 */
import * as React from "react";
import ReactDOM from 'react-dom';
import { createOverlayElement } from "./Overlay.logic";

export type Props = {
    map: any;
    position: { lat: number, lng: number };
    children?: React.ReactNode;
    className: string;
}

const  OverlayContainer = (props: Props) => {
    const overlay = React.useRef<google.maps.OverlayView | null>(null);
    const element = React.useRef<Element | null>(null);

    class OverlayView extends window.google.maps.OverlayView {
        position: google.maps.LatLng | null = null;
        content: any = null;
      
        constructor(props: any) {
            super();
            props.position && (this.position = props.position);
            props.content && (this.content = props.content);
        }
      
        onAdd = () => {
            if (this.content) this.getPanes().floatPane.appendChild(this.content);
        };
      
        onRemove = () => {
            if (this.content?.parentElement) {
                this.content.parentElement.removeChild(this.content);
            }
        };
      
        draw = () => {
            if (this.position) {
                const divPosition = this.getProjection().fromLatLngToDivPixel(this.position);
                this.content.style.left = divPosition.x + 'px';
                this.content.style.top = divPosition.y + 'px';
            }
        };
    }
      
    React.useEffect(() => {
        return () => {
            if (overlay.current) overlay.current.setMap(null);
        }
    }, []);
    
    if (props.map) {
        element.current = element?.current || createOverlayElement();
        overlay.current = overlay.current || new OverlayView(
            {
                position: new google.maps.LatLng(props.position.lat, props.position.lng),
                content: element?.current
            }
        )
        overlay.current.setMap(props.map)
        return ReactDOM.createPortal(props.children, element?.current);
    }
    return null;
};

export default OverlayContainer;