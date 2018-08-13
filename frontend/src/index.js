import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import gql from "graphql-tag";
import Home from "./Home"
import SingleCoursePage from "./SingleCoursePage"
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch 
  } from 'react-router-dom'


const client = new ApolloClient({
  uri: "/api"
});

client
  .query({
    query: gql`
     {
  allCourses(userName: "weingaen", password: "978c447b32798766c3f1d79b3c75cd1c") {
    id
    name
    short
  }
}

    `
  })
  .then(result => console.log(result));

const App = () => (
    <ApolloProvider client={client}>
        <Router>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/course/:id" component={SingleCoursePage}/>
            </Switch>
        </Router>
    </ApolloProvider>
  );
  

ReactDOM.render(<App />, document.getElementById('root'));
