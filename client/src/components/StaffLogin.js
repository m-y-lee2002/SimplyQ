import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';  

class StaffLogin extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: null,
            password: null,
            reset: false
        };
        this.submitHandler = this.submitHandler.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.fetchUserInfo = this.fetchUserInfo.bind(this);
        this.verifyUserCreds = this.verifyUserCreds.bind(this);
        this.clearInputs = this.clearInputs.bind(this);
    }
    clearInputs(){
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
    }
    verifyUserCreds(){
        const result = this.fetchUserInfo;
        if(result == null){
            return false;
        }else{
            return true;
        }
    }
    submitHandler(event){
        event.preventDefault();
        const{email, password} = this.state;
        if(email == null || password == null){
            alert("Missing email or password");
        }else{
            if(this.verifyUserCreds === true){

            }else{
                alert("Invalid Username or Password");
            }
        }

    }
    setEmail(currentEmail){
        this.setState({email:currentEmail.target.value});
    }
    setPassword(currentPassword){
        this.setState({password:currentPassword.target.value});
    }

    fetchUserInfo(userEmail, userPassword){
        return {
            userId: '123',
            userName: 'John Doe',
            userEmail: userEmail,
            userPassword: userPassword
        };
    }
    render(){
        return(
            <div className='StaffLogin'>
            
                <h1>
                    UserLogin
                </h1>
                <form onSubmit={this.submitHandler}>
                    Email: <input type= "text" onChange={this.setEmail}/>
                    <br/>
                    <br/>
                    Password:<input type = "password" onChange={this.setPassword}/>
                    <br/>
                    <br/>
                    <button type="submit"  onClick={this.clearInputs}>Submit</button>
                </form>
            </div>
        )
    }
}
function PageNavigation(props){
    const navigate = useNavigate();
    return <StaffLogin{...props} navigate={navigate}/>;
  }
  export default PageNavigation;