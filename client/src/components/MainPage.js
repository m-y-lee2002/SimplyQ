import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';  
class MainPage extends Component{
    constructor(props){
        super(props);
        this.state = {

        };
        this.navigateToUser = this.navigateToUser.bind(this);
        this.navigateToStaff = this.navigateToStaff.bind(this);
    }
    navigateToUser(){
        this.props.navigate('../UserLogin');
    }
    navigateToStaff(){
        this.props.navigate('../StaffLogin');
    }
    render(){
        return(
        
            <div className='mainpage'>
                <h1>
                    SimplyQ
                </h1>
                <button onClick={this.navigateToUser}>User</button>
                <br/>
                <br/>
                <button onClick={this.navigateToStaff}>Staff</button>
            </div>
        )
    }
}
function PageNavigation(props){
    const navigate = useNavigate();
    return <MainPage{...props} navigate={navigate}/>;
  }
  export default PageNavigation;