import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import gql from "graphql-tag";
import Home from "./Home"
import Login from "./Login"
import SingleCoursePage from "./SingleCoursePage"
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch 
  } from 'react-router-dom'


const client = new ApolloClient({
  uri: "/api",
  request: async (operation) => {
    operation.setContext({
    headers: {
        username: sessionStorage.getItem('username') || "TEST",
        password: sessionStorage.getItem('password')
    }
    });
}
});

const App = () => (
    <ApolloProvider client={client}>
        <Router>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/course/:id" component={SingleCoursePage}/>
            </Switch>
        </Router>
    </ApolloProvider>
  );
  

ReactDOM.render(<App />, document.getElementById('root'));
