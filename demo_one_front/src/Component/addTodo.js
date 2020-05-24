import React, { Component } from 'react';

import DateInput from './dateInput';
import TimeInput from './timeInput';
import {Redirect } from 'react-router-dom';
import Loader from 'react-loader'

class addTodo extends Component{

    constructor(props){
        super(props)
        this.state = {
            todo : "",
            date : "",
            time : "",
            hh : "00",
            mm : "00",
            showError : false,
            redirect : false,
            loading : false
        }
    }
    
    onFormSubmit = (event) => {
        this.setState({loading : true})
        if(this.props.isExpired()){
            this.props.messageModal("Session Expired !!")
            this.props.onLogOut();
        }else{
            var curr = new Date()
            var given = new Date(`${this.state.date}T${this.state.time}`)
            if(curr.getTime() >= given.getTime()){
                this.setState({showError : true})
                this.setState({loading : false})
            }else{
                this.setState({showError : false})
                fetch(`/addTodo/${this.props.username}`, {
                    method:"POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization' : `Bearer ${localStorage.getItem("jwtToken")}`
                    },
                    body : 
                        JSON.stringify({
                            "todo" : this.state.todo,
                            "date" : this.state.date,
                            "time" : this.state.time
                        })
                })
                .then(response => {
                    if (response.ok) {
                        this.setState({redirect : true})
                        this.props.messageModal("Todo added successsfully")
                    } else {
                        throw new Error();
                    }
                })
                .catch(error => {
                    this.props.messageModal('Something went wrong');
                    this.componentDidMount()
                })
            }
        }
        event.preventDefault()

    }

    componentDidMount(){
        if(this.props.isExpired()){
            this.props.messageModal("Session Expired !!")
            this.props.onLogOut();
        }else{
            this.setState({loading : false})
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
        if(!this.props.loggedIn){
            return <Redirect to="/signIn"/>
        }else
        if(this.state.redirect){
            return <Redirect to="/home"/>
        }else
            return(
                <div>
                    <main className="center measure pa4 black-80 w-100 ">
                        <form className="center shadow-1 pa3" onSubmit={this.onFormSubmit}>
                            
                            <fieldset id="addTodo" className="ba b--transparent ph0 mh0 tc ">
                                <legend className="center f4 fw6 ph0 mh0">Add a Todo</legend>
                                
                                <div className="mv3 v-mid">
                                    <label className="pa2 db fw6 lh-copy f6 w-100 tl" htmlFor="todo">Todo</label>
                                    <textarea required style={{resize: "vertical"}} className="pa2 input-reset ba b--white shadow-1 bg-transparent hover-bg-black hover-white w-100" 
                                            type="text" name="todo" rows="5" id="todo" placeholder="Enter work todo here." onChange={this.onTodoChange} maxLength={1000}/>
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
                                <input className="b ph3 pv2 input-reset ba b--white shadow-1 bg-transparent pointer f6 dib hover-bg-black hover-white" 
                                type="submit" value="Add" />
                            </div>
                        </form>
                </main>
                {this.state.loading ?
                    <div className="measure center tc">
                        <Loader loaded={!this.state.loading}></Loader>
                    </div>
                    : <div/>
                }
                </div>
            );
    }
}

export default addTodo;