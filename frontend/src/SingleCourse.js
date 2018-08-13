import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom'

const SingleCourse = ({id,name,short}) =>{
    return (
            <Card className="my-card">
            <Link to={`course/${id}`}>
                <CardContent>
                <Typography variant="headline" component="h2">
                    {name}
                </Typography>
                </CardContent>
                </Link>
            </Card>
    )
};

export default SingleCourse;