import React from 'react';
import './Modal.css';

function confirmationModal(props){
    return(
        <div id="myModal" className="modal" style={{display:"block"}}>
            <span id="close" className="close pointer" onClick={props.onCloseConfirmationModal}>&times;</span>
            <main className="pa4 black-80">
                <div className="measure center bg-white tc">
                    <div className="pa2 ma2 black b b--black f4">{props.message}</div>
                    <div className="pa2">
                        <button className="b pa2 ph3 mr3 input-reset ba b--silver bg-transparent blue shadow-4 b hover-bg-black pointer f6 dib" onClick={props.onConfirmConfirmationModal}>
                            Yes
                        </button>
                        <button className="b pa2 ph3 input-reset ba b--silver bg-transparent blue shadow-4 b hover-bg-black pointer f6 dib"  onClick={props.onCloseConfirmationModal}>
                            Cancel
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
export default confirmationModal;