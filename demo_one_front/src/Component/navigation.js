import React, { Component } from 'react';
import {
    Link
  } from "react-router-dom";

export default class Navigation extends Component{

    confirmationModal = () => {
        if(this.props.isExpired()){
            this.props.messageModal("Session Expired !!")
            this.props.onLogOut();
        }else{
            this.props.makeConfirmationModal("Are you sure you want to log out ??")
        }
    }

    render(){
        return(
            <div className="bg-black">
                <nav className="tc pa2">
                    <span className="white no-underline pa3 f2">
                        TODO MANAGER
                    </span>
                </nav>

                <div>
                    <div className="tc pa3 bb bg-black b--white-2">
                    {this.props.loggedIn ?
                        <div>
                            <Link className="link silver f4 dib mr3 hover-white" to="/home" title="Home">Home</Link>
                            <span className="silver f4 dib mr3">|</span>
                            <Link className="link silver f4 dib mr3 hover-white" to="/addTodo" title="Home">Add Todo</Link>
                            <span className="silver f4 dib mr3">|</span>
                            <Link className="link silver f4 dib mr3 hover-white" to="/user" title="user">My Account</Link>
                            <span className="silver f4 dib mr3">|</span>
                            <button id="logout" className="link f4 dib mr3 hover-white bg-black b--black red pointer" onClick={this.confirmationModal}>
                                Logout
                            </button>
                        </div>
                    :
                        <div>
                            <Link className="link silver f4 dib mr3 hover-white" to="/signIn" title="signIn">SignIn</Link>
                            <span className="silver f4 dib mr3">|</span>
                            <Link className="link silver f4 dib mr3 hover-white" to="/signUp" title="signUp">SignUp</Link>
                        </div>
                    }
                    </div>
                </div>
            </div>
        );
    }
}