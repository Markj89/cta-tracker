import React, { Ref } from "react";

export interface CardProps {
    children: JSX.Element;
    className: string;
    [key: string]: any;
    ref?: Ref<unknown>;
}