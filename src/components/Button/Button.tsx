/**
 * Button Component
 * 
 * @type {Component} Button
 */

import React, { MouseEvent, ReactNode, Ref, forwardRef, PropsWithChildren, ButtonHTMLAttributes } from 'react';

interface ButtonProps {
    children: ReactNode;
    className: string;
    onClick: (event: MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    active?: boolean;
    isLoading?: boolean;
    isCompleted?: boolean;
    disabled?: boolean;
    [key: string]: any;
}
type OrNull<T> = T | null

const Button = forwardRef(
    (
        { 
            className, 
            children, 
            onClick, 
            reversed, 
            active, 
            ...props 
        }: PropsWithChildren<
            { 
                active: boolean, 
                reversed: boolean 
            } & ButtonProps
        >, 
        ref: Ref<OrNull<HTMLButtonElement>>
    ) => {
    
    function clickHandler(event: any) {
        event.preventDefault();
        onClick(event);
        return false;
    }

    return (
        <button {...props} ref={ref as React.RefObject<HTMLButtonElement>} onMouseDown={(e) => clickHandler(e)} data-testid="button-component">
            {children}
        </button>
    );
});

export default Button;