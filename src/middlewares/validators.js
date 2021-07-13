const { usersInfo } = require("../data/users");
const { productsInfo } = require("../data/products");
const { ordersInfo } = require("../data/orders");

//Users validations
function isAdmin(req, res, next) {
    const id = Number(req.headers.id);
    for (const user of usersInfo) {
        if (user.id === id && user.admin === true) {
            return next();
        }
    }
    res.status(404).send('No puede realizar la siguiente peticion porque no es un usuario administrador.');
}

function validateEmail(req, res, next) {
    const email = (req.body.email);
    for (const user of usersInfo) {
        if (user.email === email) {
            return res.status(404).send('No puede realizar la siguiente porque su usuario ya esta registrado.');
        }
    }
    return next();
}

function validateUserID(req, res, next) {
    const idUser = Number(req.params.idUser);
    if (idUser === null || idUser === undefined || idUser === ''){
        return res.status(404).send({
            ok: true,
            msg: 'El usuario no existe.'
        });
    } else {
        for (const user of usersInfo) {
            if(user.id === idUser) {
                return next();
            }
        }
        res.status(404).send({
            ok: true,
            msg: 'El usuario no existe.'
        });
    }
} 
//Products validations
function validateProduct(req, res, next) {
    let auxiliar = req.body.detail;
    let products = new Array();
    for (const aux of auxiliar) {
        prod = {
            idProduct: aux.idProduct,
            amount: aux.amount
        }
        products.push(prod);
    }
    console.log('Productos req', products.length);
    if(products.length > 0) {
        for (const product of products) {
            let exists = productsInfo.find(prod => prod.id === product.idProduct && prod.active === true);
            console.log('Existe:', exists);
            if(exists === undefined) {
                return res.status(404).send('El producto solicitado no se encuentra disponible.');
            }
        }
        return next();
    }
    return res.status(404).send('Debe agregar al menos un producto a su pedido.');
}

//Orders validations
function validateOrderID(req, res, next) {
    const idOrder = Number(req.params.idOrder);
    if (idOrder === null || idOrder === undefined || idOrder === ''){
        return res.status(404).send({
            ok: true,
            msg: 'El pedido no existe.'
        });
    } else {
        for (const order of ordersInfo) {
            if(order.id === idOrder) {
                return next();
            }
        }
        return res.status(404).send({
            ok: true,
            msg: 'El pedido no existe.'
        });
    }
}   

module.exports = {
    isAdmin,
    validateEmail,
    validateProduct,
    validateOrderID,
    validateUserID
}