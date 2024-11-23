// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { FetchUserData } from '../services/operations/authCall';
// import { getFromLocalStorage } from '../services/operations/SecureLocal';
// import MapDisplay from './MapDisplay';
// import GetDirection from './GetDirection';

// function MapPages() {
//     // Retrieve and sanitize accountType
//     let accountType = localStorage.getItem("accountType");
//     accountType = JSON.parse(accountType);  // Parse accountType from localStorage

//     const userdata = getFromLocalStorage("userData");  // Get user data from localStorage
//     const [fetchuser, setFetchuser] = useState(null);  // Store fetched user data
//     const dispatch = useDispatch();
//     const userId = userdata?.id;  // User ID
//     const [customerPos,setCustomerPos]=useState({lat:"",lng:""});
//     const [cartManPos,setCartManPos]=useState({lat:"",lng:""});

//     // Log for debugging
//     console.log("Sanitized Account Type:", accountType);
//     console.log("User Data:", userdata);

//     // Fetch user data on component mount
//     useEffect(() => {
//         const fetchData = async () => {
//             if (userId) {
//                 try {
//                     // Dispatch the action to fetch user data
//                     const response = await dispatch(FetchUserData(userId));  // Make sure FetchUserData returns the data correctly
//                     console.log("Fetched user data:", response);
//                     setCartManPos({lat:response.position.lat,lng:response.position.lng})
//                     setFetchuser(response);  // Set the fetched data to state
//                 } catch (error) {
//                     console.error("Error fetching online cart data:", error);
//                 }
//             }
//         };

//         fetchData();
//     }, [dispatch, userId]);  // Fetch data when userId or dispatch changes

//     // Check if the user data is loaded
//     if (!fetchuser) {
//         return <div>Loading user data...</div>;  // Show loading while data is being fetched
//     }

//     // Handle Accept and Delete button actions
//     const handleAccept = (user) => {
//         console.log(`User with ID: ${userId} has been accepted.`);
//         // Implement your accept logic here, like dispatching an action
//         console.log("position of user",user.position);
//         setCustomerPos({lat:user.position.lat,lng:user.position.lng})
//         console.log("position of user",user.firstName);

        
//     };

//     const handleDelete = (userId) => {
//         console.log(`User with ID: ${userId} has been deleted`);
//         // Implement your delete logic here, like dispatching an action
//     };
//     // Access the user data from fetchuser (assuming newdata is inside fetchuser.data)
//     const usersList = fetchuser.cartBooked|| [];  // Default to empty array if no data
//     console.log("Users psotion:", fetchuser.position);
//     console.log("Users List:", usersList);
//     console.log("Users List Length:", usersList.length);
    
//     // Render the component based on account type
//     return (
        

        
//         <div className="">
//             <MapDisplay/>
//             <GetDirection
//             destination={customerPos}
//             current={cartManPos}
//             />
//         <div className="container my-4">

//             {accountType === "CartMan" ? (
//                 <div className="card shadow-sm">
//                     <div className="card-body">
//                         {/* <h2 className="card-title text-center">CartMan Section</h2> */}
//                         {usersList.length > 0 ? (
//                             <div>
//                                 <h3>Cart Book Request </h3>
//                                 <ul className="list-group">
//                                     {usersList.map((userData, index) => (
//                                         <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
//                                             <div>
//                                                 <p><strong>First Name:</strong> {userData.user?.firstName}</p>
//                                                 <p><strong>Number:</strong> {userData.user?.number}</p>
//                                             </div>
//                                             <div>
//                                                 <button
//                                                     className="btn btn-success btn-sm me-2"
//                                                     onClick={() => handleAccept(userData.user)}
//                                                 >
//                                                     Accept
//                                                 </button>
//                                                 <button
//                                                     className="btn btn-danger btn-sm"
//                                                     onClick={() => handleDelete(userData.user)}
//                                                 >
//                                                     Delete
//                                                 </button>
//                                             </div>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         ) : (
//                             <div>No user data available</div>
//                         )}
//                     </div>
//                 </div>
//             ) : (
//                 <div className="card shadow-sm">
//                     <div className="card-body">
//                         <h2 className="card-title text-center">Customer Section</h2>
//                         <p className="text-center">You are viewing the customer view.</p>
//                     </div>
//                 </div>
//             )}
//         </div>
//         </div>
//         // </>
//     );
// }

// export default MapPages;
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FetchUserData } from '../services/operations/authCall';
import { getFromLocalStorage } from '../services/operations/SecureLocal';
import MapDisplay from './MapDisplay';
import GetDirection from './GetDirection';

function MapPages() {
    let accountType = localStorage.getItem("accountType");
    accountType = JSON.parse(accountType); // Parse accountType from localStorage

    const userdata = getFromLocalStorage("userData"); // Get user data from localStorage
    const [fetchuser, setFetchuser] = useState(null); // Store fetched user data
    const dispatch = useDispatch();
    const userId = userdata?.id; // User ID
    const [customerPos, setCustomerPos] = useState(null); // Customer position
    const [cartManPos, setCartManPos] = useState(null); // CartMan position

    console.log("Sanitized Account Type:", accountType);
    console.log("User Data:", userdata);

    // Fetch user data on component mount
    useEffect(() => {
        const fetchData = async () => {
            if (userId) {
                try {
                    const response = await dispatch(FetchUserData(userId));
                    console.log("Fetched user data:", response);
    
                    if (response.position && response.position.lat && response.position.lng) {
                        setCartManPos({
                            lat: parseFloat(response.position.lat),
                            lng: parseFloat(response.position.lng),
                        });
                    } else {
                        console.error("Invalid CartMan position:", response.position);
                    }
    
                    setFetchuser(response);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };
    
        fetchData();
    }, [dispatch, userId]);
    

    // If user data is not loaded, show loading
    if (!fetchuser) {
        return <div>Loading user data...</div>;
    }

    // const handleAccept = (user) => {
    //     console.log(`User with ID: ${user.id} has been accepted.`);
    //     console.log("User position:", user.position);
    
    //     if (user.position && user.position.lat && user.position.lng) {
    //         setCustomerPos({
    //             lat: parseFloat(user.position.lat),
    //             lng: parseFloat(user.position.lng),
    //         });
    //     } else {
    //         console.error("Invalid customer position:", user.position);
    //     }
    // };
    const handleAccept = (user) => {
        console.log(`User with ID: ${user._id} has been accepted.`);
        console.log("User position:", user.position);
        console.log("cartman positon",cartManPos);
        
        
        
        if (user.position ) {
            setCustomerPos({
                lat: parseFloat(user.position.lat),
                lng: parseFloat(user.position.lng),
            });
        } else {
            console.error("Invalid customer position:", user.position);
        }
    };
    console.log("customer positon",customerPos);
    

    const handleDelete = (userId) => {
        console.log(`User with ID: ${userId} has been deleted.`);
    };

    const usersList = fetchuser.cartBooked || []; // Default to empty array if no data
    console.log("CartMan Position:", cartManPos);
    console.log("Users List:", usersList);

    return (
        <div className="">
            {/* Render the map */}
            <MapDisplay currentLocation={cartManPos} destinationLocation={customerPos} />

            {/* Render directions dynamically if both positions are set */}
            {/* {customerPos && cartManPos && (
                <GetDirection destination={customerPos} current={cartManPos} />
            )} */}

                {/* {customerPos && cartManPos && (
                    <GetDirection 
                        destination={{
                            lat: parseFloat(customerPos.lat),
                            lng: parseFloat(customerPos.lng)
                        }} 
                        current={{
                            lat: parseFloat(cartManPos.lat),
                            lng: parseFloat(cartManPos.lng)
                        }} 
                    />
                )} */}

                {/* {customerPos && cartManPos && (
                    <GetDirection 
                        destination={{ 

                            lat: parseFloat(customerPos.lat),
                            lng: parseFloat(customerPos.lng)
                        }} 
                        current={{
                            lat: parseFloat(cartManPos.lat),
                            lng: parseFloat(cartManPos.lng)
                        }}  
                    />
                )} */}

            <div className="container my-4">
                {accountType === "CartMan" ? (
                    <div className="card shadow-sm">
                        <div className="card-body">
                            {usersList.length > 0 ? (
                                <div>
                                    <h3>Cart Book Requests</h3>
                                    <ul className="list-group">
                                        {usersList.map((userData, index) => (
                                            <li
                                                key={index}
                                                className="list-group-item d-flex justify-content-between align-items-center"
                                            >
                                                <div>
                                                    <p>
                                                        <strong>First Name:</strong>{" "}
                                                        {userData.user?.firstName}
                                                    </p>
                                                    <p>
                                                        <strong>Number:</strong>{" "}
                                                        {userData.user?.number}
                                                    </p>
                                                </div>
                                                <div>
                                                    <button
                                                        className="btn btn-success btn-sm me-2"
                                                        onClick={() =>
                                                            handleAccept(userData.user)
                                                        }
                                                    >
                                                        Accept
                                                    </button>
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() =>
                                                            handleDelete(userData.user.id)
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <div>No user data available</div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title text-center">Customer Section</h2>
                            <p className="text-center">
                                You are viewing the customer view.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MapPages;
