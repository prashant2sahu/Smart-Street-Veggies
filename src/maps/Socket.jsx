// LocationUpdater.js
import { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const sendLocation = (userId, latitude, longitude) => {
    socket.emit('updateLocation', { userId, latitude, longitude });
};

const LocationUpdater = ({ userId }) => {
    useEffect(() => {
        // Example: Update every 5 seconds with random coordinates
        const intervalId = setInterval(() => {
            const latitude = 37.7749;  // Replace with dynamic data
            const longitude = -122.4194;  // Replace with dynamic data
            sendLocation(userId, latitude, longitude);
        }, 5000);

        return () => clearInterval(intervalId);
    }, [userId]);

    return null;
};

export default LocationUpdater;
