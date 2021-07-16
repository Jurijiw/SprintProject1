const express = require('express');
const { isAdmin, validateProduct, validateOrderID, validateUserID, validateOrderStatus, validate1pendingOrder, validateOrderStatusConfirm, validateStatus } = require('../middlewares/validators');
const { ordersInfo, createOrder, updateOrder, deleteProductOrder, confirmOrder, orderByStatus } = require('../data/orders');
const { usersInfo } = require('../data/users');

function getRouterOrders() {
    const router = express.Router();

    router.get('/users/orders', validateUserID, (req, res) => {
        const idUser = Number(req.headers.id);
        const order = ordersInfo.filter(order => order.userId === idUser);
        res.status(200).send({
            ok: true,
            ordersHistory: order});
    });
    
    router.post('/users/orders', validateUserID, validate1pendingOrder, (req, res) => {
        const idUser = Number(req.headers.id);
        const id = new Date().getTime();
        const order = createOrder(id, idUser);
        if(order !== null || order !== undefined || order !== ''){
            return res.status(200).send({
                ok: true,
                msg: 'Carrito listo para agregar productos.',
                order: id
            });
        }
        res.status(404).send({
            ok: true,
            msg: 'Error al crear el pedido. Intente nuevamente.'
        });
    });

    router.get('/users/orders/:idOrder', validateUserID, validateOrderID, (req, res) => {
        const idUser = Number(req.headers.id);
        const idOrder = Number(req.params.idOrder);
        const order = ordersInfo.filter(order => order.id === idOrder && order.userId === idUser);
        res.status(200).send({
            ok: true,
            order: order});
    });

    router.put('/users/orders/:idOrder', validateOrderID, validateUserID, validateOrderStatus, validateProduct, (req, res) => {
        const idOrder = Number(req.params.idOrder);
        const idProd = Number(req.headers.idprod);
        const amount = Number(req.headers.amount);

        console.log('ID prod', idProd);
        const order = updateOrder(idOrder, idProd, amount);
        if (order !== '') {
            return res.status(200).send({
                ok: true,
                msg: order
            });
        }
        res.status(404).send({
            ok: true,
            msg: 'Error al intentar modificar el pedido. Intente nuevamente.'
        });
    });

    router.delete('/users/orders/:idOrder', validateUserID, validateOrderID, validateProduct, validateOrderStatus, (req, res) => {
        const idProd = Number(req.headers.idprod);
        const idOrder = Number(req.params.idOrder);

        const deletedProd = deleteProductOrder(idOrder, idProd);
        if (deletedProd !== '') {
            return res.status(200).send({
                        ok: true,
                        msg: deletedProd
                    });
        }
        res.status(404).send({
            ok: true,
            msg: 'Error al intentar eliminar el producto. Intente nuevamente.'
        });
    });

    router.put('/users/orders/:idOrder/confirm', validateOrderID, validateUserID, (req, res) => {
        const idUser = Number(req.headers.id);
        const idOrder = Number(req.params.idOrder);
        const userInfo = usersInfo.find(user => user.id === idUser);
        const confirm = confirmOrder(req.body, idUser, idOrder);

        if (confirm !== '') {
            return res.status(200).send({
                ok: true,
                order: idOrder,
                status: confirm,
                msg: `${userInfo.name}, gracias por pedir a Delilah. Puedes seguir tu pedido para saber donde esta.`
            });
        }
        return res.status(404).send({
            ok: true,
            msg: 'Error al confirmar el pedido'});
    });
    
    router.use(isAdmin);

    router.get('/orders', (req, res) => {
        const orders = orderByStatus();
        res.status(200).send({
            ok: true,
            orders: orders
        });
    });

    router.get('/orders/:idOrder', validateOrderID, validateOrderStatusConfirm, (req, res) => {
        const idOrder = Number(req.params.idOrder);
        const order = ordersInfo.filter(order => order.id === idOrder);
        const userId = order[0].userId;
        const userInfo = usersInfo.find(user => user.id === userId);
        res.status(200).send({
            ok: true,
            order: order,
            user: {
                name: userInfo.name,
                username: userInfo.username,
                email: userInfo.email,
                phoneNumber: userInfo.phoneNumber
            }               
        });
    });

    router.put('/orders/:idOrder', validateOrderID, validateOrderStatusConfirm, validateStatus,(req, res) => {
        const idOrder = Number(req.params.idOrder);
        for (const order of ordersInfo) {
            if (idOrder === order.id) {
                order.status = Number(req.body.status);
                return res.status(200).send({
                    ok:true,
                    msg: 'Nuevo estado asignado al pedido.',
                    order: order
                });
            }
        }   
    });

    return router;
}

module.exports = {
    getRouterOrders
}