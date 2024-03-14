/**
 * Card Component
 * 
 * @type {Component}
 */
import React, { forwardRef } from "react";
import { CardProps } from "./Card.types";

const Card = ({ children, className }: CardProps) => {
    return (
        <div className={className}>
            {children}
        </div>
    );
};