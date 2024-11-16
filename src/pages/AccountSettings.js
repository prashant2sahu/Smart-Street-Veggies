import { React, useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { deleteUserAccount } from '../services/operations/authCall';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/operations/authCall';
import { toast } from 'react-hot-toast';
import { getFromLocalStorage, saveToLocalStorage ,updateLocalStorageData} from '../services/operations/SecureLocal';
import  {updateUserDetails} from '../services/operations/authCall';

function AccountSetting() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
    let userData=getFromLocalStorage("userData")
    console.log(userData.email);
  // State for user details
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName:'' ,
    email: userData.email,
    number:0,
  });

  // State for delete confirmation
  const [isAgreed, setIsAgreed] = useState(false);

  // Handle logout
  const handleLogout = () => {
    dispatch(logout(navigate));
    toast.success('Logged Out');
  };

  // Handle checkbox change for delete confirmation
  const handleCheckboxChange = (event) => {
    alert('Are you sure?');
    setIsAgreed(event.target.checked);
  };

  // Handle delete
  const handleDelete = () => {
    if (isAgreed) {
      let data = getFromLocalStorage('userData');
      console.log('Profile deleted. ', data.email);
      if (deleteUserAccount(data.email)) handleLogout();
    }
  };

  // Handle input changes for user details
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle update button click
  const handleUpdate = () => {
    console.log('Updated details:', userDetails);
    // Call an API or function to update user details
    const success = updateUserDetails(userDetails); // Replace this with your API call
    const updatedDetails = {
      firstName: userDetails.firstName,
      LastName: userDetails.lastName,
      number:userDetails.number
  };
   updateLocalStorageData("userData",updatedDetails)

    if (success) {
      alert("pls refresh the page")
      toast.success('Profile updated successfully!');
    } else {
      toast.error('Failed to update profile.');
    }
  };

  return (
    <Card className="p-4" style={{ minHeight: '750px' }}>
      <h4 className="mb-3">Account Settings</h4>

      <Form>
        {/* First Name Field */}
        <Form.Group controlId="firstName" className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            name="firstName"
            value={userDetails.firstName}
            onChange={handleInputChange}
          />
        </Form.Group>

        {/* Last Name Field */}
        <Form.Group controlId="lastName" className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            name="lastName"
            value={userDetails.lastName}
            onChange={handleInputChange}
          />
        </Form.Group>

        {/* Email Field */}
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Number</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter number"
            name="number"
            maxLength={10}
            minLength={10}
            
            onChange={handleInputChange}
          />
        </Form.Group>

        {/* Update Button */}
        <Button
          variant="primary"
          className="mb-3 w-100 fw-bold"
          style={{ background: '#2B4F61', color: 'white' }}
          onClick={handleUpdate}
        >
          Update Details
        </Button>
      </Form>

      <h4>Delete Profile</h4>
      <Form.Check
        type="checkbox"
        label="I agree to delete my profile"
        className="mb-2"
        checked={isAgreed}
        onChange={handleCheckboxChange}
      />
      <p className="text-muted">
        Please note that if you choose to delete your profile, your account will no longer exist, and you will lose
        access to the resources provided.
      </p>
      <Button
        variant="danger"
        onClick={handleDelete}
        disabled={!isAgreed} // Disable button if checkbox is unchecked
      >
        Delete
      </Button>
    </Card>
  );
}

export default AccountSetting;




// import {React,useState} from 'react';
// import { Container, Card ,Form ,Button} from 'react-bootstrap';
// import {deleteUserAccount} from '../services/operations/authCall'
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { logout } from '../services/operations/authCall';
// import { toast } from 'react-hot-toast';
// import { getFromLocalStorage } from '../services/operations/SecureLocal';
// function AccountSetting() {
//   let dispatch =useDispatch();
//   let navigate =useNavigate();
//   const handleLogout = () => {
//     dispatch(logout(navigate));
//     toast.success('Logged Out');
//   };
//   const [isAgreed, setIsAgreed] = useState(false);

//     // Handle checkbox change
//     const handleCheckboxChange = (event) => {
//         alert("are you sure ??")
//         setIsAgreed(event.target.checked);
//     };

//     // Delete button handler
//     const handleDelete = () => {
//         if (isAgreed) {
//             // Your delete function here
//             console.log("Profile deleted.");
//             let data=getFromLocalStorage("userData")
//             console.log("Profile deleted. ", data.email);
//            if( deleteUserAccount(data.email)) 
//             handleLogout();
          
//         }
//     };
//   return (
   
//     <Card className="p-4" style={{minHeight:"750px"}}>
//        <h4 className="mb-3">Account Settings</h4>

// <Form>
//   {/* First Name Field */}
//   <Form.Group controlId="firstName" className="mb-3">
//     <Form.Label>First Name</Form.Label>
//     <Form.Control type="text" placeholder="Enter first name" defaultValue="John" />
//   </Form.Group>

//   {/* Last Name Field */}
//   <Form.Group controlId="lastName" className="mb-3">
//     <Form.Label>Last Name</Form.Label>
//     <Form.Control type="text" placeholder="Enter last name" defaultValue="Doe" />
//   </Form.Group>

//   {/* Email Field */}
//   <Form.Group controlId="email" className="mb-2">
//     <Form.Label>Email</Form.Label>
//     <Form.Control type="email" placeholder="Enter email" defaultValue="example@example.com" />
//   </Form.Group>

//   {/* Submit Button */}
//   <Button variant=" mb-3 w-100 fw-bold" style={{ background: "#2B4F61" ,color:"white" }}>submit</Button>
// </Form>

//         {/* Add additional fields or functionalities here */}

//           <h4>Delete Profile</h4>
//             <Form.Check
//                 type="checkbox"
//                 label="I agree to delete my profile"
//                 className="mb-2"
//                 checked={isAgreed}
//                 onChange={handleCheckboxChange}
//             />
//             <p className="text-muted">
//                 Please note that if you choose to delete your profile, your Greengrocer account will no longer exist, and you will lose access to the resources provided.
//             </p>
//             <Button
//                 variant="danger"
//                 onClick={handleDelete}
//                 disabled={!isAgreed} // Disable button if checkbox is unchecked
//             >
//                 Delete
//             </Button>
//         </Card>
//   );
// }

// export default AccountSetting;