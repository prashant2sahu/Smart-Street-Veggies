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

    return ( <div className='allVeggie'>
        {/* <form> */}
        <h1 >Enter Your Cart Details</h1>
            {
            veggies.map((val,i)=>
        <div className='allVeggie1' key={i}>
        <label>
                <h5>Enter Veggie Name</h5>
                <input type='text' required={true} placeholder='Tomato' onChange={(e)=>changeHandler(e,i)}
                        name='veggiesName' value={val.veggiesName}
                />
            </label>


            <label>
                <h5>Enter Market rate of respective veggie</h5>
                <input type='number' required={true} placeholder='45' onChange={(e)=>changeHandler(e,i)}
                        name='rate' value={val.rate} 
                />
            </label>
                
            <button onClick={()=>deleteHandler(i)} >Delete</button>
            <button onClick={()=>submitVeggies(val)}>Add this</button>

        </div> )}
        <button onClick={clickHandler}>Add More Veggies</button>

         <h3>Make your cart <span className='cursor-pointer' onClick={formSubmitHandler}><b>onLine</b></span></h3>       
         {/* </form> */}
        </div> );
}

export default Allveggie;