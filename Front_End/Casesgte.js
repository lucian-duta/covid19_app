import React, { useState} from "react";
import axios from 'axios';

const CovidCount = props => (
  
  <tr>
    <td>{props.case.state}</td>
    <td>{props.case.date}</td>
    <td>{props.case.cases}</td>
    <td>
        
    </td>
    <td>
        
    </td>
  </tr>
  
)

function DisplayCasesGTNum() {
  
  const [state, setState] = useState({
    casesr: "",
  });

  const [result, setResult] =useState({
    count:[]
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };
  
  const ShowCount=() => {
    return result.count.map(function(current, i){
      
      return <CovidCount case={current} key={i}/>;
    })
   };

  const OnSubmit=(e) =>
   {
    e.preventDefault();
    axios.post('http://localhost:5000/casesgte/'+state.casesr)
    .then(res => {
        setResult({count:res.data})
        console.log(res.data)
    })
    .catch(err => {
      console.log("ERROR:" + err)
    })
   };
  return (
    <div style={{marginTop: 10}}>
      <h3 className = "alert alert-primary">
        <center>Display the states where cases in a single day are more than the value</center>
      </h3>
      <form onSubmit={OnSubmit} method="GET">

        <div className="form-group col-md-2">
          <label>Cases: </label>
          <input type = "number" className="form-control"
          placeholder = "10"
          name="casesr" value={state.casesr}
          onChange={handleChange}/>
        </div>
        
        <div className="form-group col-md-3">
          <input type="submit" value="Search" className="btn btn-primary"/>
        </div>
      </form>

      <div>
        <h3 className = "alert alert-primary"><center>Found Information</center></h3>
        <table className="table table-striped" class="table table-hover"style={{ marginTop: 20 }} >
          <thead>
            <tr>
              <th>State</th>
              <th>Date</th>
              <th>Cases</th>
            </tr>
          </thead>
          <tbody>
            {ShowCount()}
          </tbody>
        </table>
      </div>
    </div>
    
    
  );
  
  
  }


export default DisplayCasesGTNum;


