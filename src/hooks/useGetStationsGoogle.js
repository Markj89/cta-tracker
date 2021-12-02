import { useState, useEffect } from 'react';

export default function useGetStationsGoogle(currentLocation) {
    const [stations, setStations] = useState([]);

    const handleApiLoaded = (map, maps) => {
        var service = new maps.places.PlacesService(map);
    
        const request = {
          location: currentLocation,
          radius : '5000',
          types: ['subway_station', 'transit_station', 'point_of_interest', 'establishment']
        };
    
        service.nearbySearch(request, (results, placeStatus) => {
          if (placeStatus === maps.places.PlacesServiceStatus.OK) {
            for (let i = 0; i < results.length; i++) {
              let infowindow = new maps.InfoWindow({
                content: `<h1>${results[i].name}</h1>`,
                position: {
                  lat: parseFloat(results[i].geometry.location.lat()),
                  lng: parseFloat(results[i].geometry.location.lng()) 
                },
              });
    
              let marker = new maps.Marker({
                position: {lat: parseFloat(results[i].geometry.location.lat()), lng: parseFloat(results[i].geometry.location.lng())},
                map: map,
                title: results[i].name
              });
          
              marker.addListener('click', () => {
                infowindow.open(map, marker);
              });
            }
          }
          setStations(results);
        });
    };
}