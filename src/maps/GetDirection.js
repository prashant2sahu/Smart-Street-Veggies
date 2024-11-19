import React, { useState } from 'react';
import { DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

function GetDirection({ destination, current }) {
    const [directions, setDirections] = useState(null);

    const directionsCallback = (response) => {
        if (response && response.status === 'OK') {
            setDirections(response);
        }
    };

    return (
        <>
            <DirectionsService
                options={{ destination, origin: current, travelMode: 'DRIVING' }}
                callback={directionsCallback}
            />
            {directions && <DirectionsRenderer directions={directions} />}
        </>
    );
}

export default GetDirection;
