import { Query } from "react-apollo";
import React from "react";
import SingleCourse from "./SingleCourse";
import  {GET_COURSES} from './Queries'

const Courses = () => (
  <Query query={GET_COURSES}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      return (
          data.allCourses.map((props) => (
           <SingleCourse key={props.id} {...props} />
      ))

    )
    }}
  </Query>
);

export default Courses;