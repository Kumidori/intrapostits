import React from "react";
import gql from "graphql-tag";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import PostIt from "./PostIt";
import { Mutation } from "react-apollo";
import { Query } from "react-apollo";
import  {GET_POSTS_IN_COURSE} from './Queries'


const ADD_POSTIT = gql`
 mutation addPostIt($content: String!,$author: String!, $courseId: String!,$id: String ) {
  addPostIt(content: $content, author: $author ,courseId:$courseId, id:$id) {
    content
    author
    courseId
    id
  }
}
`;

class PostItList extends React.Component {
    state = {
        editing: false,
        newContent: ""
    }
       editPostIt = () => {
        console.log("edited Postit");
        this.setState({editing: false});     
    }
      addEmptyPostIt = (addPostIt) => {
          console.log("adding PostIt");
          console.log(typeof this.props.match.params.id);
        addPostIt({ variables: { content: "", author: sessionStorage.getItem("username"), courseId: this.props.match.params.id } })
        this.setState({
        editing: true
        })
    }
    render() {
        return(
        <React.Fragment>
        {console.log("RENDERING POSTITLIST")}
        <Query
        query={GET_POSTS_IN_COURSE}
        variables={{ id: this.props.match.params.id }}
        > 
        {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            return(

            <div className="grid-container">
                {data.getPostItsInCourse.map((el)=>{
                return <PostIt {...this.props} key={el.id} id={el.id} content={el.content} editPostIt={this.editPostIt} deletePostIt={this.deletePostIt}/>
                })}
            </div>

            )
            }}
        </Query>
            <Mutation mutation={ADD_POSTIT} ignoreResults={false} onCompleted={()=>console.log("MUTATION COMPLETED")} onError={()=>console.log("MUTATION ERROR")}
            update={(cache, { data: { addPostIt } }) => {
                console.log(this.props.match.params.id)
                const {getPostItsInCourse} = cache.readQuery({ 
                    query: GET_POSTS_IN_COURSE,
                    variables:{id: this.props.match.params.id}
                 });
                 console.log(cache)
                cache.writeQuery({
                  query: GET_POSTS_IN_COURSE,
                  variables:{id: this.props.match.params.id},
                  data: { getPostItsInCourse: getPostItsInCourse.concat([addPostIt]) },
                });
              }}
            >
            {(addPostIt) => (
            <Button
            className="fab-btn"
            variant="fab"
            color="primary"
            aria-label="Add"
            onClick={() => this.addEmptyPostIt(addPostIt)}
            disabled={this.state.editing}
          >
            <AddIcon />
          </Button>
            )}
          </Mutation>
          </React.Fragment>
        )
    }
}

export default PostItList;
