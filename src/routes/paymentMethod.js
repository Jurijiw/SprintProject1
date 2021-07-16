const express = require('express');
const { isAdmin, validatePMID, isLogin } = require('../middlewares/validators');
const { paymentMethodsInfo, createPM, checkBody } = require('../data/paymentMethods');
const { usersInfo } = require('../data/users');


function getRouterPM() {
    const router = express.Router();

    router.get('/paymentMethods', (req, res) => {
        const idUser = Number(req.headers.id);
        if ( idUser === null || idUser === undefined || idUser === '') {
            return res.status(404).send({
                        ok: true,
                        msg: 'Debe enviar el ID del usuario.'
                    });
        }
        for (const user of usersInfo) {
            if (user.id === idUser && user.admin === false) {
                const payments = paymentMethodsInfo.filter(payment => payment.active === true);
                return res.status(200).send({
                            ok: true,
                            paymentMethods: payments
                        });
            }
        }
        const actives = paymentMethodsInfo.filter(payment => payment.active === true);
        const inactives = paymentMethodsInfo.filter(payment => payment.active === false);
        res.status(200).send({
                    ok: true,
                    actives: actives,
                    inactives: inactives
                });
    });

    router.post('/paymentMethods', isAdmin, (req, res) => {
        const id = new Date().getTime();
        const bodyOk = checkBody(req.body);
        if( bodyOk === '') {
            const pmethod = createPM(req.body, id);
            if( pmethod ) {
                res.status(200).send({
                    ok: true,
                    newPMethod: pmethod
                });
            } else {
                res.status(404).send({
                    ok: true,
                    msg: 'Error al intentar crear el metodo de pago.'
                }); 
            }
        }
        res.status(404).send({
            ok: false,
            msg: bodyOk
        });
    });

    router.put('/paymentMethods/:id', isAdmin, validatePMID, (req, res) => {
        const idPM = Number(req.params.id);
        for (const payment of paymentMethodsInfo) {
            if (idPM === payment.id) {
                if ( payment.detail ) payment.detail = req.body.detail;
                if ( payment.active ) payment.active = req.body.active;
                return res.status(200).send({
                            ok: true,
                            payment: 'Metodo de pago actualizado'
                        });
            }
        }
        res.status(404).send({
            ok: true,
            msg: 'Error al actualizar el medio de pago'
        });
    });

    router.delete('/paymentMethods/:id', isAdmin, validatePMID, (req, res) => {
        const idPM = Number(req.params.id);
        for (const payment of paymentMethodsInfo) {
            const namePM = payment.detail;
            if (idPM === payment.id) {  
                const index = paymentMethodsInfo.indexOf(payment);
                if (index > -1) {
                    paymentMethodsInfo.splice(index, 1);
                }
                return res.status(200).send({
                    ok: true,
                    payment: `Metodo de pago ${namePM} eliminado.`
                });
            }
            res.status(404).send({
                ok: true,
                msg: `Error al eliminar el medio de pago ${namePM}`
            });
        }
    });

    return router;
}

module.exports = {
    getRouterPM
}