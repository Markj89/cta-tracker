import React from "react";

const DrawerHeader = ({ headline }) => (
    <div className="drawer-header-title">
        <h2
            className="text-base text-center font-medium text-gray-900"
            id="slide-over-title"
        >
            {headline}
        </h2>
    </div>
);

export default DrawerHeader;