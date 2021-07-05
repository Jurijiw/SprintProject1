const { usersInfo } = require("../data/users");


function isAdmin(req, res, next) {
    const id = Number(req.headers.id);
    for (const user of usersInfo) {
        if (user.id === id && user.admin === true) {
            return next();
        }
    }
    res.status(404).send('No puede realizar la siguiente peticion porque no es un usuario administrador.');
}



module.exports = {
    isAdmin
}