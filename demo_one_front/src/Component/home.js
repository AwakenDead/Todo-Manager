import React, {Component} from'react';
import Todo from './todo';
import EditModal from '../Modal/editTodoModal';
import { Redirect } from 'react-router-dom';
import Loader from 'react-loader';

export default class Home extends Component{

  constructor(props){
    super(props)
    this.state = {
        showEditModal: false,
        id : -1,
        todos : [],
        loaded : false
    }
  }

  componentDidMount(){
    if(this.props.isExpired()){
        
      this.props.messageModal("Session Expired !!")
      this.props.onLogOut();
    }else{
        var username = JSON.parse(atob(localStorage.getItem("jwtToken").split('.')[1])).sub
        fetch(`/user/${username}`, {
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
            this.setState({todos : json.todos})
        })
        .catch(error => {
            this.props.messageModal('Something went wrong');
        })
        
    }
  }

  compareTodo(a, b){
    var dateA = new Date(a.date + "T" + a.time).getTime();
    var dateB = new Date(b.date + "T" + b.time).getTime();

    if(dateA < dateB){
        return (a.done === false) ? -1 : (b.done === false) ? 1 : 0 ;
    }else
        if(dateB < dateA){
            return (b.done === false) ? 1 : (a.done === false) ? -1 : 0 ;
        }
    return (a.done === false) ? -1 : (b.done === false) ? 1 : 0 ;
  }

  onEdit = (e) => {
    var id = e.target.value
    this.setState({id : id, showEditModal : true})
  }

  onModalClose = () => {
    this.setState({showEditModal : false})
    this.componentDidMount();
  }

  onDelete = (event) => {
    if(this.props.isExpired()){
        
      this.props.messageModal("Session Expired !!")
      this.props.onLogOut();
    }else{
        var id = event.target.value
        fetch(`/deleteTodo/${id}`, {
            method:"DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
        .then(response => {
            if(response.ok){
              this.props.messageModal("Todo deleted successsfully")
            }else{
              throw new Error()
            }
            this.componentDidMount()
        })
        .catch(error => {
            this.props.messageModal('Something went wrong');
        })
    }
  }

  onComplete = (event) => {
    if(this.props.isExpired()){
      this.props.messageModal("Session Expired !!")
      this.props.onLogOut();
    }else{
        var id = event.target.value
        fetch(`/markTodo/${id}`, {
            method:"PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
        .then(response => {
            if(response.ok){
              this.props.messageModal("Todo marked as completed")
            }else{
              throw new Error();
            }
            this.componentDidMount()
        })
        .catch(error => {
            this.props.messageModal('Something went wrong');
        })  
    }
  }

  render(){
    if(!this.props.loggedIn){
      return <Redirect to="/signIn"/>
    }else
      if(!this.state.loaded){
          return( 
            <div style={{padding:"400px"}}>
                <Loader loaded={this.state.loaded}></Loader>
            </div>
          );
      }else{

          if(this.state.todos === undefined || this.state.todos.length === 0){
            return <div className="tc pa3 f4"> Nothing here. Add todos.</div>
          }else{
              
              this.state.todos.sort(this.compareTodo);
              const todoArray = this.state.todos.map((row, i) => {
                return (
                    <Todo 
                        key={i} 
                        index={i} 
                        todoObject={row} 
                        onEdit={this.onEdit} 
                        onDelete={this.onDelete}
                        onComplete={this.onComplete}    
                    />
                );
              });
              return(
                <div>
                  {todoArray}
                  {this.state.showEditModal ? 
                  
                      <EditModal 
                          onModalClose={this.onModalClose} 
                          id={this.state.id} 
                          loggedIn={this.props.loggedIn}
                          isExpired={this.props.isExpired}
                          onLogOut={this.props.onLogOut}
                          messageModal={this.props.messageModal}
                      /> 
                      
                      : 
                      
                      <div></div>
                  }
                </div>
              );
            }
      }
    
  }
}