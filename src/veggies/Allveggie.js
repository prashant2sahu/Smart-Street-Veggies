// import React, { useState } from 'react';
// import Veggieform from './Veggieform';
// import {useDispatch} from "react-redux"
// import {useNavigate} from "react-router-dom"

// import {SaveVeggiesHere } from "../services/operations/authCall";
// import {makeCartOnline} from  "../services/operations/cartApi"
// const token = localStorage.getItem("token");


// function Allveggie() {
//         const [veggies,setVeggies]=useState([{veggiesName:"", rate:""}]);
//         const dispatch=useDispatch();
//         const navigate=useNavigate();

//         function clickHandler(){
//                 setVeggies([...veggies,{veggiesName:"", rate:""}]);
//         }

//         function changeHandler(e,i){
//         const {name,value}=e.target;
//         // setVeggies(veggiesName,rate) 
//         const newvalue=[...veggies];
//         newvalue[i][name]=value;
//         setVeggies(newvalue);
//         }

//         const deleteHandler=(i)=>{
//             const deleted=[...veggies];
//             deleted.splice(i,1);
//             setVeggies(deleted);
//         }
//         function submitVeggies(val){
//                 // const veg=veggies[i];
//                 const {veggiesName,rate}=val;
                
//                 console.log("logging veggies",veggiesName,rate);

//                 dispatch(SaveVeggiesHere(veggiesName,rate,token,navigate));
//         }
//         function formSubmitHandler(){
//                 // return true;
//                 console.log('All the veggies has been fetched')
//                 console.log(veggies);
//                 console.log("token",token);
//                 dispatch(makeCartOnline(token,navigate));
//                 // dispatch(SaveVeggiesHere(veggies,token,navigate));
                
           
//         }

//     return (
//     <div className="container my-5">
//         <h1 className="text-center mb-4">Enter Your Cart Details</h1>
//         {veggies.map((val, i) => (
//           <div className="row mb-4" key={i}>
//             <div className="col-md-5 mb-3">
//               <label className="form-label">
//                 <h5>Enter Veggie Name</h5>
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 required
//                 placeholder="Tomato"
//                 onChange={(e) => changeHandler(e, i)}
//                 name="veggiesName"
//                 value={val.veggiesName}
//               />
//             </div>
      
//             <div className="col-md-5 mb-3">
//               <label className="form-label">
//                 <h5>Enter Market Rate of Veggie</h5>
//               </label>
//               <input
//                 type="number"
//                 className="form-control"
//                 required
//                 placeholder="45"
//                 onChange={(e) => changeHandler(e, i)}
//                 name="rate"
//                 value={val.rate}
//               />
//             </div>
      
//             <div className="col-md-1 d-flex justify-content-start align-items-center mt-4">
//               <button
//                 className="btn btn-danger me-2"
//                 onClick={() => deleteHandler(i)}
//               >
//                 Delete
//               </button>
//               <button
//                 className="btn btn-success"
//                 onClick={() => submitVeggies(val)}
//               >
//                 Add
//               </button>
//             </div>
//           </div>
//         ))}
      
//         <div className="text-center mb-3">
//           <button className="btn btn-primary" onClick={clickHandler}>
//             Add More Veggies
//           </button>
//         </div>
      
//         <div className="text-center">
//           <h3>
//             Make your cart <span className="text-primary cursor-pointer" onClick={formSubmitHandler}><b>onLine</b></span>
//           </h3>
//         </div>
//       </div>
//     )
// }

// export default Allveggie;
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SaveVeggiesHere, FetchUserVeggies,DeleteVeggie } from "../services/operations/authCall";
import { makeCartOnline } from "../services/operations/cartApi";

const token = localStorage.getItem("token");

function Allveggie() {
  const [veggie, setVeggie] = useState({ veggiesName: "", rate: "" });
  const [veggiesList, setVeggiesList] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Load existing veggies data
  useEffect(() => {
    async function fetchUserData() {
      let response = await dispatch(FetchUserVeggies(token, navigate));
      if (response && response.length > 0) {
        setVeggiesList(response); // Store the fetched data in veggiesList
      }
    }
    fetchUserData();
  }, [dispatch, navigate]);

  // Handle input changes
  function changeHandler(e) {
    const { name, value } = e.target;
    setVeggie({ ...veggie, [name]: value });
  }

  // Add a new veggie to the list and automatically submit it
  function addVeggie() {
    if (veggie.veggiesName && veggie.rate) {
      const newVeggie = { ...veggie, submitted: true };
      setVeggiesList([...veggiesList, newVeggie]);
      setVeggie({ veggiesName: "", rate: "" }); // Clear the input

      // Call submitVeggies to immediately submit this new veggie
      submitVeggies(newVeggie, veggiesList.length);
    }
  }

  // Delete a veggie from the list
    const deleteHandler = async(veggieId,i) => {    
     if( await dispatch(DeleteVeggie(token,veggieId)))
     {   console.log(veggieId);
        const deleted=[...veggiesList];
         deleted.splice(i,1);
         setVeggiesList(deleted);
     }
    }

  // Submit each veggie item
  function submitVeggies(val, index) {
    const { veggiesName, rate } = val;
    dispatch(SaveVeggiesHere(veggiesName, rate, token, navigate));
    window.location.reload()
  }

  // Final cart submission
  function formSubmitHandler() {
    dispatch(makeCartOnline(token, navigate));
  }

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Enter Your Cart Details</h1>

      {/* Input fields for new veggies */}
      <div className="row mb-4">
        <div className="col-md-5 col-12 mb-3">
          <label className="form-label">
            <h5>Enter Veggie Name</h5>
          </label>
          <input
            type="text"
            className="form-control"
            required
            placeholder="Veggie Name"
            onChange={changeHandler}
            name="veggiesName"
            value={veggie.veggiesName}
          />
        </div>

        <div className="col-md-5 col-12 mb-3">
          <label className="form-label">
            <h5>Enter Market Rate of Veggie</h5>
          </label>
          <input
            type="number"
            className="form-control"
            required
            placeholder="Enter Rate"
            onChange={changeHandler}
            name="rate"
            value={veggie.rate}
          />
        </div>

        <div className="col-md-2 col-12 d-flex align-items-center mt-4">
          <button className="btn btn-success" onClick={addVeggie}>
            Add
          </button>
        </div>
      </div>

      {/* Display existing and new veggies */}
      <div className="veggie-list">
        {veggiesList.map((val, i) => (
          <div className="row mb-3" key={i}>
            <div className="col-md-5 col-6">
              <span><b>Veggie Name</b>: {val.veggiesName}</span>
            </div>
            <div className="col-md-5 col-4">
              <span>{val.rate ? `₹${val.rate}` : "No Rate"}</span>
            </div>
            <div className="col-md-1 col-2 d-flex justify-content-end">
              <button
                className="btn btn-danger"
                onClick={() => deleteHandler(val._id,i)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-3">
        <h3>
          Make your cart{" "}
          <span
            className="text-primary cursor-pointer"
            onClick={formSubmitHandler}
            style={{ cursor: "pointer" }}
          >
            <b>onLine</b>
          </span>
        </h3>
      </div>
    </div>
  );
}

export default Allveggie;
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// import { saveVeggieCart } from '../services/operations/cartApi';  // New API function to save the whole cart
// const token = localStorage.getItem('token');

// function Allveggie() {
//     const [veggies, setVeggies] = useState([{ veggiesName: '', rate: '' }]);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     function clickHandler() {
//         setVeggies([...veggies, { veggiesName: '', rate: '' }]);
//     }

//     function changeHandler(e, i) {
//         const { name, value } = e.target;
//         const updatedVeggies = [...veggies];
//         updatedVeggies[i][name] = value;
//         setVeggies(updatedVeggies);
//     }

//     const deleteHandler = (i) => {
//         const updatedVeggies = [...veggies];
//         updatedVeggies.splice(i, 1);
//         setVeggies(updatedVeggies);
//     };

//     function formSubmitHandler() {
//         console.log('Submitting all veggies:', veggies);

//         // Dispatching the action to save the entire cart in one go
//         dispatch(saveVeggieCart(veggies, token, navigate));
//     }

//     return (
//         <div className="container my-5">
//             <h1 className="text-center mb-4">Enter Your Cart Details</h1>
//             {veggies.map((val, i) => (
//                 <div className="row mb-4" key={i}>
//                     <div className="col-md-5 mb-3">
//                         <label className="form-label">
//                             <h5>Enter Veggie Name</h5>
//                         </label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             required
//                             placeholder="Tomato"
//                             onChange={(e) => changeHandler(e, i)}
//                             name="veggiesName"
//                             value={val.veggiesName}
//                         />
//                     </div>

//                     <div className="col-md-5 mb-3">
//                         <label className="form-label">
//                             <h5>Enter Market Rate of Veggie</h5>
//                         </label>
//                         <input
//                             type="number"
//                             className="form-control"
//                             required
//                             placeholder="45"
//                             onChange={(e) => changeHandler(e, i)}
//                             name="rate"
//                             value={val.rate}
//                         />
//                     </div>

//                     <div className="col-md-1 d-flex justify-content-start align-items-center mt-4">
//                         <button
//                             className="btn btn-danger me-2"
//                             onClick={() => deleteHandler(i)}
//                         >
//                             Delete
//                         </button>
//                     </div>
//                 </div>
//             ))}

//             <div className="text-center mb-3">
//                 <button className="btn btn-primary" onClick={clickHandler}>
//                     Add More Veggies
//                 </button>
//             </div>

//             <div className="text-center">
//                 <button className="btn btn-success" onClick={formSubmitHandler}>
//                     Submit Cart
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default Allveggie;
// >>>>>>> 8319f7e8bb78464687d182c4c83e89fed6ad2edd