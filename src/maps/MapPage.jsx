// import React, { useState } from 'react';
// import {useEffect } from 'react';
// import MapDisplay from './MapDisplay';
// import { getFromLocalStorage } from '../services/operations/SecureLocal';
// import { useDispatch } from 'react-redux';
// import { FetchUserData, login } from '../services/operations/authCall';

// function MapPages() {
//     // Retrieve and sanitize accountType
//     let accountType = localStorage.getItem("accountType");
//     accountType = JSON.parse(accountType)
//     // const accountType = rawAccountType?.split(" ")[0]; // Extract first word
//     const userdata = getFromLocalStorage("userData");
//     const [fetchuser,setFetchuser]=useState("");
//     const dispatch=useDispatch();

//     // console.log("Raw Account Type:", rawAccountType);
//     console.log("Sanitized Account Type:", userdata.accountType);
//     console.log("User Data:", userdata.id);
//     const userId=userdata.id;

//     // useEffect(() => {
//     //     const fetchData = async () => {
//     //       try {
//     //         const fdata = dispatch(FetchUserData(userId));
//     //         // console.log("data", data);
//     //         setUser(fdata);
//     //       } catch (error) {
//     //         console.error("Error fetching online cart data:", error);
//     //       }
//     //     };
    
//     //     fetchData();  
//     // }, [dispatch]);
//     useEffect(() => {
//             const fetchData = async () => {
//                     try {
//                             // Dispatch FetchUserData and wait for it to resolve
//                             const response =  dispatch(FetchUserData(userId));
//                             // const responded=await response.json();
//                             console.log("Fetched user data:", response);
//                             setFetchuser(response);  // Set the fetched data in state
//                         } catch (error) {
//                                 console.error("Error fetching online cart data:", error);
//                             }
//                         };
                    
//                         fetchData();
//                     }, [dispatch, userId]); 
  

//     // const response =dispatch(FetchUserData(userId));
//     //             const responded=await response.json();
//     //             console.log("Fetched user data:", response);
//     //             setUser(responded);  // Set the fetched data
//     // if (!fetchuser) {
//     //     return <div>Loading user data...</div>;
//     // }

//     console.log("Fetched user:", fetchuser);

//     // Assuming 'newdata' is an array inside `fetchUser.data`, map through it
//     const usersList = fetchuser?.data?.newdata || [];
//       console.log(usersList,"userlist");

//     return (
//         <div>
//             {/* Map Display Component */}
//             {/* <MapDisplay /> */}

//            { accountType === "CartMan" ? (
//                 <div style={{
//                     marginTop: "20px",
//                     padding: "20px",
//                     backgroundColor: "lightblue",
//                     border: "1px solid black",
//                     color: "black",

//                 }}>
                    
//                     hanji dosto
//                     {usersList.length > 0 ? (
//                         <div>
//                             <h3>User Details</h3>
//                             <ul>
//                                 {usersList.map((user, index) => (
//                                     <li key={index}>
//                                         <p>First Name: {user.firstName}</p>
//                                         <p>Mobile Number: {user.mobileNumber}</p>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     ) : (
//                         <div>No user data available</div>
//                     )}
//                 </div>
//             ) : (<div>
//                 dosto me hu customer
//                 newdata
//                 </div>)
// }
//         </div>
//     );
// }

// export default MapPages;

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FetchUserData } from '../services/operations/authCall';
import { getFromLocalStorage } from '../services/operations/SecureLocal';

function MapPages() {
    // Retrieve and sanitize accountType
    let accountType = localStorage.getItem("accountType");
    accountType = JSON.parse(accountType);  // Parse accountType from localStorage

    const userdata = getFromLocalStorage("userData");  // Get user data from localStorage
    const [fetchuser, setFetchuser] = useState(null);  // Store fetched user data
    const dispatch = useDispatch();
    const userId = userdata?.id;  // User ID

    // Log for debugging
    console.log("Sanitized Account Type:", accountType);
    console.log("User Data:", userdata);

    // Fetch user data on component mount
    useEffect(() => {
        const fetchData = async () => {
            if (userId) {
                try {
                    // Dispatch the action to fetch user data
                    const response = await dispatch(FetchUserData(userId));  // Make sure FetchUserData returns the data correctly
                    console.log("Fetched user data:", response);
                    setFetchuser(response);  // Set the fetched data to state
                } catch (error) {
                    console.error("Error fetching online cart data:", error);
                }
            }
        };

        fetchData();
    }, [dispatch, userId]);  // Fetch data when userId or dispatch changes

    // Check if the user data is loaded
    if (!fetchuser) {
        return <div>Loading user data...</div>;  // Show loading while data is being fetched
    }

    // Handle Accept and Delete button actions
    const handleAccept = (userId) => {
        console.log(`User with ID: ${userId} has been accepted.`);
        // Implement your accept logic here, like dispatching an action
    };

    const handleDelete = (userId) => {
        console.log(`User with ID: ${userId} has been deleted.`);
        // Implement your delete logic here, like dispatching an action
    };
    // Access the user data from fetchuser (assuming `newdata` is inside `fetchuser.data`)
    const usersList = fetchuser.cartBooked|| [];  // Default to empty array if no data

    console.log("Users List:", usersList);
    console.log("Users List Length:", usersList.length);
    
    // Render the component based on account type
    return (
        // <div>
        //     {accountType === "CartMan" ? (
        //         <div style={{
        //             marginTop: "20px",
        //             padding: "20px",
        //             backgroundColor: "lightblue",
        //             border: "1px solid black",
        //             color: "black",
        //         }}>
        //             <h2>CartMan Section</h2>
        //             {usersList.length > 0 ? (
        //                 <div>
        //                     <h3>User Details</h3>
        //                     {usersList.map((userData, index) => (
        //                             <li key={index}>
        //                                 {/* Accessing the firstName from the user object */}
        //                                 <p>First Name: {userData.user?.firstName}</p>
        //                                 <p>Number: {userData.user?.number}</p> {/* Displaying the _id */}
                                   
        //                                 {/* Buttons for Accept and Delete */}
        //                                 <button
        //                                     onClick={() => handleAccept(userData._id)} // Pass the user ID to the handler
        //                                     style={{ marginRight: "10px" }}
        //                                 >
        //                                     Accept
        //                                 </button>
        //                                 <button
        //                                     onClick={() => handleDelete(userData._id)} // Pass the user ID to the handler
        //                                 >
        //                                     Delete
        //                                 </button>
        //                             </li>
        //                         ))}
        //                 </div>
        //             ) : (
        //                 <div>No user data available</div>
        //             )}
        //         </div>
        //     ) : (
        //         <div>
        //             <h2>Customer Section</h2>
        //             {/* You can add customer-specific content here */}
        //             <p>You are viewing the customer view.</p>
        //         </div>
        //     )}
        // </div>
        <>
        
        <div className="container my-4">
            {accountType === "CartMan" ? (
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title text-center">CartMan Section</h2>
                        {usersList.length > 0 ? (
                            <div>
                                <h3>User Details</h3>
                                <ul className="list-group">
                                    {usersList.map((userData, index) => (
                                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                            <div>
                                                <p><strong>First Name:</strong> {userData.user?.firstName}</p>
                                                <p><strong>Number:</strong> {userData.user?.number}</p>
                                            </div>
                                            <div>
                                                <button
                                                    className="btn btn-success btn-sm me-2"
                                                    onClick={() => handleAccept(userData._id)}
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDelete(userData._id)}
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
                        <p className="text-center">You are viewing the customer view.</p>
                    </div>
                </div>
            )}
        </div>
        
        </>
    );
}

export default MapPages;
