/**
 * Container (Card)
 * @type {Component} CardContainer
 */
import React, { useRef } from 'react';
import { CardContainerProps, OrNull } from './CardContainer.types';
import clsx from 'clsx';

const CardContainer = React.forwardRef(({ children, style, className = '', orientation = 'vertical' }: CardContainerProps, ref) => {
    const containerRef = useRef(null);

    return (
        <div ref={containerRef} className={clsx(orientation === 'vertical' ? 'card-vertical' : 'card-horizontal', className)}>
            {!React.Children?.map(children, (child, i) => {
                if (!React.isValidElement(child)) {
                    return child;
                }
            })}
        </div>
    );
});

export default CardContainer;