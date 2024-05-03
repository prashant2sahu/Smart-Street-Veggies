import { useState } from "react";
import React from 'react';


function Veggieform() {

    const [veggie,setVeggie]=useState({
        veggiesName:"",
        rate :""
    })
    
    const changeHandler=(event)=>{
            
            setVeggie((prev)=>({
                ...prev,
                [event.target.name]:event.target.value
            }))
    }
    
    function OnsubmitChangeHandler(e){
            e.preventDefault();
            // console.log(veggie);
            return veggie;
    }

    return ( <div>
        <form onSubmit={OnsubmitChangeHandler} >
            <label>
                <h5>Enter Veggie Name</h5>
                <input type='text' placeholder='Tomato' onChange={changeHandler}
                        name='veggiesName' value={veggie.veggiesName}
                />
            </label>


            <label>
                <h5>Enter Market rate of respective veggie</h5>
                <input type='number' placeholder='45' onChange={changeHandler}
                        name='rate' value={veggie.rate} 
                />
            </label>

            <button type="submit"> Save</button>
        </form>
    </div> );
}

export default Veggieform;