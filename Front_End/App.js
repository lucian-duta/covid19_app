import React, { Component } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Covid_Form from "./AddCase"
import ShowCaseList from "./Displaycases.js"
import CaseCountForm from "./Countcases"
import DisplayCasesGTNum from "./Casesgte"
import OSinfoList from "./OSinfo"
import CaseDeleteForm from "./DeleteCase"
import Covid_UpDateForm from "./UpdateCase";
import DisplayTwentyCases from "./Display20Cases"
import {Navbar, Nav} from 'react-bootstrap';





class App extends Component {
  render() {
    
    return (
      <Router>
        <div className="container">
          <Navbar bg="dark" variant="light" expand="lg" className="justify-content-center">
            <h2 style = {{color:"white"}}> COVID-19  APP   </h2>
          </Navbar>

          <Navbar bg="dark" variant="dark" expand="lg">
  
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav>
                <Nav.Link><NavLink activeStyle = {{fontWeight: "bold"}}  exact to="/" className="navbar-brand">Add a Case</NavLink></Nav.Link>
                <Nav.Link><NavLink activeStyle = {{fontWeight: "bold"}} to="/DisplayCases" className="navbar-brand">Display All cases </NavLink></Nav.Link>
                <Nav.Link><NavLink activeStyle = {{fontWeight: "bold"}} to="/TwentyCases" className="navbar-brand">Search</NavLink></Nav.Link>
                <Nav.Link><NavLink activeStyle = {{fontWeight: "bold"}}  to="/CountCases" className ="navbar-brand">Count</NavLink></Nav.Link>
                <Nav.Link><NavLink activeStyle = {{fontWeight: "bold"}}  to="/DisplayGT" className="navbar-brand">States </NavLink></Nav.Link>
                <Nav.Link><NavLink activeStyle = {{fontWeight: "bold"}} to="/DeleteonC/S" className="navbar-brand">Delete</NavLink></Nav.Link>
                <Nav.Link><NavLink activeStyle = {{fontWeight: "bold"}} to="/UpdateCase" className="navbar-brand">Update</NavLink></Nav.Link>
                <Nav.Link><NavLink activeStyle = {{fontWeight: "bold"}}  to="/OSinfo" className="navbar-brand">OS INFO</NavLink></Nav.Link>
              </Nav>
            </Navbar.Collapse>
              
          </Navbar>
            <br/>
          <Route path="/" exact component={Covid_Form}/>
          <Route path="/DisplayCases" component={ShowCaseList} />
          <Route path ="/CountCases" component = {CaseCountForm}/>
          <Route path ="/DisplayGT" component ={DisplayCasesGTNum}/>
          <Route path ="/OSinfo" component ={OSinfoList}/>
          <Route path ="/DeleteonC/S" component ={CaseDeleteForm}/>
          <Route path ="/UpdateCase" component ={Covid_UpDateForm}/>
          <Route path ="/TwentyCases" component ={DisplayTwentyCases}/>

        </div>
      </Router>
    );
  }
}

export default App;