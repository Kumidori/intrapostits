import React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


class PostIt extends React.Component{
    componentDidMount(){
        window.scrollTo(0,document.body.scrollHeight);
    }
    render(){
        return(
    <Card className="my-card">
    <CardContent>
    <Typography variant="headline" component="h2">
    {this.props.children}
    </Typography>
    </CardContent>
    </Card>
)
    }
};

 export default PostIt;