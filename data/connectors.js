const axios = require("axios");
const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    userName: {type: String, unique: true},
    courses: [String],
    posts: [String]
});

let postItSchema = mongoose.Schema({
    content: String,
    author: String,
    courseId: String,
    id: String
});

let courseSchema = mongoose.Schema({
    id: {type: String, unique: true},
    name: String,
    users: [String],
    posts: [String]
});

const prepare = (o) => {
    o.id = o._id.toString()
    return o
  }

const Course = {
    getAll(obj,args,context,info) {
        console.log("USERNAME");
        console.log(context.headers.username);
        return axios.get('https://webservdm.hs-furtwangen.de/subsites/Frapi/public/veranstaltungen/liste',
            {
                auth: {
                username: context.headers.username,
                password: context.headers.password
                    }
            })
            .then(res => {
                return res.data.veranstaltungen;
            });
    },
    getSingle(obj,args,context,info) {
        console.log(args);
        console.log(context)
        return axios.get(`https://webservdm.hs-furtwangen.de/subsites/Frapi/public/veranstaltungen/${args.id}`,
            {
                auth: {
                    username: context.headers.username,
                    password: context.headers.password,
                    id: args.id
                }
            })
            .then(res => {
                return res.data.veranstaltung[0];
            });
    }
};

const User = {
    register(args,context) {
        console.log("REGISTERING USER");
       let courses = [];
       let User = mongoose.model('users', userSchema);
      return axios.get('https://webservdm.hs-furtwangen.de/subsites/Frapi/public/veranstaltungen/liste',
            {
                auth: {
                username: context.headers.username,
                password: context.headers.password
                    }
            })
            .then(res => {
                courses = res.data.veranstaltungen;
                courses.forEach((el)=>{
                    console.log("ID LELELE")
                    console.log(el.id);
                    let Course = mongoose.model('course', courseSchema);
                    Course.update(
                    {
                        id: el.id
                    },
                    {
                        id: el.id,
                        name: el.name,
                        $addToSet: { users: context.headers.username }
                        },{ upsert : true },(err,raw)=>{
                        if (err) return handleError(err);
                        console.log('The raw response from Mongo was ', raw);
                    })
                })
                let courseIds = courses.map((course)=> course.id);
                console.log("test");
                console.log(courseIds);
                User.update({userName: context.headers.username},{ userName: context.headers.username, courses: courseIds, posts:[] },{ upsert : true },(err,raw)=>{
                    if (err) return handleError(err);
                    console.log('The raw response from Mongo was ', raw);
                })
                return {userName: context.headers.username,courses:courseIds};
            });
    }
};

let PostIts = mongoose.model('postIt', postItSchema)
const PostIt = { 
    async getByCourseId(obj,args,context,info){
    let myReturn = await PostIts.find({ 'courseId': args.courseId }, 'content author courseId id');
    myReturn.map((el)=>{
        return prepare(el);
    })
    return myReturn;
    },
    async add(args,context) {  
        console.log(args.author)
        console.log(args.id)  
       let query = {_id: args.id}
       if (!query._id) {
        query._id = new mongoose.mongo.ObjectID();
    }
       let myReturn = await PostIts.findOneAndUpdate(query,{ 
            content: args.content,
            author: args.author,
            courseId: args.courseId
        },{ upsert : true,new: true })
        console.log("inserting "+ myReturn)
        return prepare(myReturn)
    },
    async delete(args,context){
        let query = {_id: args.id}
        if (!query._id) {
            query._id = new mongoose.mongo.ObjectID();
        }
        return prepare(await PostIts.findOneAndRemove(query,'content author courseId id'));
    }
};

export { Course, User, PostIt };