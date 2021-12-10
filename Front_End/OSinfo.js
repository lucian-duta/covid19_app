import React, { Component } from 'react';
import axios from 'axios';
import {ListGroup} from 'react-bootstrap';


const OSdata = props => (

    <ListGroup>
    
        <ListGroup.Item>Temporary Directory: {props.case.temporary_directory}</ListGroup.Item>
        <ListGroup.Item>Hostname: {props.case.hostname}</ListGroup.Item>
        <ListGroup.Item>Platform: {props.case.platform}</ListGroup.Item>
        <ListGroup.Item>Release: {props.case.release}</ListGroup.Item>
        <ListGroup.Item>Uptime: {props.case.uptime}</ListGroup.Item>
        <ListGroup.Item>Username: {props.case.username}</ListGroup.Item>
        <ListGroup.Item>Home Directory: {props.case.homedir}</ListGroup.Item>
        <ListGroup.Item>
            <ListGroup>
                Memory:
                <ListGroup.Item>Total Memory: {props.case.total_memory}</ListGroup.Item>
                <ListGroup.Item>Free Memory: {props.case.free_memory}</ListGroup.Item>

            </ListGroup>
        </ListGroup.Item>
        <ListGroup.Item>
            <ListGroup>
                <ListGroup.Item>CPU Model: {props.case.model}</ListGroup.Item>
                <ListGroup.Item>CPU Speed: {props.case.speed}</ListGroup.Item>
                <ListGroup.Item>CPU Cores: {props.case.cores}</ListGroup.Item>
                <ListGroup.Item>CPU Phisical Cores: {props.case.phisical_cores}</ListGroup.Item>
            </ListGroup>
        </ListGroup.Item>

        <ListGroup.Item>
            <ListGroup>Ethernet IPV4 Information:
                <ListGroup.Item>Address: {props.case.ethernet_ipv4_address}</ListGroup.Item>
                <ListGroup.Item>Net Mask: {props.case.ethernet_ipv4_netmask}</ListGroup.Item>
                <ListGroup.Item>MAC: {props.case.ethernet_ipv4_mac}</ListGroup.Item>
            </ListGroup>
            <br></br>
            <ListGroup>Ethernet IPV6 Information:
                <ListGroup.Item>Address: {props.case.ethernet_ipv6_address}</ListGroup.Item>
                <ListGroup.Item>Net Mask: {props.case.ethernet_ipv6_netmask}</ListGroup.Item>
                <ListGroup.Item>MAC: {props.case.ethernet_ipv6_mac}</ListGroup.Item>
            </ListGroup>
            {}
            {JSON.stringify(props.case.netinfo)}
            
        </ListGroup.Item>
    
    
    
    </ListGroup>
    
        
)

export default class OSinfoList extends Component {

    constructor(props) {
        super(props);
        this.state = {osinfo: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/osinfo/')
            .then(response => {
                console.log("response.data",response.data)
                this.setState({ osinfo: response.data });
                console.log("Received data",this.state.todos)
            })
            .catch(function (error){
                console.log("ERROR:"+error);
            })
    }

    Show_SYSInfo() {
        return this.state.osinfo.map(function(currentinfo, i){
            console.log("currentodo object-->"+currentinfo +"  i is "+i)
            return <OSdata case={currentinfo} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3 className = "alert alert-primary"><center>System Information</center></h3>
                <div>
                    { this.Show_SYSInfo() }
                </div>
            </div>
        )
    }
}