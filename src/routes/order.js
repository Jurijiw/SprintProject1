const express = require('express');
const { isAdmin, validateProduct, validateOrderID, validateUserID, validateOrderStatus } = require('../middlewares/validators');
const { usersInfo } = require('../data/users');
const { ordersInfo } = require('../data/orders');

function getRouterOrders() {
    const router = express.Router();

    //Admins
    router.get('/orders', isAdmin, (req, res) => {
        const orders = ordersInfo.sort(orderByDateAndStatus);
        res.status(200).send({
            ok: true,
            orders: orders
        });
    });

    router.get('/orders/:idOrder', isAdmin, validateOrderID, (req, res) => {
        const idOrder = Number(req.params.id);
        const order = ordersInfo.filter(order => order.id === idOrder);
        res.status(200).send({
            ok: true,
            order: order
        });
    });

    router.put('/orders/:idOrder', isAdmin , validateOrderID, (req, res) => {
        const idOrder = Number(req.params.idOrder);
        for (const order of ordersInfo) {
            if (idOrder === order.id) {
                order.status = req.body.status;
                return res.status(200).send({
                    ok:true,
                    order: order
                });
            }
        }   
    });

    router.delete('/orders/:idOrder', isAdmin , validateOrderID, (req, res) => {
        const idOrder = Number(req.params.idOrder);
        for (const order of ordersInfo) {
            if (idOrder === order.id) {
                const index = ordersInfo.indexOf(order);
                if (index > -1) {
                    ordersInfo.splice(index, 1);
                }
                return res.json(ordersInfo);
            }
        }
    });

    //Users
    router.post('/users/:idUser/orders', validateProduct, validateUserID ,(req, res) => {
        const idUser = Number(req.params.idUser);
        const id = new Date();
        if(req.body.address === '' || req.body.address === undefined || req.body.address === null){
            for (const user of usersInfo) {
                if (user.id === idUser) {
                    req.body.address = {
                        'street': user.addresses[0].street,
                        'number': user.addresses[0].number,
                        'city': user.addresses[0].city,
                        'province': user.addresses[0].province
                    }
                }
            }
        }
        const orderData =  {
            ...req.body,
            id: id.getTime(),
            userId: idUser,
            date: id
            };
        ordersInfo.push(orderData);
        res.send(ordersInfo);
    });

    router.get('/users/:idUser/orders', validateUserID, (req, res) => {
        const idUser = Number(req.params.idUser);
        const order = ordersInfo.filter(order => order.userId === idUser);
        res.send(order);
    });

    router.get('/users/:idUser/orders/:idOrder', validateUserID, validateOrderID, (req, res) => {
        const idUser = Number(req.params.idUser);
        const idOrder = Number(req.params.idOrder);
        const order = ordersInfo.filter(order => order.id === idOrder && order.userId === idUser);
        res.send(order);
    });

    router.put('/users/:idUser/orders/:idOrder', validateProduct,validateOrderID, validateUserID, validateOrderStatus, (req, res) => {
        const idOrder = Number(req.params.idOrder);
        const newDate = new Date();
            for (const order of ordersInfo) {
                if (idOrder === order.id) {
                    const data = req.body;
                    order.detail = data.detail;
                    order.date = newDate; 
                    return res.json(order);
                }
            }
            return res.send('Error al modificar el pedido');
    });

    router.put('/users/:idUser/orders/:idOrder/confirm', validateOrderID, validateUserID, validateOrderStatus, (req, res) => {
        const idOrder = Number(req.params.idOrder);
            for (const order of ordersInfo) {
                if (idOrder === order.id) {
                    order.status = 2;
                    return res.json(order);
                }
            }
            return res.send('Error al confirmar el pedido');
    });
    
    router.delete('/users/:idUser/orders/:idOrder', validateUserID, validateOrderID ,(req, res) => {
        const idUser = Number(req.params.idUser);
        const idOrder = Number(req.params.idOrder);
        for (const order of ordersInfo) {
            if (idOrder === order.id && order.userId === idUser && order.status === 1) { //Order estado pendiente
                const index = ordersInfo.indexOf(order);
                if (index > -1) {
                    ordersInfo.splice(index, 1);
                }
                return res.json(ordersInfo);
            }
        }
    });

    return router;
}

function orderByDateAndStatus(a,b) {
    if(a.date < b.date) return 1;
    else if (a.date > b.date) return -1;
    else {
        if (a.status > b.status) return 1;
        else if (a.status < b.status) return -1;
        return 0;
    }
}

module.exports = {
    getRouterOrders
}