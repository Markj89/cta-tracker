import React from "react";
import { TabsProps } from "./Tabs.types";
import { Tab } from "./Tab";

export const Tabs = ({tabIndex, onClick, tabs, variant, children }: TabsProps) => {
    return (
        <div>
            {tabs && tabs?.map((tab, i) => (
                <div key={i}>
                    <Tab label={tab?.label} size={"large"}  />
                </div>
            ))}
            { children && (
                <div>
                    {children}
                </div>
            )}
        </div>
    );
}