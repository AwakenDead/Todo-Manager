import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class signUp extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            sign_username : "",
            sign_password : "",
            sign_name: "",
            sign_email : "",
            invalidName : false,
            invalidUsername : false,
            invalidPassword : false,
            invalidEmail : false,
            signup_success : false,
            username_available : true
        }
    }

    onChange = (event) => {
        var value = event.target.value
        var length = value.length
        
        switch(event.target.id){

            case "sign_name" : {
                if(length > 0){
                    if(value.match("^[a-zA-Z ]*$") != null){
                        this.setState({sign_name: value});
                        this.setState({invalidName : false})
                    }else{
                        this.setState({invalidName : true})
                    }
                }else{
                    this.setState({invalidName : false})
                }
                break
            }

            case "sign_username" : {
                this.setState({username_available : true})
                if(length > 0){
                    if(value.match("^[a-zA-Z_][a-zA-Z0-9_]*$") != null){
                        this.setState({sign_username: value});
                        this.setState({invalidUsername : false})
                    }else{
                        this.setState({invalidUsername : true})
                    }
                }else{
                    this.setState({invalidUsername : false})
                }
                break
            }

            case "sign_password" : {
                if(length > 0){
                    if(value.match("^[a-zA-Z]{8,}") != null){
                        this.setState({sign_password: value});
                        this.setState({invalidPassword : false})
                    }else{
                        this.setState({invalidPassword: true})
                    }
                }else{
                    this.setState({invalidPassword : false})
                }
                break
            }

            case "sign_email" : {
                const email = document.getElementById("sign_email");
                
                if (email.validity.typeMismatch) {
                    this.setState({invalidEmail : true})
                    email.setCustomValidity("");
                }else{
                    this.setState({invalidEmail : false})
                    this.setState({sign_email : value})
                }
                
                break
            }
            default : 
        }
    }

    onSubmit = (event) => {
        if(!this.state.invalidUsername && !this.state.invalidPassword
            && !this.state.invalidEmail && !this.state.invalidName){
        
            fetch(`/${this.state.sign_username}`, {
                method:"GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                  } else {
                    throw new Error();
                  }
            })
            .then(json => {
                if(json){
                    this.setState({username_available : true})
                    fetch("/signUp", {
                        method:"POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body:JSON.stringify({
                            "username": this.state.sign_username,
                            "password": this.state.sign_password,
                            "email_id" : this.state.sign_email,
                            "name" : this.state.sign_name,
                        })
                    })
                    .then(response => {
                        if(response.ok){
                            this.setState({signup_success : true})
                            this.props.messageModal("Sign Up Successful.")
                        }else{
                            throw new Error();
                        }
                    })
                    .catch((error) => {throw error})
                }else{
                    this.setState({username_available : false})
                }
            })
            .catch(error => {
                this.props.messageModal('Something went wrong');
            })
        }

        event.preventDefault();
    }

    render(){
        if(this.props.loggedIn){
            return <Redirect to="/home"/>
        }else
            if(this.state.signup_success){
                return <Redirect to="/signIn"/>
            }
        else{
            return (
                <main className="pa4 black-80">
                    <form className="measure center shadow-1 pa3" onSubmit={this.onSubmit}>
                        <fieldset className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0 tc">Sign Up</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f5" htmlFor="name">Name</label>
                                <input className="pa2 input-reset ba b--white shadow-1 bg-transparent hover-bg-black hover-white w-100" 
                                        type="text" name="sign_name"  id="sign_name" onChange={this.onChange} required maxLength={100}/>
                                {this.state.invalidName ?

                                    <div className="red f7 pa1 tc">Name must contain alphabets only</div>
                                    :
                                    <div/>
                                }
                            </div>

                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba b--white shadow-1 bg-transparent hover-bg-black hover-white w-100" 
                                        type="email" name="sign_email"  id="sign_email" onChange={this.onChange} required maxLength={200}/>
                                {this.state.invalidEmail ?

                                    <div className="red f7 pa1 tl">
                                        Enter valid Email.
                                    </div>
                                    :
                                    <div/>
                                }
                            </div>

                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="username">Username</label>
                                <input className="pa2 input-reset ba b--white shadow-1 bg-transparent hover-bg-black hover-white w-100" 
                                        type="text" name="sign_username"  id="sign_username" onChange={this.onChange} required maxLength={100}/>
                                {this.state.invalidUsername ?

                                    <div className="red f7 pa1 tl">
                                        Alphanumeric characters and underscore only.
                                        <br/>
                                        First character can't be a number.

                                    </div>
                                    :
                                    <div/>
                                }

                                {!this.state.username_available ?

                                    <div className="red f7 pa1 tl">
                                        USERNAME UNAVAILABLE
                                    </div>
                                :
                                    <div/>
                                }
                            
                            </div>
                    
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="pa2 input-reset ba b--white shadow-1 bg-transparent hover-bg-black hover-white w-100" 
                                        type="password" name="sign_password"  id="sign_password" onChange={this.onChange} required maxLength={40}/>
                                {this.state.invalidPassword ?

                                    <div className="red f7 pa1 tl">
                                        Permitted characters[A-Z, a-z, 0-9]
                                        <br/>
                                        Minimun length : 8
                                    </div>
                                    :
                                    <div/>
                                }
                            </div>
                            
                        </fieldset>
                        <div className="tc">
                            <input id="sign_up" className={`${this.state.dim} b ph3 pv2 input-reset ba b--silver shadow-1 bg-transparent blue b hover-bg-black pointer f6 dib`} type="submit" value="Sign up"/>
                        </div>
                    </form>
                </main>
            );
        }
    }
}
export default signUp