import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Icon from '@material-ui/core/Icon';
import PostItList from "./PostItList"
import  {GET_SINGLE_COURSE} from './Queries' 


class SingleCoursePage extends React.Component {
  state = {
    data: {}
  };
  render() {
    let props = this.props;
    return (
      <Query
        query={GET_SINGLE_COURSE}
        variables={{ id: props.match.params.id }}
      >
        {({ loading, error, data }) => {
          console.log(data);
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          return (
            <React.Fragment>
              <AppBar position="fixed">
                <Toolbar>
                <Button onClick={() => this.props.history.goBack()}><Icon>keyboard_backspace</Icon></Button>
                  <Typography
                    style={{ textAlign: "center", flexGrow: "1" }}
                    variant="title"
                    color="inherit"
                  >
                    {data.singleCourse.name}
                  </Typography>
                </Toolbar>
              </AppBar>
              <PostItList {...props} postIts ={data.getPostItsInCourse}/>       
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

export default SingleCoursePage;
