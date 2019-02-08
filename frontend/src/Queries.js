import gql from "graphql-tag";

export const GET_SINGLE_COURSE = gql`
query singleCourse($id: String!) {
  singleCourse(id: $id) {
    id
    name
    vinfo
    block
    short
  }
}
`;
export const GET_POSTS_IN_COURSE = gql`
query postsincourse($id: String!) {
  getPostItsInCourse(courseId: $id) {
    content
    author
    courseId
    id
  }
}
`;

export const GET_COURSES = gql`
{
  allCourses {
    id
    name
    short
  }
}
`;

export default GET_SINGLE_COURSE