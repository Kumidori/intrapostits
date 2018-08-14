const axios = require("axios");
const mongoose = require('mongoose');

const Course = {
    getAll(args) {
        console.log(args);
        return axios.get('https://webservdm.hs-furtwangen.de/subsites/Frapi/public/veranstaltungen/liste',
            {
                auth: {
                username: args.userName,
                password: args.password
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
    register(args) {
        console.log(args);
                    let userSchema = mongoose.Schema({
                        userName: String,
                        courses: [String],
                        posts: [String]
                    });
                    let User = mongoose.model('users', userSchema);
                    let testUser =  new User({ userName: args.userName, courses: [12,14], posts:[23] }).save();
                    return args;
    }
};

export { Course, User };