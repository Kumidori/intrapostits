const axios = require("axios");
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

export { Course };