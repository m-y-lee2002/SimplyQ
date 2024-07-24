import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAPI } from '../api/getAPI';
import {SHA1} from 'crypto-js'; 
class StaffRegister extends Component{
    render(){
        return(
            <div className='StaffRegister'>
                <h1>Staff Register</h1>
            </div>
        );
    }
}
function PageNavigation(props){
    const navigate = useNavigate();
    return <StaffRegister{...props} navigate={navigate}/>;
  }
  export default PageNavigation;