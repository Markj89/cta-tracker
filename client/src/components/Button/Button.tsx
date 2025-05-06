/**
 * Button Component
 * 
 * @type {Component} Button
 */
import React, { MouseEvent, Ref, forwardRef, PropsWithChildren, memo } from 'react';

interface ButtonProps {
    children: JSX.Element;
    className: string;
    onClick?: () => void;
    active?: boolean;
    isLoading?: boolean;
    isCompleted?: boolean;
    disabled?: boolean;
    [key: string]: any;
}
type OrNull<T> = T | null

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ 
        className, 
        children, 
        onClick, 
        active,
        disabled,
        reversed,
        ...props 
    }, 
    ref) => {
    
    function clickHandler(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        onClick(event);
        return false;
    }

    return (
        <button {...props} className={className} ref={ref as React.RefObject<HTMLButtonElement>} disabled={disabled} onMouseDown={(e) => clickHandler(e)} data-testid="button-component" role='button'>
            {children}
        </button>
    );
});

export default memo(Button);