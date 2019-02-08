import { Course, User, PostIt } from './connectors';

const resolvers = {
    Query: {
        allCourses(obj, args, context, info) {
            return Course.getAll(obj,args,context,info);
        },
        singleCourse(obj, args, context, info) {
            return Course.getSingle(obj,args,context,info);
        },
        getPostItsInCourse(obj, args, context, info){
            return PostIt.getByCourseId(obj,args,context,info);
        }
    },
    Mutation: {
        registerUser(obj, args, context, info){
            return User.register(args,context);
        },
        addPostIt(obj, args, context, info){
            return PostIt.add(args,context);
        },
        deletePostIt(obj, args, context, info){
            return PostIt.delete(args,context);
        }
    }

};

export default resolvers;
