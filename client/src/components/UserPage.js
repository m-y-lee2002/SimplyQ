import React, { Component } from 'react';
import { createRoutesFromElements, useNavigate } from 'react-router-dom';
import { updateAPI } from '../api/updateAPI';
import { getAPI } from '../api/getAPI';
import { postAPI } from '../api/postAPI';
import { deleteAPI } from '../api/deleteAPI';
class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: JSON.parse(localStorage.getItem('currentUser')),
      position: null,
      queue: null
    };
    this.joinQueue = this.joinQueue.bind(this);
    this.leaveQueue = this.leaveQueue.bind(this);
    this.logOut = this.logOut.bind(this);
    this.getQueue = this.getQueuePosition.bind(this);
    this.updateQueuePosition = this.updateQueuePosition.bind(this);
  }
  async leaveQueue() {
    const { currentUser } = this.state;
    const updatedUser = { ...currentUser, inQueue: false };
    this.setState({ currentUser: updatedUser });
    await updateAPI(updatedUser, '/user/updateUser');
    await deleteAPI("/queue/removeFromQueue/" + currentUser.uid);
   // this.updateQueuePosition();
    const currentPosition = null;
    this.setState({ position: currentPosition });
  }
  async updateQueuePosition() {
  //   const { position } = this.state;
  //   const currentQueue = await getAPI('/queue/getAll');
  //   console.log(currentQueue);
  //   let i = 0;
  //   while(currentQueue[i] && currentQueue[i].queuePosition < position){
  //     i++;
  //   }
  //   for(let j = i; j < currentQueue.length; j++){
  //     currentQueue[j].queuePosition = currentQueue[j].queuePosition -1;
  //     await(updateAPI(currentQueue[j],"/queue/updateQueue"));
  //   }

  //   await deleteAPI("/queue/removeUserPosition/"+currentQueue.length);
    
  }
  /*
  * Handles when user joins the queue
  * 
  * @param N/A
  * @return N/A
  * @throws N/A
  */
  async joinQueue() {
    //Get current user to update
    const { currentUser } = this.state;
    //Update current user status to be in queue locally
    const updatedUser = { ...currentUser, inQueue: true };
    const currentPosition = await this.getQueuePosition() + 1;
    this.setState({ currentUser: updatedUser, position: currentPosition });
    //Update changes to user on User table
    await updateAPI(updatedUser, '/user/updateUser');
    //Post user to queue table
    const queueObj = {
      queuePosition: currentPosition,
      uid: currentUser.uid
    }
    await postAPI(queueObj, "/queue/addToQueue");
  }

  async getQueuePosition() {
    const position = await getAPI("/queue/getMaxPosition");
    return position? position: -1;
  }

  componentDidMount() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.setState({ currentUser });

  }
  logOut() {
    localStorage.removeItem('currentUser');
    this.props.navigate('/');
  }
  render() {
    const { currentUser, position } = this.state;
    return (
      <div className='UserPage'>
        <button onClick={this.logOut}>Logout</button>
        {currentUser.inQueue ? (
          position === 0?(
            <div className='NextUpInQueue'>
              <h1>{currentUser.name}</h1>
              Next Up!
              <br />
              <br />
              <button onClick={this.leaveQueue}>Leave Queue</button>
            </div>
          ):(
            <div className='InQueueUser'>
            <h1>{currentUser.name}</h1>
            Position: {position}
            <br />
            <br />
            <button onClick={this.leaveQueue}>Leave Queue</button>
          </div>

          )
        ) : (
          <div className='OutQueueUser'>
            <h1>{currentUser.name}</h1>
            <button onClick={this.joinQueue}>Join Queue</button>
          </div>
        )}
      </div>
    );
  }

}
function PageNavigation(props) {
  const navigate = useNavigate();
  return <UserPage {...props} navigate={navigate} />;
}

export default PageNavigation;