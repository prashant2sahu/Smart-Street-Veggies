import React from 'react';
import {DirectionsService , DirectionsRenderer} from '@react-google-maps/api'



function GetDirection({destination , current}) {

    const directionsCallback = (response) => {
        if (response !== null && response.status === 'OK') {
          console.log(response);
        }
      };
    return (<div>
            <DirectionsService
               options={{ destination: destination, origin: current, travelMode: 'DRIVING' }}
                callback={directionsCallback}
            /> 
            <DirectionsRenderer /> 
        </div> );
}

export default GetDirection;