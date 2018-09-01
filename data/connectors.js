const axios = require("axios");
const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    userName: {type: String, unique: true},
    courses: [String],
    posts: [String]
});

let courseSchema = mongoose.Schema({
    id: {type: String, unique: true},
    name: String,
    users: [String],
    posts: [String]
});


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
    getSingle(args) {
        console.log(args);
        return axios.get(`https://webservdm.hs-furtwangen.de/subsites/Frapi/public/veranstaltungen/${args.id}`,
            {
                auth: {
                    username: args.userName,
                    password: args.password,
                    id: args.id
                }
            })
            .then(res => {
                console.log(res.data.veranstaltung[0]);
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
                        $addToSet: { users: context.headers.username },
                        $addToSet: { posts: "erstelle Notizen zu diesem Kurs" }
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

export { Course, User };