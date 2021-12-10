import React, {useState } from "react";
import axios from 'axios';


const FoundCase = props => (

    <tr>
        <td>{props.case.date}</td>
        <td>{props.case.county}</td>
        <td>{props.case.state}</td>
        <td>{props.case.cases}</td>
        <td>{props.case.deaths}</td>
        <td>
            
        </td>
        <td>
            
        </td>
    </tr>
)

function DisplayTwentyCases(props) {

  const [state, setState] = useState({
    date: "",
    county: "",
    state: "",
    cases:"",
    deaths: "",
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

 const ShowFoundCases=() => {
    if(result !== null)
    return result.count.map(function(current, i){
      
        return <FoundCase case={current} key={i}/>;
    })
 }

  const OnSubmit=(e) =>
   {
   
    e.preventDefault();
    const covid_data={
        date:state.date,
        state:state.state,
    }
    axios.post("http://localhost:5000/twentycases", covid_data)
    .then(res => {console.log(res.data)
        if(res.data !== null){
            setResult({count:res.data})
        }else{
            alert("DOCUMENT NOT FOUND");
        }
    })
    .catch(err => {
      console.log("ERROR: " + err)
    });
   }

  return (
    <div style={{marginTop: 10}}>
      <h3> Display first 20 cases based on:</h3>
      <form onSubmit={OnSubmit} method="Get">
        <h3 className = "alert alert-primary"><center>Search</center></h3>

        <div className="form-group col-md-2"> 
            <label>Date: </label>
            <input  className="form-control"
            type="text" name="date" placeholder = "25/02/2020"
            value={state.date}
            onChange={handleChange}/>
            </div>

        <div className="form-group col-md-3">
            <label>State: </label>
            <input  className="form-control "
            placeholder = "California"
            name="state" value={state.state}
            onChange={handleChange}/>
        </div>

        <div className="form-group">
            <input type="submit" value="Search" className="btn btn-primary" />
        </div> 

      </form>
      <h3 className = "alert alert-primary"><center>Found Documents</center></h3>

      <div>
            <table className="table table-striped" class="table table-hover"style={{ marginTop: 20 }} >
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>County</th>
                        <th>State</th>
                        <th>Cases</th>
                        <th>Deaths</th>   
                    </tr>
                </thead>
                <tbody>
                    {ShowFoundCases()}
                </tbody>
            </table>
        </div>
    </div>
    
  );
}

export default DisplayTwentyCases;
