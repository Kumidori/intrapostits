import { Course, User } from './connectors';

const resolvers = {
    Query: {
        allCourses(obj, args, context, info) {
            console.log("TRYYYIIING");
            return Course.getAll(obj,args,context,info);
        },
        singleCourse(obj, args, context, info) {
            return Course.getSingle(args);
        }
    },
    Mutation: {
        registerUser(obj, args, context, info){
            return User.register(args,context);
        }
    }

};

export default resolvers;
