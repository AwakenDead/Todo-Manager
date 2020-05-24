import React, { Component } from 'react';
import './Modal.css';
import DateInput from '../Component/dateInput';
import TimeInput from '../Component/timeInput';
import { Redirect } from 'react-router-dom';
import Loader from 'react-loader';

class editTodo extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            todoObject : {},
            time : "",
            date : "",
            todo : "",
            hh : "00",
            mm : "00",
            showError : false,
            loaded : false
        }
    }
    
    onFormSubmit = (event) => {
        this.setState({loaded : false})
        if(this.props.isExpired()){
            this.props.messageModal("Session Expired !!")
            this.props.onLogOut();
        }else{
            var curr = new Date()
            var given = new Date(`${this.state.date}T${this.state.time}`)
        
            if(curr.getTime() >= given.getTime()){
                this.setState({showError : true})
            }else{
                this.setState({showError : false})

                var updatedObject = this.state.todoObject
                updatedObject.time = this.state.time
                updatedObject.todo = this.state.todo
                updatedObject.date = this.state.date
                fetch(`/editTodo`, {
                    method:"PUT",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization' : `Bearer ${localStorage.getItem("jwtToken")}`
                    },
                    body : 
                        JSON.stringify(updatedObject)
                })
                .then(response => {
                    if(response.ok){
                        this.props.messageModal("Todo updated successsfully")
                    }else{
                        throw new Error()
                    }
                })
                .catch(error => {
                    this.props.messageModal('Something went wrong');
                })

                this.props.onModalClose()
                
            }
        }

        event.preventDefault()

    }

    componentDidMount(){
        if(this.props.isExpired()){
            this.props.messageModal("Session Expired !!")
            this.props.onLogOut();
        }else{
            fetch(`/getTodo/${this.props.id}`, {
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
                this.setState({todoObject : json})
                
                let {time, date, todo} = json
                this.setState({
                    time : time,
                    date : date,
                    todo : todo,
                    hh : time.substring(0,2),
                    mm : time.substring(3,5)
                })
            })
            .catch(error => {
                this.props.onModalClose()
                this.props.messageModal('Something went wrong');
            })
        }  
    }

    onTodoChange = (todo) => {
        this.setState({todo : todo.target.value})
    }

    onDateChange = (date) => {
        this.setState({date : date.target.value})
    }

    onHourChange = (hour) => {
        if(isNaN(hour.target.value) === false){
            var h = hour.target.value + ""
            if(parseInt(h) > 23){
                h = "23"
            }
            if(parseInt(h)  < 10 && h.length < 2){
                h = "0" + h;
            }
            this.setState({hh : h})
            this.setState({time : `${h}:${this.state.mm}:00`})
        }
    }

    onMinuteChange = (min) => {
        if(isNaN(min.target.value) === false){
            var m = min.target.value + ""
            if(parseInt(m) > 59){
                m = "59"
            }
            if(parseInt(m)  < 10 && m.length < 2){
                m = "0" + m;
            }
            this.setState({mm : m})
            this.setState({time : `${this.state.hh}:${m}:00`})
        }
    }

    render(){
        if(this.props.loggedIn === false){
            return <Redirect to="/signIn"/>
        }else
            if(!this.state.loaded){
                return <div style={{padding:"400px"}}>
                    <Loader loaded={this.state.loaded}></Loader>
                </div>
            }else{
                return(
                    <div id="myModal" className="modal" style={{display:"block"}}>
                        <span id="close" className="close pointer" onClick={this.props.onModalClose}>&times;</span>
                        
                        <main className="center measure pa4 black-80 w-100 bg-white">
                            <form className="center shadow-1 pa3" onSubmit={this.onFormSubmit}>
                                
                                <fieldset id="addTodo" className="ba b--transparent ph0 mh0 tc ">
                                    <legend className="center f4 fw6 ph0 mh0">Update</legend>
                                    
                                    <div className="mv3 v-mid">
                                        <label className="pa2 db fw6 lh-copy f6 w-100 tl" htmlFor="todo">Todo</label>
                                        <textarea required style={{resize: "vertical"}} className="pa2 input-reset ba b--white shadow-1 bg-transparent hover-bg-black hover-white w-100" 
                                                type="text" name="todo" rows="5" id="todo" value={this.state.todo} onChange={this.onTodoChange} maxLength={1000}/>
                                    </div>
                                    
                                    <DateInput onDateChange={this.onDateChange} date={this.state.date}/>
                                    
                                    <TimeInput onHourChange={this.onHourChange} onMinuteChange={this.onMinuteChange} time={this.state.time}/>

                                    {this.state.showError ? 
                                        <div className="red f7 pa1 tc" >Enter future date and time</div>
                                        :
                                        <div/>
                                    }   
                                </fieldset>
                                
                                <div className="tc">
                                    <input className="b ph3 pv2 input-reset ba b--white shadow-1 bg-transparent pointer f6 dib hover-bg-black blue" 
                                    type="submit" value="Update" />
                                </div>
                            </form>
                        </main>
                    </div>

                );
            }
    }
}

export default editTodo