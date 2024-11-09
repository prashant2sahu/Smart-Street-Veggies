import React, { useState,useRef } from 'react';
import { useJsApiLoader, GoogleMap,InfoWindow, Marker} from "@react-google-maps/api";
import cartMarker from "./CartMan_Marker.png";
// import cartMarker from "./Customer.png";
import {jwtDecode} from 'jwt-decode'
import liveMarker from "./Live.png";

import cart from "./sec.png";
import '../App.css';

// import compass from "./compass.jpg"
// import blue from "./blue.png"
import { useEffect } from 'react';
import GetDirection from './GetDirection'
import { icons } from 'react-icons';
import { useDispatch } from 'react-redux';
import { ShowOnlineCart } from '../services/operations/cartApi';
import { BookCart } from '../services/operations/cartApi';
import { Navigate } from 'react-router-dom';
import { setPosition } from '../services/operations/authCall';
// import cartMarker from "./CartMan_Marker.png";
import customerMarker from "./Customer.png";
// import jwt_decode from 'jwt-decode';
// import { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const sendLocation = (userId, latitude, longitude) => {
    socket.emit('updateLocation', { userId, latitude, longitude });
};



const markers = [
  {
    id: 1,
    name: 'prashant',
    email: 'prashant@gmail.com',
    position: {
      lat: 23.298011,
      lng: 77.404635,
    },
    veggies: [{
      veggiesName: "Toamto",
      rate: 55,
    },
    {
      veggiesName: "carrot",
      rate: 55
    },
    {
      veggiesName: "onion",
      rate: 55
    },
    {
      veggiesName: "potato",
      rate: 55,
    }],

  },
  {
    id: 2,
    name: 'Hardik',
    email: 'hardik@gmail.com',
    position: {
      lat: 23.298011,
      lng: 77.401135,
    },
    veggies: [{
      veggiesName: "Toamto",
      rate: 22,
    },
    {
      veggiesName: "carrot",
      rate: 32
    },
    {
      veggiesName: "onion",
      rate: 42
    },
    {
      veggiesName: "potato",
      rate: 82,
    }],

  },
  {
    id: 3,
    name: 'himanshu',
    email: 'himanshu@gmail.com',
    position: {
      lat: 23.296011,
      lng: 77.400635,
    },
    veggies: [{
      veggiesName: "Toamto",
      rate: 33,
    },
    {
      veggiesName: "carrot",
      rate: 43
    },
    {
      veggiesName: "onion",
      rate: 93
    },
    {
      veggiesName: "potato",
      rate: 73,
    }],

  }
]

const containerStyle = {
width: '100%',
  height: '600px'
};

const center = {
  // lat: 23.296011,
  // lng: 77.400635,
  
lat: 23.2319596,
lng:77.4351323
};

function MapDisplay() {
  // const id=localStorage.getItem("token");
  const token=localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  const userId=decodedToken.id;
  const accountType=localStorage.getItem("accountType");
  console.log("account Type",userId);
  
  // const token = localStorage.getItem("token");
  const intervalRef = useRef(null); 
  const [current, setCurrent] = useState({lat:"",lng:""});
  const [oneCart,setOneCart]=useState("");
  const destination = { lat: 34.0522, lng: -118.2437 };
  const [map, setMap] = React.useState(null)
  const dispatch=useDispatch();
  const [rowData,setRowData]=useState([]);
  const { isLoaded } = useJsApiLoader({
    // id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,

  })

  
  // const {acccountType} =decodedToken       ;
  // console.log("acccountType",acccountType);

  useEffect(() => {

    if (navigator.geolocation) {
      intervalRef.current =setInterval(() => {
        // intervalRef.current = navigator.geolocation.watchPosition(
        // getCurrentPosition
        navigator.geolocation.getCurrentPosition(
          (position) => {
            //   const { latitude, longitude } = position.coords;
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;
            console.log(position);
            sendLocation(userId, lat, lng);
            setCurrent({ lat:lat, lng:lng});
            // dispatch(setPosition(lat,lng,token));
          },
          (error) => {
            console.error(error);
          },
          {
            enableHighAccuracy: true, // Requests high accuracy (e.g., GPS)
            timeout: 5000,           // 10-second timeout
            maximumAge: 0             // Ensures fresh location data
        }
        );
      }, 5000);
      return () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };
    } else {
      console.error('Geolocation is not supported by this browser.');
    }

    // let data=dispatch(ShowOnlineCart());
    // console.log("data",data);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dispatch(ShowOnlineCart());
        // console.log("data", data);
        setRowData(data);
      } catch (error) {
        console.error("Error fetching online cart data:", error);
      }
    };

    fetchData();
  }, [dispatch]);
  console.log("data",rowData);

  
  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])
  function BookCartHandler(){
      dispatch(BookCart(token,Navigate));
      console.log("Your Card has booked now we will connect you soon ");
  }

  const icon = {
    // url: cartMarker, // url
    url: accountType==="Customer"? cartMarker :customerMarker, // url

    // scaledSize: Size(50, 50), // scaled size
    // scale: 2,
    // fillOpacity: 10,
    // scaledSize: 5*5, 
    scaledSize:  new window.google.maps.Size(50,50),
    origin: new window.google.maps.Point(0,0), // origin
    anchor: new window.google.maps.Point(0, 0), // anchor
    fillColor: "blue",
    fillOpacity: 0.6,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    // anchor: new window.google.maps.Point(0, 20),
};

const live = {
  url: liveMarker, // url
  // scaledSize: Size(50, 50), // scaled size
  // scale: 2,
  // fillOpacity: 10,
  // scaledSize: 5*5, 
  scaledSize:  new window.google.maps.Size(30,30),
  // origin: new window.google.maps.Point(0,0), // origin
  // anchor: new window.google.maps.Point(0, 0) // anchor
  fillColor: "blue",
  fillOpacity: 0.6,
  strokeWeight: 0,
  rotation: 0,
  scale: 2,
  // anchor: new window.google.maps.Point(0, 20),
};
return isLoaded ? (
  <GoogleMap
    mapContainerStyle={containerStyle}
    center={current}
    zoom={10}
    onLoad={onLoad}
    // onUnmount={onUnmount}
  >
    <Marker position={current} icon={live}></Marker>

    {
    rowData.map((element) => {
  // Check that element has a valid position with both latitude and longitude
  const { id, name, position } = element;
  
  if (position?.lat && position?.lng) {
    return (
      <div key={id}>
        <Marker
          position={{ lat: position.lat, lng: position.lng }}
          onClick={() => setOneCart(element)}
          icon={icon}
        />
      </div>
    );
  } else {
    // Log an error if coordinates are missing
    console.error(`Missing coordinates for element: ${name}`);
    return null;
  }
})
}


{oneCart && (
  <InfoWindow key={oneCart.id} position={oneCart.position}>
    <>
    <div  className="mapDisplay1">
      <h1>{oneCart.name}</h1>
      <h1>{oneCart.email}</h1>
      {oneCart.veggies.map((veg) => (
        <div className="mapDisplay2" key={veg.veggiesName}>
          <h2>{veg.veggiesName}</h2>
          <h2>{veg.rate}</h2>
        </div>
      ))}

<button className='mapDisplay3' onClick={()=>BookCartHandler()}>Book Now</button>

    </div>

    </>
  </InfoWindow>
)}

 <></>
    </GoogleMap>
  ) : <p>Ooops !! Map Loading fail</p>


  
}


export default MapDisplay;