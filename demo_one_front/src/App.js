import React, { Component } from 'react';
import './App.css';
import { Switch, Route} from "react-router-dom";
import SignIn from './Component/signIn';
import Navigation from './Component/navigation';
import SignUp from './Component/signUp'
import AccountInfo from './Component/accountInfo';
import Home from './Component/home';
import AddTodo from './Component/addTodo';
import MessageModal from './Modal/messageModal';
import ConfirmationModal from './Modal/confirmationModal';


class App extends Component{
  
  constructor(props){
    super(props);
    this.state = {
        loggedIn : localStorage.getItem("jwtToken") ? true : false,
        username : localStorage.getItem("jwtToken") 
                        ?  JSON.parse(atob(localStorage.getItem("jwtToken").split('.')[1])).sub 
                        :  "",
        showloggedOutModal: false,
        showMessageModal : false,
        modalMessage : "",
        showConfirmationModal : false,
        showWelcome : false
    }
  }
  getExpirationDate = (jwtToken)=> {
    const jwt = JSON.parse(atob(jwtToken.split('.')[1]));
    return jwt && jwt.exp && jwt.exp * 1000;
  };

  isExpired = () => {
      let jwtToken = localStorage.getItem("jwtToken");
      if(!jwtToken){
        return true;
      }
      let exp = this.getExpirationDate(jwtToken);
      if(Date.now() > exp){
        return true;
      }else
        return false;
  }

  onSignIn = () => {
    this.setState({loggedIn : true})
    this.setState({curr : "/home"})
    this.setState({username : JSON.parse(atob(localStorage.getItem("jwtToken").split('.')[1])).sub })
    this.setState({showWelcome : true})
    setTimeout(() => {this.setState({showWelcome : false}) }, 5000)
  }

  onLogOut = () => {
    localStorage.removeItem("jwtToken")
    this.setState({loggedIn : false})
    this.setState({showloggedOutModal:true})
    setTimeout(() =>{
        this.setState({showloggedOutModal : false})
    }, 5000)
  }

  makeMessageModal = (message) => {
    this.setState({
      showMessageModal : true,
      modalMessage : message
    })
    setTimeout( () =>{
        this.setState({
          showMessageModal : false
        })
    }, 5000 )
  }

  makeConfirmationModal = (message) => {
    this.setState({
      showConfirmationModal : true,
      modalMessage : message
    })
  }

  onCloseMessageModal = () => {
    this.setState({showMessageModal : false})
  }

  onCloseConfirmationModal = () => {
    this.setState({showConfirmationModal : false})
  }

  onConfirmConfirmationModal = () => {
    this.setState({showConfirmationModal : false})
    this.onLogOut()
  }

  render(){
    return (
      
      <div className="athelas">
        
        <Navigation 
            onLogOut={this.onLogOut} 
            isExpired={this.isExpired}
            loggedIn={this.state.loggedIn}
            makeConfirmationModal={this.makeConfirmationModal}
            messageModal={this.makeMessageModal}
        />

        {this.state.showWelcome ? 
            <div className="tc f3 green pa3">{`Welcome, ${this.state.username}`}</div>
            :
            <div/>
        }

        {this.state.showMessageModal ? 
                      
            <MessageModal 
                onCloseMessageModal={this.onCloseMessageModal}
                message = {this.state.modalMessage}
            /> 
            
            : 
            
            <div></div>
        }

        {this.state.showConfirmationModal ? 
                      
            <ConfirmationModal 
                onCloseConfirmationModal={this.onCloseConfirmationModal}
                onConfirmConfirmationModal={this.onConfirmConfirmationModal}
                message = {this.state.modalMessage}
            /> 
            
            : 
            
            <div></div>
        }

        <Switch>
          <Route path="/signUp" exact>
            <SignUp 
                loggedIn={this.state.loggedIn}
                messageModal={this.makeMessageModal}
            />
          </Route>

          <Route path="/home" exact>
            <Home 
                isExpired={this.isExpired} 
                loggedIn={this.state.loggedIn} 
                onLogOut={this.onLogOut} 
                username={this.state.username}
                messageModal={this.makeMessageModal}
            />
          </Route>

          <Route path="/addTodo" exact>
            <AddTodo 
                isExpired={this.isExpired} 
                loggedIn={this.state.loggedIn} 
                onLogOut={this.onLogOut} 
                username={this.state.username}
                messageModal={this.makeMessageModal}
            />
          </Route>

          <Route path="/user" exact>
            <AccountInfo 
                isExpired={this.isExpired} 
                loggedIn={this.state.loggedIn} 
                onLogOut={this.onLogOut} 
                username={this.state.username}
                messageModal={this.makeMessageModal}
            />
          </Route>

          <Route path="/signIn">
            <SignIn 
                showloggedOutModal={this.state.showloggedOutModal} 
                loggedIn={this.state.loggedIn} 
                onSignIn={this.onSignIn}
                messageModal={this.makeMessageModal}
            />
          </Route>  
          
        </Switch>

      </div>
    );
  }
}

export default App;
