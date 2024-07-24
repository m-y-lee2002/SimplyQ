import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAPI } from '../api/getAPI';
import {SHA1} from 'crypto-js'; 

class StaffLogin extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            reset: false
        };
        this.submitHandler = this.submitHandler.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.verifyUserCreds = this.verifyUserCreds.bind(this);
        this.clearInputs = this.clearInputs.bind(this);
        this.goHome = this.goHome.bind(this);
    }
    goHome(){
        this.props.navigate("/");
    }

    clearInputs() {
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
    }

    async verifyUserCreds() {
        const { email, password } = this.state;
        try {
            const response = await getAPI('/staff/verifyStaffLogin/' + email);
            /**
             * Need to encrypt password and compare hashes
             */
            console.log(response);
            console.log(SHA1(password).toString());
            if (response && response.password && response.password === SHA1(password).toString()) {
                console.log(true);
                localStorage.setItem('currentStaff',JSON.stringify(response));
                return true;
            } else {
                console.log(false);
                return false;
            }
            
        } catch (error) {
           console.log(error);
        }
    }

    submitHandler = async (event) => {
        event.preventDefault();
        const { email, password } = this.state;

        if (!email || !password) {
            alert("Missing email or password");
            return;
        }

        if(await this.verifyUserCreds() == true){
            this.props.navigate('/StaffPage');
        }else{
            alert("Email or Password is Invalid");
        }
    }

    setEmail(currentEmail) {
        this.setState({ email: currentEmail.target.value });
    }

    setPassword(currentPassword) {
        this.setState({ password: currentPassword.target.value });
    }

    render() {
        return (
            <div className='StaffLogin'>
                <button onClick={this.goHome}>Back</button>
                <h1>Staff Login</h1>
                <form onSubmit={this.submitHandler}>
                    Email: <input type="text" id="email" onChange={this.setEmail} />
                    <br/><br/>
                    Password:<input type="password" id="password" onChange={this.setPassword} />
                    <br/><br/>
                    <button type="submit" onClick={this.clearInputs}>Submit</button>
                </form>
                <a href="/StaffRegister">Create Account</a>
            </div>
        );
    }
}
function PageNavigation(props){
    const navigate = useNavigate();
    return <StaffLogin{...props} navigate={navigate}/>;
  }
  export default PageNavigation;