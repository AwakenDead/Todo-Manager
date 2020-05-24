import React from 'react';

export default function todo({ todoObject, onEdit, onDelete, onComplete}){
    return(
        <article className=" br3 ba b--black-10 ma4 shadow-1 pa2">
            <div className="pl3 pr3">
                <p className="lh-copy">
                    <span className="b"> Task : </span>
                    {todoObject.todo}
                </p>
            </div>

            { todoObject.done ?
                    
                <div className="pl3 pr3">
                    <div className="green b">
                        Status : Completed
                    </div>

                    <div className="">
                        <button className="ph3 pv2 ba b--silver br-1 shadow-4 bg-transparent hover-bg-black blue b pointer f6 mv3" value={todoObject.id} onClick={onDelete}>
                            Delete
                        </button>
                    </div>
                </div>

                :

                <div className="pl3 pr3">
                    <div>
                        <span className="red b">Status : Incomplete</span>
                        <br/><br/>
                        <span className="b">Deadline :</span> &nbsp; { (new Date(`${todoObject.date}T${todoObject.time}`) + "").substring(0,24) }
                    </div>

                    <div className="">
                        <button className="ph3 pv2 ba b--silver br-1 shadow-4 bg-transparent hover-bg-black blue b pointer f6 mr3 mv3" value={todoObject.id} onClick={onEdit}>
                            Edit
                        </button>

                        <button className="ph3 pv2 ba b--silver br-1 shadow-4 bg-transparent  hover-bg-black blue b pointer f6 mr3 mv3" value={todoObject.id} onClick={onDelete}>
                            Delete
                        </button>

                        <button className="ph3 pv2 ba b--silver br-1 shadow-4 bg-transparent hover-bg-black blue b pointer f6 mr3 mv3" value={todoObject.id} onClick={onComplete}>
                            Mark as Completed
                        </button>
                    </div>
                </div>
            }
        </article>
    );
}