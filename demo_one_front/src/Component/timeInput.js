import React from 'react';

export default function timeInput({onHourChange, onMinuteChange, time}){
    var input = time.split(":")
    var hh = isNaN(parseInt(input[0])) ? "" : parseInt(input[0]);
    var mm = isNaN(parseInt(input[1])) ? "" : parseInt(input[1]);
    return(
        <div className="mv3 v-mid">
            <label className="pa2 db fw6 lh-copy f6 w-15 tl" htmlFor="password">Time</label>
            <div className="ph2 flex flex-wrap input-reset bg-transparent black">
                <input required={true} className="pa2 ba b--white shadow-1 bg-transparent hover-white hover-bg-black tr black w-50"
                    placeholder="0-23" value={hh} name="hour" type="text" onChange={onHourChange} maxLength={2}/>
                <span className="pa2">hours</span>
                <input required={true} className="pa2  ba b--white shadow-1 bg-transparent hover-white hover-bg-black black tr w-50"
                    placeholder="0-59" value={mm} name="minute" type="text" onChange={onMinuteChange} maxLength={2}/>
                <span className="pa2">minutes</span>
            </div>
        </div>
    );
}