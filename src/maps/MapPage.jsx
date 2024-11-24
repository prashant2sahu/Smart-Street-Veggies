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

// <<<<<<< master
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

// =======
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
// >>>>>>> master

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
// 
// <<<<<<< master
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
// =======
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
// >>>>>>> master
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
// <<<<<<< master
import Footer from '../components/Footer'
import '../StyleSheet/MapPage.css'
import { updateCartStatus, deleteCart, cartBookVeggie } from "../services/operations/cartApi";
import toast from 'react-hot-toast';
// import { FetchUserData } from '../services/operations/authCall';
// =======
import MapDisplay from './MapDisplay';
import GetDirection from './GetDirection';

// >>>>>>> master
function MapPages() {
    let accountType = localStorage.getItem("accountType");
    accountType = JSON.parse(accountType); // Parse accountType from localStorage

// <<<<<<< master
    const userdata = getFromLocalStorage("userData");  // Get user data from localStorage
    const [fetchuser, setFetchuser] = useState(null);  // Store fetched user data
    // const [fetchcartuser, setFetchcartuser] = useState(null);  // Store fetched user data

    const dispatch = useDispatch();
    const userId = userdata?.id;  // User ID
    console.log(userId, "yh user ki id h");
    const BookId = userdata?.BookId;
    console.log(BookId, "yh booking id thi ");

    let [veggies, setVeggies] = useState([])
// =======
//     const userdata = getFromLocalStorage("userData"); // Get user data from localStorage
//     const [fetchuser, setFetchuser] = useState(null); // Store fetched user data
//     const dispatch = useDispatch();
//     const userId = userdata?.id; // User ID
//     const [customerPos, setCustomerPos] = useState(null); // Customer position
//     const [cartManPos, setCartManPos] = useState(null); // CartMan position

//     console.log("Sanitized Account Type:", accountType);
//     console.log("User Data:", userdata);
// >>>>>>> master

    // Fetch veggies when the component mounts or BookId changes
    useEffect(() => {
        const fetchVeggies = async () => {
            try {
                // Retrieve BookIds from localStorage (assuming it's an array)
                const bookIds = JSON.parse(localStorage.getItem("BookingID")) || [];
        
                // Array to hold the fetched data
                let allVeggies = [];
        
                // Loop through each BookId and fetch veggies data
                for (let id of bookIds) {
                    const res = await cartBookVeggie(id); // API call for each BookId
        
                    if (res) {
                        console.log("Response for BookId", id, res.cartStatus);
                        const userVeggiesData = {
                            firstname: res.user.firstName, // Extract firstname from user object
                            number :res.user.number,
                            veggies: res.veggies, // Extract veggies array
                            cartStatus: res.cartStatus.map(item => ({
                                id: item._id, // CartBook entry ID
                                status: item.status, // CartBook status (e.g., 'pending', 'shipped')
                            }))
                        };
                        console.log(userVeggiesData, "Final userVeggiesData");
                        
                        // Add the constructed object to allVeggies array
                        allVeggies.push(userVeggiesData);
                    }
                }
        
                // Set the fetched data to the state
                setVeggies(allVeggies);
            } catch (error) {
                console.error("Error fetching veggies:", error);
            } finally {
                // setLoading(false); // Stop loading after fetch is complete
            }
        };
        
        fetchVeggies();
        
    }, [BookId]); // Effect will re-run when BookId changes
    // Function to get the status for a particular veggie based on the ID
    const getStatusForCartBook = (cartStatus, veggieIds) => {
        // Loop through veggieIds to find the first match
        console.log(veggieIds, "dfasdf");
        
     deleteFromLocalStorage()
        const matchedStatus = cartStatus.find(item => item.id === veggieIds);
        if (matchedStatus.status == "delivered") {

        }
        else {
            return matchedStatus ? matchedStatus.status : "Unknown"; // Return status or "Unknown" if not found
        }
    };



    console.log(veggies, "nhi ayi");
    // Fetch user data on component mount
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
// <<<<<<< master

    }, [dispatch, userId]);  // Fetch data when userId or dispatch changes
 
// =======
    }, [dispatch, userId]);
    

    // If user data is not loaded, show loading
// >>>>>>> master
    if (!fetchuser) {
        return <div>Loading user data...</div>;
    }
    const handleAccept = async (cartId, currentStatus) => {
        const newStatus = currentStatus === "deactivated" ? "accepted" : "delivered";
        console.log(cartId,"ACcepted");
        try {
            const updatedCart = await updateCartStatus(cartId, newStatus);
            console.log(updatedCart, "yh pr check kr rha hu ki horha hai ya nhi kuch");
            console.log(`Cart with ID: ${cartId} has been updated to status: ${newStatus}`);

            setFetchuser((prev) => ({
                ...prev,
                cartBooked: prev.cartBooked.map((item) =>
                    item._id === cartId ? { ...item, status: newStatus } : item
                ),
            }));
        } catch (error) {
            console.error("Error updating cart status:", error.message);
        }
    };
    // Function to delete a value from localStorage array
    const deleteFromLocalStorage = (key, valueToDelete) => {

        // Step 1: Retrieve the array from localStorage
        const data = JSON.parse(localStorage.getItem(key));
        console.log(data,"fsfsaf delete krna hai",valueToDelete);

        // Step 2: Check if data exists and is an array
        if (!Array.isArray(data)) {
            console.error("Data is not an array or does not exist.");
            return;
        }

        // Step 3: Filter the array to remove the specific value
        const updatedData = data.filter(item => item !== valueToDelete);

        // Step 4: Update localStorage with the new array
        localStorage.setItem(key, JSON.stringify(updatedData));

        // Step 5: Log for debugging
        console.log("Updated localStorage data:", updatedData);


// <<<<<<< master
// =======
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
// >>>>>>> master
    };
    console.log("customer positon",customerPos);
    

// <<<<<<< master
    // Usage Example


    const handleDelete = async (cartId) => {
        try {
            console.log(cartId);
            const response = await deleteCart(cartId);
            toast.success("Response", response)
            setFetchuser((prev) => ({
                ...prev,
                cartBooked: prev.cartBooked.filter((item) => item._id !== cartId),
            }));
        } catch (error) {
            console.error("Error deleting cart item:", error);
        }
    };

    console.error(veggies)
    const usersList = fetchuser.cartBooked || [];  // Default to empty array if no data
    return (

        <>
// =======
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
// >>>>>>> master

            <div className="container my-4">
                {accountType === "CartMan" ? (
                    <div className="card shadow-sm">
                        <div className="card-body">
// <<<<<<< master
                            <h2 className="card-title text-center text3d">CartMan Section</h2>
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
                                                <div className='d-flex'>

                                                    {userData.status != "delivered" ? (<>
                                                        <button
                                                            className={`btn btn-sm ${userData.status === "deactivated" ? "btn-success" : "btn-primary"} me-2`}
                                                            onClick={() => handleAccept(userData._id, userData.status)}
                                                        >
                                                            {userData.status === "deactivated" ? "Accept" : "Deliver"}
                                                        </button>
                                                    </>) : (<>
                                                        <span className="badge bg-success text-center mt-2">Delivered</span>
                                                     
                                                    </>)}
                                                  
                                                        <button
                                                            className="btn btn-danger btn-sm ms-2"
                                                            onClick={() => handleDelete(userData._id)}>
                                                            Delete
                                                        </button>
                                                  
//=======
//                             {usersList.length > 0 ? (
//                                 <div>
//                                     <h3>Cart Book Requests</h3>
//                                     <ul className="list-group">
//                                         {usersList.map((userData, index) => (
//                                             <li
//                                                 key={index}
//                                                 className="list-group-item d-flex justify-content-between align-items-center"
//                                             >
//                                                 <div>
//                                                     <p>
//                                                         <strong>First Name:</strong>{" "}
//                                                         {userData.user?.firstName}
//                                                     </p>
//                                                     <p>
//                                                         <strong>Number:</strong>{" "}
//                                                         {userData.user?.number}
//                                                     </p>
//                                                 </div>
//                                                 <div>
//                                                     <button
//                                                         className="btn btn-success btn-sm me-2"
//                                                         onClick={() =>
//                                                             handleAccept(userData.user)
//                                                         }
//                                                     >
//                                                         Accept
//                                                     </button>
//                                                     <button
//                                                         className="btn btn-danger btn-sm"
//                                                         onClick={() =>
//                                                             handleDelete(userData.user.id)
//                                                         }
//                                                     >
//                                                         Delete
//                                                     </button>
// >>>>>>> master
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
//<<<<<<< master
//                                 <div>

//                                     No user data available

//                                 </div>
// =======
                                <div>No user data available</div>
// >>>>>>> master
                            )}
                        </div>
                    </div>
                ) : (
//<<<<<<< master
                    <>
                        <div className="container mt-5">
                            <h2 className="text-center mb-4 text3d">Veggie List</h2>

                            <div className="row">
                                {veggies.length > 0 ? (
                                    veggies.map((user, index) => {
                                        // Get the status for the user (assuming you want the status of the first cart item)
                                        const status =
                                            user.cartStatus && user.cartStatus.length > 0
                                                ? getStatusForCartBook(user.cartStatus, user.cartStatus[index].id) // Show status of the first item
                                                : "Loading...";

                                        return (
                                            <div className="col-12 mb-4" key={index}>
                                                {/* User Name and Status */}
                                                <h4 className="text-primary mb-2">
                                                <p className=' text-decoration-underline'><strong> {user.firstname}'s Veggies</strong> </p> 
                                                  <p ><strong className='text-danger'>contact us:</strong> {user.number}</p> 
                                                </h4>
                                                <p className={`text-${status === "deactivated" ? "danger" : "success"}`}>
                                                    Status: {status || "Unknown"} 
                                                   
                                                </p>

                                                {/* Display Veggies */}
                                                <div className="row">
                                                    {user.veggies.map((item, vegIndex) => (
                                                        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 " key={vegIndex}>
                                                            <div className="card boxshow h-100 ">
                                                                {/* Veggie Details */}
                                                                <div className="card-body ">
                                                                    <h5 className="card-title text-truncate">{item.veggiesName}</h5>
                                                                    <p className="card-text">
                                                                        <strong>Price: ₹</strong> {item.rate}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p>No veggies available.</p>
                                )}
                            </div>
                        </div>



                    </>

                )}
            </div>

            <div  className='FooterMapPage'><Footer /></div>
        </>
=======
//                     <div className="card shadow-sm">
//                         <div className="card-body">
//                             <h2 className="card-title text-center">Customer Section</h2>
//                             <p className="text-center">
//                                 You are viewing the customer view.
//                             </p>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
        
//         // </>
// >>>>>>> master
    );
}

export default MapPages;
