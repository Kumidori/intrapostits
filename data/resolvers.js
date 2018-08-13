import { Course } from './connectors';

const resolvers = {
    Query: {
        allCourses(obj, args, context, info) {
            console.log("TRYYYIIING");
            return Course.getAll(args);
        },
        singleCourse(obj, args, context, info) {
            return Course.getSingle(args);
        }
    }

};

export default resolvers;
