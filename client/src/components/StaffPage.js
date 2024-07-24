import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAPI } from '../api/getAPI';
// import {SHA1} from 'crypto-js'; 
class StaffPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentStaff: JSON.parse(localStorage.getItem('currentStaff')),
            currentQueue: null,
            allUsers:null
        };
        this.getQueue = this.getQueue.bind(this);
        this.findUserByUid = this.findUserByUid.bind(this);
    }
    componentDidMount(){
        this.getQueue();
    }
    findUserByUid(targetId){
        const{allUsers} = this.state;
        for(let i = 0; i< allUsers.length; i++){
            if(allUsers[i].uid == targetId){
                return allUsers[i];
            }
        }
    }
    async getQueue(){
        const newQueue = await getAPI("/queue/getAll");
        const newAllUsers = []
        for(let i = 0; i < newQueue.length; i++){
            //need to write getAPI for get user by uid
            const newUser = await getAPI("/user/getUser/" + newQueue[i].uid);
            newAllUsers.push(newUser);
        }
        this.setState({currentQueue:newQueue, allUsers: newAllUsers});
        
    }
    render(){
        const{currentStaff,currentQueue} = this.state;
        if(currentQueue == null){
            return null;
        }
        return(
            <div className='StaffPage'>
                <h1>{currentStaff.name}'s Staff Page</h1>
                {currentQueue.length}
                <ul>
                    {currentQueue.map((user)=>(
                        <li key={user.uid}>{user.queuePosition}:{this.findUserByUid(user.uid)}</li>
                    ))}
                </ul>
                <button>Clear Queue</button> 
                <button>Remove Current User</button>

            </div>
        );
    }
}
function PageNavigation(props){
    const navigate = useNavigate();
    return <StaffPage{...props} navigate={navigate}/>;
  }
  export default PageNavigation;