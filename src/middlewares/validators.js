const { usersInfo } = require("../data/users");
const { productsInfo } = require("../data/products");
const { ordersInfo } = require("../data/orders");
const { paymentMethodsInfo } = require("../data/paymentMethods");
const { statusInfo } = require("../data/status");

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
    const idUser = Number(req.headers.id);
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
    const productID = Number(req.headers.idprod);
    const amount = Number(req.headers.amount);

    for (const product of productsInfo) {
        if (product.id === productID) {
            if (amount <= 0) {
               return res.status(404).send({
                        ok: true,
                        msg: 'La cantidad debe ser mayor a 0.'});
            }
            return next();
        }
    }
    res.status(404).send({
        ok: true,
        msg: 'El producto solicitado no existe.'});
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

function validate1pendingOrder(req, res, next) {
    const idUser = Number(req.headers.id);
    const exists = ordersInfo.find(order => order.userId === idUser && order.status === 1);
    if(exists === undefined) {
        return next();
    }                  
    res.status(404).send({
        ok: true,
        msg: 'Ya existe un pedido pendiente.',
        orderNumber: exists.id
    }); 
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

function validateOrderStatusConfirm(req, res, next) {
    const idOrder = Number(req.params.idOrder);
    for (const order of ordersInfo) {
        if(order.id === idOrder && order.status !== 1) {
            return next();
        }
    }
    res.status(404).send({
        ok: true,
        msg: 'El pedido aun no ha sido confirmado.'
    });
}  

function validateStatus(req, res, next) {
    if ( !req.body.status || req.body.status === null || req.body.status === undefined || req.body.status === '') {
        return res.status(404).send({
                    ok: true,
                    msg: 'Por favor ingrese un id valido del estado del pedido.'
                });
    }
    const statusSent = Number(req.body.status);
    if (statusSent === 1) {
        return res.status(404).send({
            ok: true,
            msg: 'El pedido ya ha sido confirmado. El estado que intenta asignar es incorrecto.'
        });
    }
    for (const status of statusInfo) {
        if(status.id === statusSent) {
            return next();
        }
    }
    res.status(404).send({
        ok: true,
        msg: 'El estado ingresado no existe. Verifique.'
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
    validateOrderStatus, 
    validate1pendingOrder,
    validateOrderStatusConfirm,
    validateStatus
}