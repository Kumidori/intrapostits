import React from 'react';
import Courses from "./Courses";
import Login from './Login';
import md5 from 'md5';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const REGISTER_USER = gql`
mutation{
    registerUser{
      userName
      courses
    }
  }
`;

class Home extends React.Component {
    state = {
        loggedIn: sessionStorage.getItem("username")&&sessionStorage.getItem("password") ? true : false,
        userName: sessionStorage.getItem("username") || "",
        password: sessionStorage.getItem("password") || ""
    };
    handleLogin(registerUser){
        console.log("logging in!");
        sessionStorage.setItem("username" , this.state.userName);
        sessionStorage.setItem("password" , this.state.password);
        registerUser();
    }
    handleInput(e){
        e.target.id==="password" 
        ? 
        this.setState({[e.target.id]: md5(e.target.value)})
        :
        this.setState({[e.target.id]: e.target.value})
        console.log(this.state);
    }

    render(){
    return (
    <div className="grid-container">
    {
        this.state.loggedIn ? <Courses/> : <h1>Sie müssen sich einloggen</h1>
    }
    <Mutation mutation={REGISTER_USER} onCompleted={()=>this.setState({loggedIn:true})} onError={()=>this.setState({loggedIn:false})}>
    {(registerUser, { loading, error }) => (
    <Login
    loading={loading}
    error={error}
    loggedIn={this.state.loggedIn} 
    handleLogin={()=>this.handleLogin(registerUser)} 
    handleInput={(e)=>this.handleInput(e)} 
    />
    )
    }
    </Mutation>
    </div>
    )
}
};

export default Home;