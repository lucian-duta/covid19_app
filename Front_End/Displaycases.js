import React, { Component } from 'react';
import axios from 'axios';

const CovidData = props => (
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

export default class ShowCaseList extends Component {

    constructor(props) {
        super(props);
        this.state = {cases: []};
    }
    
    componentDidMount() {
        axios.get('http://localhost:5000/allcases/')
            .then(response => {
                console.log("response.data",response.data)
                this.setState({ cases: response.data }); 
                console.log("Received data",this.state.todos)
            })
            .catch(function (error){
                console.log(error);
            })
    }

    Show_Cases() {
        return this.state.cases.map(function(currentcase, i){
            console.log("currentodo object-->"+currentcase +"  i is "+i)
            return <CovidData case={currentcase} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3 className = "alert alert-primary"><center>Display Cases</center></h3>
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
                        { this.Show_Cases() }
                    </tbody>
                </table>
            </div>
        )
    }
}