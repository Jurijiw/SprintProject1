const express = require('express');
const { validateLogin, getUserPosition, usersInfo } = require('../data/users');

function getRouter() {
    const router = express.Router();

    router.post('/login', (req, res) => {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        if( validateLogin(username, email, password)){
            const index = Number(getUserPosition(username, email));
            usersInfo[index].login = true;
            return res.status(200).send({
                ok: true,
                index: index
            })
        }
        res.status(404).send({
            ok: true,
            msg: 'Invalid user'});
    });

    return router;
}


module.exports = {
    getRouter
}