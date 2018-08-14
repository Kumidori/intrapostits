import { Course, User } from './connectors';

const resolvers = {
    Query: {
        allCourses(obj, args, context, info) {
            console.log("TRYYYIIING");
            return Course.getAll(args);
        },
        singleCourse(obj, args, context, info) {
            return Course.getSingle(args);
        }
    },
    Mutation: {
        registerUser(obj, args, context, info){
            return User.register(args);
        }
    }

};

export default resolvers;
