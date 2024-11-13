// import React from 'react';
// import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

// function AccountSettings() {
//   return (
//     <Container fluid style={{ maxWidth: '800px', marginTop: '20px' }}>
//       <h2 className="text-center">Account Settings</h2>
//       <Row>
//         {/* Profile Details Section */}
//         <Col xs={12} md={8}>
//           <Card className="p-4 mb-4">
//             <h4>Update Profile Details</h4>
//             <Form>
//               <Form.Group controlId="formName" className="mb-3">
//                 <Form.Label>Name</Form.Label>
//                 <Form.Control type="text" placeholder="Enter your name" />
//               </Form.Group>
//               <Form.Group controlId="formEmail" className="mb-3">
//                 <Form.Label>Email</Form.Label>
//                 <Form.Control type="email" placeholder="Enter your email" />
//               </Form.Group>
//               <Form.Group controlId="formMobile" className="mb-3">
//                 <Form.Label>Mobile Number</Form.Label>
//                 <div className="d-flex">
//                   <span className="border px-3 py-2">+91</span>
//                   <Form.Control type="text" placeholder="1234567890" />
//                 </div>
//               </Form.Group>
//               <Button variant="primary" type="submit" className="mt-2">
//                 Save
//               </Button>
//             </Form>
//           </Card>

//           {/* Delete Profile Section */}
//           <Card className="p-4">
//             <h4>Delete Profile</h4>
//             <Form.Check
//               type="checkbox"
//               label="I agree to delete my profile"
//               className="mb-2"
//             />
//             <p className="text-muted">
//               Please note that if you choose to delete your profile, your Greengrocer account would no longer exist. You would lose access to the resources provided.
//             </p>
//             <Button variant="danger">Delete</Button>
//           </Card>
//         </Col>

//         {/* Sidebar Section */}
//         <Col xs={12} md={4}>
//           <Card className="p-4 text-center mb-4">
//             {/* Replace Image with a Logo */}
//             <div className="mb-3">
//               <img
//                 src="https://via.placeholder.com/100" // Placeholder for logo
//                 alt="Logo"
//                 className="img-fluid rounded-circle"
//               />
//             </div>
//             <h5>Customer</h5>
//             <p>Hardik Dhakite</p>
//           </Card>
//           <Card className="p-2 mb-2 text-center">
//             <Button variant="link" className="text-decoration-none">Account Settings</Button>
//           </Card>
//           <Card className="p-2 mb-2 text-center">
//             <Button variant="link" className="text-decoration-none">My Wallet</Button>
//           </Card>
//           <Card className="p-2 mb-2 text-center">
//             <Button variant="link" className="text-decoration-none">Purchase History</Button>
//           </Card>
//           <Card className="p-2 text-center">
//             <Button variant="link" className="text-decoration-none">Notification</Button>
//           </Card>
//         </Col>
//       </Row>
//       <footer className="text-center mt-4">
//         <p>2024 © Smart Street Veggies</p>
//       </footer>
//     </Container>
//   );
// }

// export default AccountSettings;
import {React,useState} from 'react';
import { Container, Card ,Form ,Button} from 'react-bootstrap';
import {deleteUserAccount} from '../services/operations/authCall'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/operations/authCall';
import { toast } from 'react-hot-toast';
import { getFromLocalStorage } from '../services/operations/SecureLocal';
function AccountSetting() {
  let dispatch =useDispatch();
  let navigate =useNavigate();
  const handleLogout = () => {
    dispatch(logout(navigate));
    toast.success('Logged Out');
  };
  const [isAgreed, setIsAgreed] = useState(false);

    // Handle checkbox change
    const handleCheckboxChange = (event) => {
        alert("are you sure ??")
        setIsAgreed(event.target.checked);
    };

    // Delete button handler
    const handleDelete = () => {
        if (isAgreed) {
            // Your delete function here
            console.log("Profile deleted.");
            let data=getFromLocalStorage("userData")
            console.log("Profile deleted. ", data.email);
           if( deleteUserAccount(data.email)) 
            handleLogout();
          
        }
    };
  return (
   
    <Card className="p-4" style={{minHeight:"750px"}}>
       <h4 className="mb-3">Account Settings</h4>

<Form>
  {/* First Name Field */}
  <Form.Group controlId="firstName" className="mb-3">
    <Form.Label>First Name</Form.Label>
    <Form.Control type="text" placeholder="Enter first name" defaultValue="John" />
  </Form.Group>

  {/* Last Name Field */}
  <Form.Group controlId="lastName" className="mb-3">
    <Form.Label>Last Name</Form.Label>
    <Form.Control type="text" placeholder="Enter last name" defaultValue="Doe" />
  </Form.Group>

  {/* Email Field */}
  <Form.Group controlId="email" className="mb-2">
    <Form.Label>Email</Form.Label>
    <Form.Control type="email" placeholder="Enter email" defaultValue="example@example.com" />
  </Form.Group>

  {/* Submit Button */}
  <Button variant=" mb-3 w-100 fw-bold" style={{ background: "#2B4F61" ,color:"white" }}>submit</Button>
</Form>

        {/* Add additional fields or functionalities here */}

          <h4>Delete Profile</h4>
            <Form.Check
                type="checkbox"
                label="I agree to delete my profile"
                className="mb-2"
                checked={isAgreed}
                onChange={handleCheckboxChange}
            />
            <p className="text-muted">
                Please note that if you choose to delete your profile, your Greengrocer account will no longer exist, and you will lose access to the resources provided.
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

