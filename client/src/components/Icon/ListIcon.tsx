/**
 * List Icon
 * @type {Component}
 */
import React, { SVGProps } from "react";

const ListIcon = (props: SVGProps<SVGSVGElement>) => {
  const { color, size } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 39 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="List">
        <rect width="39" height="39" stroke={color} />
        <path
          id="Icon"
          d="M13 9.75H34.125M13 19.5H34.125M13 29.25H34.125M4.875 9.75H4.89125M4.875 19.5H4.89125M4.875 29.25H4.89125"
          stroke="#F5F5F5"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  );
};

export default ListIcon;
