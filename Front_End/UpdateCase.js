import React, {useState } from "react";
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';

const OldCase = props => (

  <div>
    {confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className='jumbotron'>
          <h1 className='display-4'>Updated</h1>
          <p className='lead'>You updated the following document</p>
          <div className='list-group'>
            <h3 className = 'alert alert-primary'>THE OLD DOCUMENT:</h3>

            <h5 className='list-group-item'>Date: {props.case.date}</h5>

            <h5 className='list-group-item'>County: {props.case.county}</h5>

            <h5 className='list-group-item'>State: {props.case.state}</h5>

            <h5 className='list-group-item'>Number of cases: {props.case.cases} </h5>

            <h5 className='list-group-item'>Number of Deaths: {props.case.deaths}</h5>
        </div>
        <button style={{"marginTop":20}} className="btn btn-success" onClick={onClose}>OK</button>
        </div>
       
      );
        
      }
    })}
</div>

)

function Covid_UpDateForm(props) {

  const [state, setState] = useState({
    date: "",
    county: "",
    state: "",
    cases:"",
    deaths: "",
  });

  const [result, setResult] =useState(null);

  const handleChange = (e) => {
    setResult(null)
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

 const ShowOldCase=() => {

    if(result !== null)
    return (<OldCase case={result}/>);
 }

  const OnSubmit=(e) =>
   {
   
    e.preventDefault();
    const covid_data={
      date:state.date,
      county:state.county,
      state:state.state,
      cases:state.cases,
      deaths:state.deaths

    }
    axios.post("http://localhost:5000/updatecase", covid_data)
    .then(res => {console.log(res.data)
        if(res.data !== null){
            alert("DOCUMENT SUCCESFULLY UPDATED");
            setResult(res.data)
        }else{
            alert("DOCUMENT NOT FOUND");
        }
        setResult(res.data)
    })
    .catch(err => {
      console.log("ERROR: " + err)
    });
   }

  return (
    <div style={{marginTop: 10}}>
      <form onSubmit={OnSubmit} method="Post">
        <h3 className = "alert alert-primary"><center>The case you want to change</center></h3>
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

        <h3 className = "alert alert-primary"><center>New Info</center></h3>

        <div className="form-group col-md-2"> 
          <label>Date: </label>
          <input  className="form-control"
          type="text" name="date" placeholder = "25/02/2020"
          value={state.date}
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
      
        <center>
          <div className="form-group">
            <input type="submit" value="Update" className="btn btn-primary" />
          </div>
        </center>
                
      </form>
      {ShowOldCase()}
    </div>
    
  );
}

export default Covid_UpDateForm;
