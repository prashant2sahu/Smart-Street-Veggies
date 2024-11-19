import React, { useState } from 'react';
import {useEffect } from 'react';
import MapDisplay from './MapDisplay';
import { getFromLocalStorage } from '../services/operations/SecureLocal';
import { useDispatch } from 'react-redux';
import { FetchUserData, login } from '../services/operations/authCall';

function MapPages() {
    // Retrieve and sanitize accountType
    let accountType = localStorage.getItem("accountType");
    accountType = JSON.parse(accountType)
    // const accountType = rawAccountType?.split(" ")[0]; // Extract first word
    const userdata = getFromLocalStorage("userData");
    const [fetchuser,setUser]=useState("");
    const dispatch=useDispatch();

    // console.log("Raw Account Type:", rawAccountType);
    console.log("Sanitized Account Type:", accountType);
    console.log("User Data:", userdata.id);
    const userId=userdata.id;

    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         const fdata = dispatch(FetchUserData(userId));
    //         // console.log("data", data);
    //         setUser(fdata);
    //       } catch (error) {
    //         console.error("Error fetching online cart data:", error);
    //       }
    //     };
    
    //     fetchData();  
    // }, [dispatch]);
    useEffect(() => {
            const fetchData = async () => {
                    try {
                            // Dispatch FetchUserData and wait for it to resolve
                            const response =  dispatch(FetchUserData(userId));
                            // const responded=await response.json();
                            console.log("Fetched user data:", response);
                            setUser(response);  // Set the fetched data in state
                        } catch (error) {
                                console.error("Error fetching online cart data:", error);
                            }
                        };
                    
                        fetchData();
                    }, [dispatch, userId]); 
  

    // const response =dispatch(FetchUserData(userId));
    //             const responded=await response.json();
    //             console.log("Fetched user data:", response);
    //             setUser(responded);  // Set the fetched data
    // if (!fetchuser) {
    //     return <div>Loading user data...</div>;
    // }

    console.log("Fetched user:", fetchuser);

    // Assuming 'newdata' is an array inside `fetchUser.data`, map through it
    const usersList = fetchuser?.data?.newdata || [];
      

    return (
        <div>
            {/* Map Display Component */}
            {/* <MapDisplay /> */}

           { accountType === "CartMan" ? (
                <div style={{
                    marginTop: "20px",
                    padding: "20px",
                    backgroundColor: "lightblue",
                    border: "1px solid black",
                    color: "black",

                }}>
                    
                    hanji dosto
                    {usersList.length > 0 ? (
                        <div>
                            <h3>User Details</h3>
                            <ul>
                                {usersList.map((user, index) => (
                                    <li key={index}>
                                        <p>First Name: {user.firstName}</p>
                                        <p>Mobile Number: {user.mobileNumber}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div>No user data available</div>
                    )}
                </div>
            ) : (<div>
                dosto me hu customer
                newdata
                </div>)
}
        </div>
    );
}

export default MapPages;
