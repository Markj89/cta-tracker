import clsx from "clsx";
import { formatArrivalTime } from "./../Modal/StationModal.logic";
import React, { useState } from "react";
import Button from "./../Button";

const StopCard = ({ destinationName, stops, stopName, routeNumber = null }) => {
  const [showAll, setShowAll] = useState(false);
  const displayedStops = showAll ? stops : stops.slice(0, 3);

  return (
    <div className="bg-white rounded-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.1)] p-4 max-w-md mt-4">
      <div className="flex items-center justify-between mb-4">
        <div className="text-2xl font-bold">{stopName}</div>
      </div>

      <div className="relative pl-1">
        <div
          className={clsx(
            "absolute top-1 left-[9px] w-px h-full blue-background"
          )}
        />

        <ul className="space-y-4">
          {displayedStops.map((stop, index) => (
            <li key={index} className="flex justify-between items-start">
              <div className="flex items-center space-x-2">
                <div
                  className={clsx(
                    "w-3 h-3 z-10",
                    index === 0
                      ? "blue-background rounded-full"
                      : "rounded-full border-2 blue-background"
                  )}
                />
                <span className="truncate max-w-[200px] text-sm text-gray-800">
                  {stop?.raw?.destNm || "Unknown Stop"}
                </span>
              </div>

              <div className="text-sm text-gray-600 font-medium whitespace-nowrap">
                {formatArrivalTime(stop?.arrivalTime).toString() === "0"
                  ? "Due"
                  : `${formatArrivalTime(stop?.arrivalTime)} mins`}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {stops.length > 3 && (
        <Button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 w-full text-center text-sm text-gray-600 hover:text-black transition"
        >
          {showAll ? "Show Less" : "More Departures"}
        </Button>
      )}
    </div>
  );
};

export default StopCard;
