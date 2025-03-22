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