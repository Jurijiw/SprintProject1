const express = require('express');
const { usersInfo, createUser, checkBody } = require('../data/users');
const { isAdmin, validateEmail, validateUsername, isLogin } = require('../middlewares/validators');


function getRouterUser() {
    const router = express.Router();

    router.get('/users', isLogin ,isAdmin, (req, res) => {
        res.status(200).send({
            ok: true,
            users: usersInfo});
    });

    router.post('/users', validateEmail, validateUsername, (req, res) => {
        const id = new Date().getTime();
        const bodyOk = checkBody(req.body);
        if( bodyOk === '') {
            const user = createUser(req.body, id);
            if( user ) {
                res.status(200).send({
                    ok: true,
                    newUser: user
                });
            } else {
                res.status(404).send({
                    ok: true,
                    msg: 'Error al intentar crear la cuenta de usuario.'
                }); 
            }
        }
        res.status(404).send({
            ok: false,
            msg: bodyOk
        });
    });

    return router;
}

module.exports = {
    getRouterUser
}