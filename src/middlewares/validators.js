const { usersInfo } = require("../data/users");
const { productsInfo } = require("../data/products");
const { ordersInfo } = require("../data/orders");
const { paymentMethodsInfo } = require("../data/paymentMethods");

//Users validations
function isLogin(req, res, next) {
    const id = Number(req.headers.id);
    for (const user of usersInfo) {
        if (user.id === id && user.login === true) {
            return next();
        }
    }
    res.status(404).send('Inicie sesion antes de continuar.');
}

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
            return res.status(404).send('Email existente.');
        }
    }
    return next();
}

function validateUsername(req, res, next) {
    const username = (req.body.username);
    for (const user of usersInfo) {
        if (user.username === username) {
            return res.status(404).send('Nombre de usuario no disponible.');
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
function validateProductByID(req, res, next) {
    const idProd = Number(req.params.id);
    if (idProd === null || idProd === undefined || idProd === '') {
        return res.status(404).send({
            ok: true,
            msg: 'El pedido no existe.'
        });
    } else {
        for (const product of productsInfo) {
            if(product.id === idProd) {
                return next();
            }
        }
        return res.status(404).send({
            ok: true,
            msg: 'El producto no existe.'
        });
    }
}

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

//Payment methods validations
function validatePMID(req, res, next) {
    const idPM = Number(req.params.id);
    if (idPM === null || idPM === undefined || idPM === ''){
        return res.status(404).send({
            ok: true,
            msg: 'El metodo de pago no existe.'
        });
    } else {
        for (const pm of paymentMethodsInfo) {
            if(pm.id === idPM && pm.active === true) {
                return next();
            }
        }
        res.status(404).send({
            ok: true,
            msg: 'El metodo de pago no existe.'
        });
    }
}  

function validateOrderStatus(req, res, next) {
    const idOrder = Number(req.params.idOrder);
    for (const order of ordersInfo) {
        if(order.id === idOrder && order.status === 1) {
            return next();
        }
    }
    res.status(404).send({
        ok: true,
        msg: 'Ya no puede modificar el pedido.'
    });
}  

module.exports = {
    isLogin,
    isAdmin,
    validateEmail,
    validateUsername,
    validateProduct,
    validateProductByID,
    validateOrderID,
    validateUserID,
    validatePMID,
    validateOrderStatus
}