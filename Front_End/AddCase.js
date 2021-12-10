import React, { useState } from "react";
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function Covid_Form() {
  let url= "http://localhost:5000/" 
  const [state, setState] = useState({
    date: "",
    county: "",
    state: "",
    cases:"",
    deaths: "",
  });
  
  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const handleClickAdd = () =>{
    console.log("added")
    
    axios.post(url+"addcovid", covid_data)
    .then(res => {console.log(res.data)})
    .catch(err => {console.log("ERROR:" + err)});
    alert("INFORMATION ADDED TO THE DATABASE");
  };
  
  const covid_data={
    date:state.date,
    county:state.county,
    state:state.state,
    cases:state.cases,
    deaths:state.deaths
}

  const OnSubmit=(e) =>
  {
    
   e.preventDefault();
   
   confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className='jumbotron'>
          <h1 className='display-4'>Are you sure?</h1>
          <p className='lead'>You are about to add a new record in the COVID-19 database !</p>
          <p className='my-4'>You want to add this record?</p>
          <button style={{"marginRight": 15}} className="btn btn-danger" onClick={onClose}>No</button>
          <button
            onClick={() => {
              handleClickAdd();
              onClose();
            }} className="btn btn-success">
            Yes, add it!
          </button>
          <div className='list-group'>
          <h3 className = 'alert alert-primary'>INFORMATION ENTERED:</h3>
          <h5 className='list-group-item'>Date: {state.date}</h5>

            <h5 className='list-group-item'>County: {state.county}</h5>

            <h5 className='list-group-item'>State: {state.state}</h5>

            <h5 className='list-group-item'>Number of cases: {state.cases} </h5>

            <h5 className='list-group-item'>Number of Deaths: {state.deaths}</h5>
        </div>
        </div>
       
      );
        
      }
    })
    
  
  }
  return (
    <div className = "container-fluid" style={{marginTop: 10}}>
      <h3 className = "alert alert-primary"><center>Add new cases</center></h3>
      <form onSubmit={OnSubmit} method="Post">

        <div className="form-group col-md-2"> 
          <label>Date: </label>
          <input  className="form-control"
            type="text" name="date" placeholder = "25/02/2020"
            value={state.date}
            onChange={handleChange}/>
        </div>
      
        <div className="form-group col-md-3">
          <label>County: </label>
          <input  className="form-control"
          placeholder = "Los Angeles"
            name="county" value={state.county}
            onChange={handleChange}/>
        </div>

        <div className="form-group col-md-3">
          <label>State: </label>
          <input  className="form-control "
            placeholder = "California"
            name="state" value={state.state}
            onChange={handleChange}/>
        </div>

        <div className="form-group col-md-2">
          <label>Cases: </label>
          <input type = "number" className="form-control"
          placeholder = "10"
          name="cases" value={state.cases}
          onChange={handleChange}/>
        </div>

        <div className="form-group col-md-2">
          <label>Deaths: </label>
          <input type = "number" className="form-control"
          placeholder = "1"
          name="deaths" value={state.deaths}
          onChange={handleChange}/>
        </div>
        
        <div className="form-group col-md-3">

            <input type="submit" value="Add case" className="btn btn-primary" />

        </div>
                
      </form>
      
    </div>
  );


 
}

export default Covid_Form;