import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAPI } from '../api/getAPI';
import {postAPI} from '../api/postAPI';
import {SHA1} from 'crypto-js';

class UserRegister extends Component{
    constructor(props){
        super(props);
        this.state = {
            email:null,
            name:null,
            password:null
        };
        this.setEmail =  this.setEmail.bind(this);
        this.setName =  this.setName.bind(this);
        this.setPassword =  this.setPassword.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.verifyUserEmail = this.verifyUserEmail.bind(this);
        this.registerAccount = this.registerAccount.bind(this);
    }

    async submitHandler(event){
        event.preventDefault();
        if(await this.verifyUserEmail() === false){
            alert("An account exists with this email");
        }else{
            alert("email can be used");
            await this.registerAccount();
        }
        
    }
    async registerAccount(){
        const{email, name, password} = this.state;
        // remember to hash password
        const newUser = {
            email: email,
            name: name,
            password: SHA1(password).toString(),
            inQueue: false
        };
        await postAPI(newUser,'/registerUser');
       this.props.navigate('/');
    }
    async verifyUserEmail() {
        const { email } = this.state;
        try {
            const response = await getAPI('/verifyUserEmail/' + email);
            console.log("response from getAPI: "+ response);
            return response;
        } catch (error) {
           console.log(error);
        }
    }
    setEmail(currentEmail){
        this.setState({email: currentEmail.target.value});
    }
    setName(currentName){
        this.setState({name:currentName.target.value});
    }   
    setPassword(currentPassword){
        this.setState({password:currentPassword.target.value});
    }
    render(){
        return(
            <div className='UserRegister'>
                <h1>Register</h1>
                <form onSubmit={this.submitHandler}>
                    Email: <input type="text" id="email" onChange={this.setEmail} />
                    <br/><br/>
                    Name: <input type="text" id="name" onChange={this.setName} />
                    <br/><br/>
                    Password:<input type="password" id="password" onChange={this.setPassword} />
                    <br/><br/>
                    <button type="submit" onClick={this.clearInputs}>Submit</button>
                </form>
            </div>
        );
    }

}

function PageNavigation(props) {
    const navigate = useNavigate();
    return <UserRegister {...props} navigate={navigate} />;
}

export default PageNavigation;