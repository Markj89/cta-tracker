/**
 * Card Component
 * Creates a dynamic div element
 * @type {Component} Card
 * @param CardProps
 * @returns JSX.Element
 */
import React, { useImperativeHandle, useRef } from "react";
import { CardProps } from "./Card.types";
import clsx from 'clsx';

const Card = React.forwardRef(({ children, style, className = '', station, onClick, orientation = 'vertical' }: CardProps, ref) => {
    const cardRef = useRef(null);
    
    useImperativeHandle(
        ref,
        () => ({
            focus: () => {
                cardRef?.current.focus();
            }
        }),
        []
    );
    return (
        <div ref={cardRef} className={clsx(orientation === 'vertical' ? 'card-vertical' : 'card-horizontal', className)}
         style={style} role="presentation">
            {children}
        </div>
    );
});

export default Card;