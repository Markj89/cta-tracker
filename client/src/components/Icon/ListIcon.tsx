/**
 * List Icon
 * @type {Component}
 */
import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

const ListIcon = (props: IconProps) => {
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
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default ListIcon;
