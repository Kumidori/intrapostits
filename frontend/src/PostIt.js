import React from "react";
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { Mutation } from "react-apollo";
import gql from "graphql-tag"; 
import  {GET_SINGLE_COURSE,GET_POSTS_IN_COURSE} from './Queries'

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
const DELETE_POSTIT = gql`
 mutation deletePostIt($id: String! ) {
  deletePostIt(id:$id) {
    content
    author
    courseId
    id
  }
}
`;

class PostIt extends React.Component{
    state = {
        content:this.props.content || "",
        editable: false,
        id: this.props.id
    };
    handleChange = (event) => {
        console.log(event.target.value)
        this.setState({content : event.target.value});
    };
    submitText= (event,addPostIt) => {
        event.preventDefault();
        console.log("Submitting")
        this.props.editPostIt();
        this.setState({editable:false});
        addPostIt({ variables: { content: this.state.content, author: sessionStorage.getItem("username"), courseId: this.props.match.params.id, id: this.props.id } })
    };
    componentDidMount(){
        this.setState({editable : !this.state.content});
        window.scrollTo(0,document.body.scrollHeight);
        //this.nameInput.focus();
    };
    render(){
        return(
    <Card className={this.state.editable ? "my-card straight" : "my-card"}>
    {this.state.editable ? 
        <Mutation mutation={ADD_POSTIT}  onCompleted={()=>console.log("MUTATION COMPLETED")} onError={()=>console.log("MUTATION ERROR")}
        >
            {(addPostIt) => (
        <form onSubmit={(e) => {
            this.submitText(e,addPostIt)
        }}
        >
        <TextField  autoFocus  value={this.state.content} onChange={this.handleChange} type="text"></TextField>
        <IconButton  type="submit" aria-label="submit">
        <Icon>send</Icon>
        </IconButton>
        </form>
        )}
        </Mutation>
    :
    <React.Fragment>
    <Typography className="card-content" variant="headline" component="h2">
    {this.state.content}
    </Typography>
    <div className="my-delete-btn">

    <IconButton   aria-label="delete">
    <Icon onClick={() => {this.setState({editable:true})}}>edit</Icon>
    </IconButton>

    <Mutation mutation={DELETE_POSTIT} ignoreResults={false} onCompleted={()=>console.log("MUTATION COMPLETED")} onError={()=>console.log("MUTATION ERROR")}
    update={(cache, { data: { deletePostIt } }) => {
        const {getPostItsInCourse} = cache.readQuery({ 
            query: GET_POSTS_IN_COURSE,
            variables:{id: this.props.match.params.id}
         });
         console.log(deletePostIt.id)
        cache.writeQuery({
          query: GET_POSTS_IN_COURSE,
          variables:{id: this.props.match.params.id},
          data: { getPostItsInCourse: getPostItsInCourse.filter((el)=>el.id!==deletePostIt.id) },
        });
      }}
    >
    {(deletePostit) => (
    <IconButton onClick={()=>deletePostit({ variables: {id: this.state.id } })} aria-label="delete">
    <Icon>delete</Icon>
    </IconButton>
    )}
    </Mutation>

    </div>
    </React.Fragment>
    }
    </Card>
)
    }
};

 export default PostIt;