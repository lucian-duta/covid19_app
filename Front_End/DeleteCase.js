import React, {useState} from "react";
import axios from 'axios';

function CaseDeleteForm()
{   
    const [state, setState] = useState({
        county: "",
        state: "",
        success:5

    });

    const handleChange = (e) => {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value,
        });
    };

    const OnSubmit=() =>
    {
        axios.post('http://localhost:5000/DeleteCases/'+state.state+'/'+state.county)
        .then(res => {
        console.log(res.data)
        setState({success:res.data})
        })
        .catch(err => {
        console.log("error has occured" + err)
        }) 
    }

    const success = () => {
        
        if(state.success === 1){
            alert("DOCUMENT SUCCESFULLY DELETED");
            state.success= (state.success+10);
        }else if(state.success === 0){
            alert("DOCUMENT NOT FOUND");
            state.success= (state.success+10);
        }
    }
    
    return (
        <div className = "container-fluid" style={{marginTop: 10}}>
            <h3 className = "alert alert-primary">Delete a document for a given state and county</h3>
            <form onSubmit={OnSubmit} >
            
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

                    <input type="submit" value="Delete Case" className="btn btn-primary" />

                </div>
                        
            </form>
                {success()}
      
        </div>
        
        )
}
export default CaseDeleteForm;