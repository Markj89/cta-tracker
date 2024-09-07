import React from 'react';
import { TabProps } from './Tabs.types';

export const Tab = ({ label, className, size, icon }: TabProps) => {
    return (
        <div className={className}>
            <div>{label}</div>
        </div>
    );
}