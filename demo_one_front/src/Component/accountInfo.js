import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loader from 'react-loader';

export default class accountInfo extends Component{
    constructor(){
        super();
        this.state = {
            infoName : "",
            infoUsername : "",
            infoEmail : "",
            loaded : false
        }
    }
    componentDidMount(){
        if(this.props.isExpired()){
            
            this.props.messageModal("Session Expired !!")
            this.props.onLogOut();
        }else{
            fetch(`/user/${this.props.username}`, {
                method:"GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem("jwtToken")}`
                }
            })
            .then(response => {
                this.setState({loaded : true})
                if (response.ok) {
                    return response.json();
                  } else {
                    throw new Error();
                  }
            })
            .then(json => {
                this.setState({
                    infoName : json.name,
                    infoUsername : json.username,
                    infoEmail : json.email_id
                })
            })
            .catch(error => {
                this.props.messageModal('Something went wrong')
                setTimeout(() => {
                    this.setState({loaded : true})
                }, 2000)
            })

        }
        
    }
    
    render(){
        if(!this.props.loggedIn){
            return <Redirect to="/signIn" />
        }else
            if(!this.state.loaded){
                return <div style={{padding:"400px"}}>
                    <Loader loaded={this.state.loaded}></Loader>
                </div>
            }else{
                return(
                    <main className="pa4 black-80 ">
                        <div className="measure center shadow-1 pa3">
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="username">Name : </label>
                                <input className="pa2 input-reset ba b--white shadow-1 bg-near-white w-100 " 
                                        type="text" name="infoName" id="infoName" value={this.state.infoName} readOnly/>
                            </div>

                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="username">Username : </label>
                                <input className="pa2 input-reset ba b--white shadow-1 bg-near-white  w-100 " 
                                        type="text" name="infoUsername"  id="infoUsername" value={this.state.infoUsername} readOnly/>
                            </div>

                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="username">Email : </label>
                                <input className="pa2 input-reset ba b--white shadow-1 bg-near-white w-100 " 
                                        type="email" name="infoEmail"  id="infoEmail" value={this.state.infoEmail} readOnly/>
                            </div>
                        </div>
                    </main>

                );
            }
    }
}
