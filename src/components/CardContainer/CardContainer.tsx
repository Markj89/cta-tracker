/**
 * Container (Card)
 * @type {Component} CardContainer
 */
import React, { useRef } from 'react';
import { CardContainerProps } from './CardContainer.types';
import clsx from 'clsx';

const CardContainer = React.forwardRef(({ children, style, className = '', orientation = 'vertical' }: CardContainerProps, ref) => {
    const containerRef = useRef(null);

    return (
        <div ref={containerRef} className={clsx(orientation === 'vertical' ? 'card-vertical' : 'card-horizontal', className)}>
            {children}
        </div>
    );
});

export default CardContainer;