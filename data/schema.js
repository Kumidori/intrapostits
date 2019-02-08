import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
type Query {
    allCourses : [Course]
    
    singleCourse (
    id: String!
    ): detailCourse

    getPostItsInCourse(
    courseId: String!
    ):[PostIt]
  
}
type Mutation{
    registerUser: User

    addPostIt(
    content: String!
    author: String!  
    courseId: String!
    id: String
    ): PostIt

    deletePostIt(
    id:String!
    ): PostIt
}
type detailCourse {
    id: Int
    name: String
    short: String
    vinfo: String
    block: String
}
type Course {
    id: Int
    name: String
    short: String
}
type User {
    userName: String
    courses: [String]
} 
type PostIt {
    content: String
    author: String
    courseId : String
    id : String
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
