import React, {useState} from "react";
import Axios from 'axios';
import './profile.css';

function ChildDisplay(props){

    let [isEditing, setIsEditing] = useState(false)
    let [usernameInput, setUsernameInput] = useState('')
    let xpbar = (props.child.experience % 100) + '%';
    function deleteChild(){
        Axios.delete(`/auth/delete/child/${props.child.child_id}`)
        .then(res => {
          props.getChildren();
        })
        .catch(err => alert(err))
      }

      function editUsername(){
        const userId = props.child.child_id,
              username = usernameInput;

          Axios.put('/api/child/changeName', {username, userId})
          .then(res => {
              props.getChildren();
              setIsEditing(false);
              setUsernameInput('');
          })
          .catch(err => console.log(err))
      }

    return(
    <div>
        {props.child.child_name}
        {props.child.child_username}
        <span>Points: {props.child.points}</span>
        <p>level {Math.ceil(props.child.experience/100)}</p>
        <div className="unfilled-bar" >
            <div class="experience-bar" style={{width: xpbar}}></div>
        </div>
        <button onClick={deleteChild}>Delete Child</button>
        {isEditing
        ? <div>
            <input
                value={usernameInput}
                placeholder='New Username'
                onChange={(e) => setUsernameInput(e.target.value)}/>
            <button onClick={editUsername}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>   
        </div> 
        :<button onClick={() => setIsEditing(true)}>Edit Username</button>}
    </div>
    )
}

export default ChildDisplay;