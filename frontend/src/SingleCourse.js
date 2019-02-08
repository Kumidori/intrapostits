import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Query } from "react-apollo";
import React from "react";
import Chip from '@material-ui/core/Chip';
import { withApollo } from 'react-apollo';
import  {GET_POSTS_IN_COURSE} from './Queries'

import {
    Link
  } from 'react-router-dom'

class SingleCourse extends React.Component {
    componentDidMount(){
        console.log(typeof this.props.id)
    }
    render(){
    return (
            <Card className="my-card">
            <Link to={`course/${this.props.id}`}>
                <CardContent>
                <Typography variant="headline" component="h2">
                    {this.props.name}
                </Typography>
                </CardContent>
                </Link>
                <Query
                    query={GET_POSTS_IN_COURSE}
                    variables={{ id: this.props.id.toString() }}
                >
                {({ loading, error, data, refetch }) => {
                    if (loading) return <div className="my-delete-btn">...</div>
                    if (error) return <div className="my-delete-btn">err</div>
                    console.log(data)
                    return <div className="my-delete-btn"><Chip color="primary" variant="outlined" label={data.getPostItsInCourse.length}/></div>
                }}
                </Query>
            </Card>
    )
            }
};

export default withApollo(SingleCourse);