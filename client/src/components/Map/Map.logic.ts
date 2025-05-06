function haversine(lat1, lon1, lat2, lon2) {
    const R = 3958.8; // Radius of Earth in miles (use 6371 for kilometers)
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    return R * c; // Distance in miles
}

// Convert degrees to radians
function toRad(degrees) {
    return degrees * (Math.PI / 180);
}

// Function to find locations within a specific radius (in miles)
export function findLocationsInRange(locations, currentLocation, radius) {
    return locations.filter((location) => {
        const distance = haversine(currentLocation?.lat, currentLocation?.lng, location.lat, location.lng);
        return distance <= radius;
    });
}

export function getDuplicateStops(data) {
    if (!data || !Array.isArray(data)) return [];

    // Group together by station Id
    const stopGroups = data?.reduce((acc, current) => {
        acc[current?.staId] = acc[current?.staId] || [];
        acc[current?.staId].push(current);
        return acc;
    }, {});

    // Find duplicate stops (more than 1 arrival)
    const duplicates = Object.values(stopGroups).filter(arrivals => arrivals.length > 1).flat(); // Flatten the results
    // Sort by the nearest arrival time
    return duplicates.sort((a, b) => a?.arrT === b?.arrT);
}

export const getGroupedDuplicateStops = (data) => {
    if (!data || !Array.isArray(data)) return [];
  
    const now = new Date();
    const arrivalsWithin5Min = [];
  
    // Step 1: Filter for arrivals within the next 5 minutes
    data.forEach((arrival) => {
        const arrivalTime = new Date(arrival.arrT);
        const timeDiff = (arrivalTime - now) / (1000 * 60); // ms to min
        arrivalsWithin5Min.push({
            stopId: arrival.staId,
            arrivalTime,
            timeDiff,
            raw: arrival, // Include the full original object for display if needed
        });
    });
  
    // Step 2: Group by stopId
    const grouped = arrivalsWithin5Min.reduce((acc, curr) => {
        if (!acc[curr.stopId]) acc[curr.stopId] = [];
        acc[curr.stopId].push(curr);
        return acc;
    }, {});
  
    // Step 3: Filter only duplicates (stopId with more than 1 entry)
    const duplicateGroups = Object.entries(grouped).filter(([, arrivals]) => arrivals.length > 1).map(([stopId, arrivals]) => ({
        stopId,
        arrivals: arrivals.sort((a, b) => a.timeDiff - b.timeDiff), // sort by soonest arrival
    })).sort((a, b) => a.arrivals[0].timeDiff - b.arrivals[0].timeDiff); // sort outer group by first arrival
  
    return duplicateGroups;
};
  