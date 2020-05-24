import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class signIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            username : "",
            password : "",
            invalidCred : false
        }
    }
    
    onSignIn = (event) => {

        this.setState({invalidCred : false})
        fetch("/signIn", {
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                "username": this.state.username,
                "password": this.state.password
            })
        })
        .then(response => {
            if (response.status) {
                return response.json();
              } else {
                throw new Error();
              }
        })
        .then(json => {
            if(json.token){
                localStorage.setItem("jwtToken" , json.token)
                this.props.onSignIn()
            }else
                if(json.status === 404){
                    this.setState({invalidCred : true})
                }else{
                    if(json.status >= 500){
                        this.props.messageModal("Server Error.")
                    }
                }
        })
        .catch(error => {
            this.props.messageModal('Something went wrong');
        })
        event.preventDefault();
    }
    
    onUsernameChange = (e) => {
        this.setState({username : e.target.value})
    }

    onPasswordChange = (e) => {
        this.setState({password : e.target.value})
    }

    render(){
        if(this.props.loggedIn){
            return <Redirect to="/home"/>
        }else{
        
            return (
                <main className="pa4 black-80 ">
                    <form className="measure center shadow-1 pa3" onSubmit={this.onSignIn}>
                        
                        {this.props.showloggedOutModal ? 
                            <div className="f5 pa2 blue tc "> You have been logged out.</div>
                        : 
                            <div/>
                        }

                        <fieldset id="sign_in" className="ba b--transparent ph0 mh0 ">
                            <legend className="f4 fw6 mh0 pa2 tc">Sign In</legend>
                            
                            {this.state.invalidCred === true ? <div className="red pa1 tc"> Invalid username or password.</div> : <div></div>}
                            
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="username">Username</label>
                                <input className="pa2 input-reset ba b--white shadow-1 bg-transparent hover-bg-black hover-white w-100 " 
                                        type="text" name="username"  id="username" required={true} onChange={this.onUsernameChange} maxLength={100}/>
                                </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="pa2 input-reset ba b--white shadow-1 bg-transparent hover-bg-black hover-white w-100" 
                                        type="password" name="password"  id="password" required={true} onChange={this.onPasswordChange} maxLength={40}/>
                            </div>
                        </fieldset>
                        
                        <div className="tc">
                            <input className="b ph3 pv2 input-reset ba b--silver shadow-1 bg-transparent hover-bg-black blue b pointer f6 dib" type="submit" value="Sign in"/>
                        </div>
                    </form>
                </main>
            );
        }
    }
}
export default signIn