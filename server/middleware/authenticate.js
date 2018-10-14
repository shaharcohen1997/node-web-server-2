const {User} = require('./../models/user');

const authenticate = (request, response, next) => {
    const token = request.header('x-auth');

    User.findByToken(token).then((user) =>{
        if (!user) {
            return Promise.reject();
        }
        request.user = user;
        request.token = token;
        next();
    }).catch((e) => {
        response.status(401).send();
    }) ;
  };
  module.exports = { authenticate };