const express = require('express');
const { isAdmin } = require('../middlewares/validators');
const { usersInfo } = require('../data/users');
const { paymentMethodsInfo } = require('../data/paymentMethods');


function getRouterPM() {
    const router = express.Router();

    router.get('/paymentMethods', isAdmin,  (req, res) => {
        const actives = paymentMethodsInfo.filter(payment => payment.active === true);
        res.json(actives);
    });

    router.get('/paymentMethods/:id', isAdmin,  (req, res) => {
        const idPM = Number(req.params.id);
        const paymentDetail = paymentMethodsInfo.filter(payment => payment.id === idPM);
        res.send(paymentDetail);
    });
    
    router.put('/paymentMethods/:id', (req, res) => {
        const idPM = Number(req.params.id);
        for (const payment of paymentMethodsInfo) {
            if (idPM === payment.id) {
                const data = req.body;
                payment.detail = data.detail;
                payment.active = data.active;

                return res.json(paymentMethodsInfo);
            }
        }
    });

    router.post('/paymentMethods', isAdmin, (req, res) => {
        console.log(req.body);
        const id = new Date().getTime();
        const paymentMethodData =  {
            ...req.body,
            id: id,
          };
        paymentMethodsInfo.push(paymentMethodData);
        res.json(paymentMethodsInfo);
    });

    router.delete('/paymentMethods/:id', isAdmin , (req, res) => {
        const idPM = Number(req.params.id);
        for (const payment of paymentMethodsInfo) {
            if (idPM === payment.id) {
                const index = paymentMethodsInfo.indexOf(payment);
                if (index > -1) {
                    paymentMethodsInfo.splice(index, 1);
                }
                return res.json(paymentMethodsInfo);
            }
        }
    });

    return router;
}

module.exports = {
    getRouterPM
}