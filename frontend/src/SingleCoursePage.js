import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import PostIt from "./PostIt";

const GET_SINGLE_COURSE = gql`
  query singleCourse($id: String!) {
    singleCourse(
      userName: "weingaen"
      password: "978c447b32798766c3f1d79b3c75cd1c"
      id: $id
    ) {
      id
      name
      vinfo
      block
      short
    }
  }
`;

class SingleCoursePage extends React.Component {
  state = {
      postIts:["Niggo","Test"]
  };
  addPostIt = () => {
      console.log("adding PostIt");
    this.setState({
        postIts: [...this.state.postIts,"Test"]
    })
    console.log(this.state);
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
                  <Typography
                    style={{ textAlign: "center", flexGrow: "1" }}
                    variant="title"
                    color="inherit"
                  >
                    {data.singleCourse.name}
                  </Typography>
                </Toolbar>
              </AppBar>

              <div className="grid-container">
              {this.state.postIts.map((el)=>{
                return <PostIt>{el}</PostIt>
              })}
              </div>

              <Button
                className="fab-btn"
                variant="fab"
                color="primary"
                aria-label="Add"
                onClick={this.addPostIt}
              >
                <AddIcon />
              </Button>
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

export default SingleCoursePage;
