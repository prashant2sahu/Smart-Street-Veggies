import React, { useState } from 'react';
import Veggieform from './Veggieform';
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"

import {SaveVeggiesHere } from "../services/operations/authCall";
import {makeCartOnline} from  "../services/operations/cartApi"
const token = localStorage.getItem("token");


function Allveggie() {
        const [veggies,setVeggies]=useState([{veggiesName:"", rate:""}]);
        const dispatch=useDispatch();
        const navigate=useNavigate();

        function clickHandler(){
                setVeggies([...veggies,{veggiesName:"", rate:""}]);
        }

        function changeHandler(e,i){
        const {name,value}=e.target;
        // setVeggies(veggiesName,rate) 
        const newvalue=[...veggies];
        newvalue[i][name]=value;
        setVeggies(newvalue);
        }

        const deleteHandler=(i)=>{
            const deleted=[...veggies];
            deleted.splice(i,1);
            setVeggies(deleted);
        }
        function submitVeggies(val){
                // const veg=veggies[i];
                const {veggiesName,rate}=val;
                
                console.log("logging veggies",veggiesName,rate);

                dispatch(SaveVeggiesHere(veggiesName,rate,token,navigate));
        }
        function formSubmitHandler(){
                // return true;
                console.log('All the veggies has been fetched')
                console.log(veggies);
                console.log("token",token);
                dispatch(makeCartOnline(token,navigate));
                // dispatch(SaveVeggiesHere(veggies,token,navigate));
                
           
        }

    return (<div className="container my-5">
        <h1 className="text-center mb-4">Enter Your Cart Details</h1>
        {veggies.map((val, i) => (
          <div className="row mb-4" key={i}>
            <div className="col-md-5 mb-3">
              <label className="form-label">
                <h5>Enter Veggie Name</h5>
              </label>
              <input
                type="text"
                className="form-control"
                required
                placeholder="Tomato"
                onChange={(e) => changeHandler(e, i)}
                name="veggiesName"
                value={val.veggiesName}
              />
            </div>
      
            <div className="col-md-5 mb-3">
              <label className="form-label">
                <h5>Enter Market Rate of Veggie</h5>
              </label>
              <input
                type="number"
                className="form-control"
                required
                placeholder="45"
                onChange={(e) => changeHandler(e, i)}
                name="rate"
                value={val.rate}
              />
            </div>
      
            <div className="col-md-1 d-flex justify-content-start align-items-center mt-4">
              <button
                className="btn btn-danger me-2"
                onClick={() => deleteHandler(i)}
              >
                Delete
              </button>
              <button
                className="btn btn-success"
                onClick={() => submitVeggies(val)}
              >
                Add
              </button>
            </div>
          </div>
        ))}
      
        <div className="text-center mb-3">
          <button className="btn btn-primary" onClick={clickHandler}>
            Add More Veggies
          </button>
        </div>
      
        <div className="text-center">
          <h3>
            Make your cart <span className="text-primary cursor-pointer" onClick={formSubmitHandler}><b>onLine</b></span>
          </h3>
        </div>
      </div>
    )
}

export default Allveggie;