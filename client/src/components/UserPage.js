import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateAPI } from '../api/updateAPI';
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
    }
    async leaveQueue(){
        const{currentUser} = this.state;
        const updatedUser = {...currentUser, inQueue: false};
        this.setState({currentUser: updatedUser});
        await updateAPI(updatedUser, '/user/updateUser');
    }
    async joinQueue(){
        const{currentUser} = this.state;
        const updatedUser = {...currentUser, inQueue: true};
        this.setState({currentUser: updatedUser});
        await updateAPI(updatedUser,'/user/updateUser');
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
        const { currentUser } = this.state;
        return (
          <div className='UserPage'>
            <button onClick={this.logOut}>Logout</button>
            {currentUser.inQueue ? (
              <div className='InQueueUser'>
                <h1>{currentUser.name}</h1>
                Position: {}
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