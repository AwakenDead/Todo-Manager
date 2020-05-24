import React from 'react';

export default function dateInput({onDateChange, date}){
    
    return(
        <div className="mv3 v-mid ">
            <label className="pa2 db fw6 lh-copy f6 w-100 tl" htmlFor="password">Date</label>
            <div><input required={true} className="pa2 input-reset ba b--white shadow-1 bg-transparent hover-bg-black hover-white w-100" 
                    type="date" name="date"  id="date" min={getCurrentDate()} onChange={onDateChange} style={{width:"93%"}} value={date}/>
            </div>
        </div>
    );
}

function getCurrentDate(){

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${year}${"-"}${month<10?`0${month}`:`${month}`}${"-"}${date}`
}