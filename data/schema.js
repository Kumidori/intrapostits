import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
type Query {
    allCourses (
    userName: String!
    password: String!
    ): [Course]
    
    singleCourse (
    userName: String!
    password: String!
    id: String!
    ): detailCourse
}
type Mutation{
    registerUser: User
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
    text: String
    author: String
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
