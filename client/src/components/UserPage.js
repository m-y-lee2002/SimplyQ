import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateAPI } from '../api/updateAPI';
import { getAPI } from '../api/getAPI';
import { postAPI } from '../api/postAPI';
import { deleteAPI } from '../api/deleteAPI';
class UserPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentUser: JSON.parse(localStorage.getItem('currentUser')),
            position: null,
            queue:null
        };
        this.joinQueue = this.joinQueue.bind(this);
        this.leaveQueue = this.leaveQueue.bind(this);
        this.logOut = this.logOut.bind(this);
        this.getQueue = this.getQueuePosition.bind(this);
    }
    async leaveQueue(){
        const{currentUser} = this.state;
        const updatedUser = {...currentUser, inQueue: false};
        this.setState({currentUser: updatedUser});
        await updateAPI(updatedUser, '/user/updateUser');
        await deleteAPI("/queue/removeFromQueue/" + currentUser.uid);
        const currentPosition = null;
        this.setState({position: currentPosition});
    }
    async joinQueue(){
        const{currentUser} = this.state;
        const updatedUser = {...currentUser, inQueue: true};
        this.setState({currentUser: updatedUser});
        await updateAPI(updatedUser,'/user/updateUser');
        //update queue position
        const currentPosition = await this.getQueuePosition()+1;
        this.setState({position: currentPosition});
        const queueObj = {
          queuePosition: currentPosition,
          uid: currentUser.uid
        }
        await postAPI(queueObj,"/queue/addToQueue");
    }
    async getQueuePosition(){
      const position = await getAPI("/queue/getMaxPosition");
      return position;
    }
    componentDidMount(){
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.setState({ currentUser});
        
    }
    logOut(){
        localStorage.removeItem('currentUser');
        this.props.navigate('/');
    }
    render() {
        const { currentUser,position } = this.state;
        return (
          <div className='UserPage'>
            <button onClick={this.logOut}>Logout</button>
            {currentUser.inQueue ? (
              <div className='InQueueUser'>
                <h1>{currentUser.name}</h1>
                Position: {position}
                <br />
                <br />
                <button onClick={this.leaveQueue}>Leave Queue</button>
              </div>
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