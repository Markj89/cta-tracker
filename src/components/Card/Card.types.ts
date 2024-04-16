import { Station } from "components/Map";
import React, { Ref } from "react";

export interface CardProps {
    children: Station;
    onClick: () => void;
    ref?: Ref<unknown>;
}