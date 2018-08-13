import { Query } from "react-apollo";
import gql from "graphql-tag";
import React from "react";
import SingleCourse from "./SingleCourse";

const GET_COURSES = gql`
{
  allCourses(userName: "weingaen", password: "978c447b32798766c3f1d79b3c75cd1c") {
    id
    name
    short
  }
}
`;

const Courses = () => (
  <Query query={GET_COURSES}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      return (
          data.allCourses.map((props) => (
           <SingleCourse {...props} />
      ))

    )
    }}
  </Query>
);

export default Courses;