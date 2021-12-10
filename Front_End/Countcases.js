import React, {useEffect, useState} from "react";
import axios from 'axios';


const CovidCount = props => (
  
  <div>
    <h4>Cases:{props.case.cases}</h4>
    <h4>Deaths:{props.case.deaths}</h4>
  </div>
  
)

function CaseCountForm() {
  
  const [state, setState] = useState({
    county: "",
    state: "",
  });

  const [result, setResult] =useState({
    count:[{ _id: null, cases: null, deaths: null }]
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };
  
  useEffect(()=> {
  axios.get('http://localhost:5000/count/'+state.state+'/'+state.county)
    .then(res => {
        setResult({count:res.data})
        console.log(res.data)
    })
    .catch(err => {
      console.log("ERROR:" + err)
    })
  },[state]);

  const ShowCount=() => {
    return result.count.map(function(current, i){
      
      return <CovidCount case={current} key={i}/>;
    })
  }

  return (
    <div style={{marginTop: 10}}>
      <h3 className = "alert alert-primary"><center>Count Cases</center></h3>
      <form  method="GET">
      
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
        
        <div className="form-group col-md-3">

          <input type="submit" value="Reset" className="btn btn-primary" />

        </div>
     
      </form>

      <div>
         {ShowCount()}
      </div>

    </div>
    
    
  );
  
  
  }


export default CaseCountForm;


