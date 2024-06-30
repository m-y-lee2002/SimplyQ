import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAPI } from '../api/getAPI';
import {SHA1} from 'crypto-js';

class UserLogin extends Component {
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
    }

    clearInputs() {
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
    }

    async verifyUserCreds() {
        const { email, password } = this.state;
        try {
            const response = await getAPI('/verifyUserLogin/' + email);
            /**
             * Need to encrypt password and compare hashes
             */
            console.log(response);
            console.log(SHA1(password).toString());
            if (response && response.password && response.password === SHA1(password).toString()) {
                console.log(true);
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
            this.props.navigate('/');
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
            <div className='UserLogin'>
                <h1>UserLogin</h1>
                <form onSubmit={this.submitHandler}>
                    Email: <input type="text" id="email" onChange={this.setEmail} />
                    <br/><br/>
                    Password:<input type="password" id="password" onChange={this.setPassword} />
                    <br/><br/>
                    <button type="submit" onClick={this.clearInputs}>Submit</button>
                </form>
                <a href="/UserRegister">Create Account</a>
            </div>
        );
    }
}

function PageNavigation(props) {
    const navigate = useNavigate();
    return <UserLogin {...props} navigate={navigate} />;
}

export default PageNavigation;
