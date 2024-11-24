// import React, { useState } from 'react';
// import { DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

// function GetDirection({ destination, current }) {
//     const [directions, setDirections] = useState(null);

//     const directionsCallback = (response) => {
//         if (response && response.status === 'OK') {
//             setDirections(response);
//         }
//     };

//     return (
//         <>
//             <DirectionsService
//                 options={{ destination, origin: current, travelMode: 'DRIVING' }}
//                 callback={directionsCallback}
//             />
//             {directions && <DirectionsRenderer directions={directions} />}
//         </>
//     );
// }

// export default GetDirection;

import React, { useEffect, useState, useRef } from 'react';
import { DirectionsRenderer, Marker, useJsApiLoader } from "@react-google-maps/api";
import customerMarker from "./Customer.png";


const GetDirection = ({ current, destination }) => {
    const [directionsResponse, setDirectionsResponse] = useState(null);
    // const { isLoaded } = useJsApiLoader({
    //     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    //     libraries: ['places'], // Optional: include additional libraries
    // });
    const directionsRendererRef = useRef(null);
    const icon = {
        // url: cartMarker, // url
        url: customerMarker, // url
    
        scaledSize:  new window.google.maps.Size(50,50),
       
    }; 
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
        libraries: ["places", "maps"], // Match the central configuration
      });

    useEffect(() => {
        if (isLoaded && current && destination) {
            const directionsService = new window.google.maps.DirectionsService();
            directionsService.route(
                {
                    origin: current,
                    destination: destination,
                    travelMode: window.google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        setDirectionsResponse(result);
                    } else {
                        console.error(`Directions request failed due to ${status}`);
                    }
                }
            );
        }
    }, [isLoaded, current, destination]);
    useEffect(() => {
        if (directionsRendererRef.current && directionsResponse) {
          const markers = directionsRendererRef.current.getDirections().routes[0].legs[0].steps.map(step => step.marker);
          markers.forEach(marker => marker.setMap(null)); // Remove default markers
        }
      }, [directionsResponse]);

    return isLoaded && directionsResponse ? ( 
        <>
        <DirectionsRenderer
           directions={directionsResponse}
           suppressMarkers={true} />
        <Marker position={destination} icon={icon} />
        </>
    ) : null;
};

export default GetDirection;
