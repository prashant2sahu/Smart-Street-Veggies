import { Route, Routes } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "animate.css"
// import "./App.css";
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import {  useState } from 'react'
import MapDisplay from "./maps/MapDisplay";
// import Veggieform from "./veggies/Veggieform";
import Allveggie from "./veggies/Allveggie";
import VerifyEmail from "./pages/VerifyEmail"
import ForgotPassword from "./components/ForgotPassword";
import { Navigate } from "react-router-dom";
import NotFoundPage from "./components/PageNotFound";
import ResetPassword from "./components/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import { getFromLocalStorage } from "./services/operations/SecureLocal";
// <<<<<<< master
import Landing from "./components/Landing";
// =======
import MapPages from "./maps/MapPage";
// >>>>>>> master
// import ResetPassword from "./components/resetPassword";
// function App() {


//     {/* <MapDisplay/> */}
//       {/* <Veggieform/> */}
//       {/* <Allveggie/> */}
//  const [isLoggedIn, setIsLoggedIn] = useState(false);


//   return (
//     <div>
//       <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>




//       <Routes>

//         <Route path="/" element= {<Home/>} />
//         <Route path="/login" element = {<Login  setIsLoggedIn={setIsLoggedIn} />} />
//         <Route path="/signup" element={<Signup  setIsLoggedIn={setIsLoggedIn} />} />
//         <Route path="/dashboard" element = {<Dashboard/>} />
//         <Route path="/forgot" element = {<ForgotPassword/>} />
//    <Route path='/resetPassword' element ={<ResetPassword/>}/>

//         <Route path="/verify-email" element={ <VerifyEmail/>} />
//         <Route path="/addVeggie" element={ <Allveggie/>} />
//         <Route path="/map-display" element={ <MapDisplay/>} />


//         <Route path="*" element={<NotFoundPage />} />

//       </Routes>

//     </div>
//     )
// }
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let res = localStorage.getItem('accountType')
  res = JSON.parse(res)
  console.log(res, "has");
  let check=false;
  if(getFromLocalStorage("isLoggedIn")){
check=true;
  console.log(check,"logged in");
  }
  var rs=false;
 rs=getFromLocalStorage('hasVisitedForgot');
console.log(rs);
  return (
    <div>

      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
{/* <<<<<<< HEAD
======= */}
{/* // <<<<<<< master */}
{/* >>>>>>> b1a9d8163105ac8f79b298843e232b516a7552aa */}
        <Route path="/contact" element={<Home />} />
        <Route path="/home" element={<Landing />} />
        <Route path="/" element={<Landing />} />




{/* <<<<<<< HEAD */}
        {/* <Route path="/" element={<Home />} /> */}
         {/* <Route path="/contact" element={<Home />} /> */}
         <Route path="/map-page" element={< MapPages/>}/>

{/* ======= */}
{/* ======= */}
        {/* <Route path="/" element={<Home />} /> */}
// <<<<<<< master
//         <Route path="/contact" element={<Home />} />
//         <Route path="/map-page" element={<ProtectedRoute isLoggedIn={isLoggedIn}>
              <MapPages />
            </ProtectedRoute>}/>
// =======
{/* //         <Route path="/contact" element={<Home />} />
//         <Route path="/map-page" element={< MapPages/>}/> */}
// >>>>>>> master
{/* // >>>>>>> master */}
{/* >>>>>>> b1a9d8163105ac8f79b298843e232b516a7552aa */}
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        {/* <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} /> */}
        <Route
  path="/signup"
  element={
    !check ? (
      <Signup setIsLoggedIn={setIsLoggedIn} />
    ) : (
      <Navigate to="/dashboard" replace />
    )
  }
/>
<Route
  path="/verify-email"
  element={
    !check ? (
      <VerifyEmail />
    ) : (
      <Navigate to="/dashboard" replace />
    )
  }
/>
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addVeggie"
          element={
            res === 'Customer' ? (
              <Navigate to="/" />
            ) : (
              res === 'CartMan' ? (
                <ProtectedRoute>
                  <Allveggie />
                </ProtectedRoute>
              ) : (
                <Navigate to="/login" />
              )
            )
          }
        />

        <Route
          path="/map-display"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <MapDisplay />
            </ProtectedRoute>
          }
        />

        <Route path="/forgot" element={
            <ForgotPassword />
        } />
        <Route
          path="/resetPassword"
          element={
          
              rs == true ? (
                <ResetPassword />
              ) : (
                <Navigate to="/forgot" />
              )
           
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
export default App;
