const express = require('express');
const { validateLogin, getUserPosition } = require('../data/users');

function getRouter() {
    const router = express.Router();

    router.post('/login', (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        if( validateLogin(username, password)){
            return res.send(getUserPosition(username))
        }
        res.status(400).send('Invalid user');
    });

    return router;
}


module.exports = {
    getRouter
}