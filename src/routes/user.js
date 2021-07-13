const express = require('express');
const { usersInfo } = require('../data/users');
const { isAdmin, validateEmail } = require('../middlewares/validators');


function getRouterUser() {
    const router = express.Router();

    router.get('/users', isAdmin, (req, res) => {
        res.send(usersInfo);
    });

    router.get('/users/:id', (req, res) => {
        const idUser = Number(req.params.id);
        const user = usersInfo.filter(user => user.id === idUser);
        res.send(user);
    });

    router.put('/users/:id',  (req, res) => {
        const idUser = Number(req.params.id);
        for (const user of usersInfo) {
            if (idUser === user.id) {
                const data = req.body;
                user.username = data.username;
                user.name = data.name;
                user.lastName = data.lastName;
                user.email = data.email;
                user.phoneNumber = data.phoneNumber;
                user.password = data.password;

                return res.json(usersInfo);
            }
        }
    });

    router.post('/users', validateEmail, validateBodyUser, (req, res) => {
        console.log(req.body);
        const id = new Date().getTime();
        const userData =  {
            ...req.body,
            id: id,
          };
        usersInfo.push(userData);
        res.send(usersInfo);
    });

    router.delete('/users/:id', validateBodyUser,(req, res) => {
        const idUser = Number(req.params.id);
        for (const user of usersInfo) {
            if (idUser === user.id) {
                const index = usersInfo.indexOf(user);
                if (index > -1) {
                    usersInfo.splice(index, 1);
                }
                return res.json(usersInfo);
            }
        }
    });

    return router;
}

function validateBodyUser(req,res,next) {
    if (!req.body.username || !req.body.name ||
        !req.body.lastName || !req.body.email ||
        !req.body.phoneNumber || !req.body.password
        ) {
        return res.send('Complete todos los datos')
    } else {
        return next();
    }
}

module.exports = {
    getRouterUser
}