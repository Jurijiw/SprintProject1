const express = require('express');
const { productsInfo, createProd, checkBody } = require('../data/products');
const { isAdmin, validateUserID, validateProductByID, isLogin } = require('../middlewares/validators');
const { getFavs } = require('../data/orders');


function getRouterProd() {
    const router = express.Router();

    router.get('/users/products', validateUserID, (req, res) => {
        const id = Number(req.headers.id);
        const favs = getFavs(id);
        const activeProds = productsInfo.filter(product => product.active === true );
        if( productsInfo.length > 0){
            res.status(200).send({
                ok: true,
                favs: favs,
                products: activeProds});
        } else {
            res.status(200).send({
                ok: true,
                msg: 'Lo sentimos. No existen productos aun.'});
        }
    });

    router.get('/products', isAdmin, (req, res) => {

        if( productsInfo.length > 0){
            return res.status(200).send({
                    ok: true,
                    products: productsInfo});
        } else {
            res.status(200).send({
                ok: true,
                msg: 'Lo sentimos. No existen productos aun.'});
        }
    });

    router.post('/products', isAdmin,(req, res) => {
        console.log(req.body);
        const id = new Date().getTime();
        const bodyOk = checkBody(req.body);
        if( bodyOk === '') {
            const product = createProd(req.body, id);
            if( product ) {
                res.status(200).send({
                    ok: true,
                    newProduct: product
                });
            } else {
                res.status(404).send({
                    ok: true,
                    msg: 'Error al intentar crear el producto.'
                });
            }
        }
        res.status(404).send({
            ok: false,
            msg: bodyOk
        });
    });

    router.put('/products/:id', isAdmin, validateProductByID, (req, res) => {
        const idProd = Number(req.params.id);
        for (const product of productsInfo) {
            if (idProd === product.id) {
                if ( req.body.detail ) product.detail = req.body.detail;
                if ( req.body.price ) {
                    if ( req.body.price <= 0 ) {
                        return res.status(404).send({
                            ok: true,
                            msg: 'El precio debe ser mayor a $ 0.'
                        })
                    }
                    product.price = req.body.price;
                }
                return res.status(200).send({
                    ok: true,
                    updatedProduct: product
                })
            }
        }
    });

    router.delete('/products/:id', isAdmin, validateProductByID, (req, res) => {
        const idProd = Number(req.params.id);
        for (const product of productsInfo) {
            const nameProduct = product.detail;
            if (idProd === product.id) {
                const index = productsInfo.indexOf(product);
                if (index > -1) {
                    productsInfo.splice(index, 1);
                    return res.status(200).send({
                        ok: true,
                        msg: `El producto: ${nameProduct},fue eliminado exitosamente.`
                    });
                }
                return res.status(400).send({
                    ok: true,
                    msg: `El producto: ${nameProduct}, no pudo eliminarse.`
                });
            }
        }
    });

    return router;
}

module.exports = {
    getRouterProd
}