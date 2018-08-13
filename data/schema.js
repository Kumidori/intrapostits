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
type Course {
    id: Int
    name: String
    short: String
}
type detailCourse {
    id: Int
    name: String
    short: String
    vinfo: String
    block: String
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
