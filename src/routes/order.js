const express = require('express');
const { isAdmin } = require('../middlewares/validators');
const { usersInfo } = require('../data/users');
const { ordersInfo } = require('../data/orders');

function getRouterOrders() {
    const router = express.Router();

    //Admins
    router.get('/orders', isAdmin, (req, res) => {
        const orders = ordersInfo.sort((a, b) => (a.status > b.status ? 1 : a.status < b.status ? -1 : 0));
        res.send(orders);
    });

    router.get('/orders/:id', isAdmin, (req, res) => {
        const idOrder = Number(req.params.id);
        const order = ordersInfo.filter(order => order.id === idOrder);
        res.send(order);
    });

    router.put('/orders/:id', isAdmin , (req, res) => {
        const idOrder = Number(req.params.id);
        for (const order of ordersInfo) {
            if (idOrder === order.id) {
                order.status = req.body.status;

                return res.json(order);
            }
        }
    });

    router.delete('/orders/:id', isAdmin , (req, res) => {
        const idOrder = Number(req.params.id);
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
    router.post('/users/:id/orders', (req, res) => {
        const idUser = Number(req.params.id);
        const id = new Date();
        const orderData =  {
            ...req.body,
            id: id.getTime(),
            userId: idUser,
            date: id
          };
        ordersInfo.push(orderData);
        res.send(ordersInfo);
    });

    router.get('/users/:id/orders', (req, res) => {
        const idUser = Number(req.params.id);
        const order = ordersInfo.filter(order => order.userId === idUser);
        res.send(order);
    });

    router.get('/users/:idUser/orders/:idOrder', (req, res) => {
        const idUser = Number(req.params.idUser);
        const idOrder = Number(req.params.idOrder);
        const order = ordersInfo.filter(order => order.id === idOrder && order.userId === idUser);
        res.send(order);
    });

    router.put('/users/:idUser/orders/:idOrder', (req, res) => {
        const idUser = Number(req.params.idUser);
        const idOrder = Number(req.params.idOrder);
        const newDate = new Date();
        for (const order of ordersInfo) {
            if (idOrder === order.id && order.status === 1625082331400) { //Order estado pendiente
                const data = req.body;
                order.detail = data.detail;
                order.paymentMethod = data.paymentMethod;
                order.address = data.address;
                order.date = newDate;

                return res.json(ordersInfo);
            }
        }
        res.send(order);
    });
    
    router.delete('/users/:idUser/orders/:idOrder', (req, res) => {
        const idUser = Number(req.params.idUser);
        const idOrder = Number(req.params.idOrder);
        for (const order of ordersInfo) {
            if (idOrder === order.id && order.userId === idUser && order.status === 1625082331400) {
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

module.exports = {
    getRouterOrders
}