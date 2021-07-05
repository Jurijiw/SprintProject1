const express = require('express');
const { usersInfo } = require('../data/users');
const { productsInfo } = require('../data/products');
const { isAdmin } = require('../middlewares/validators');


function getRouterProd() {
    const router = express.Router();

    router.get('/products', (req, res) => {
        res.send(productsInfo);
    });

    router.get('/products/:id', (req, res) => {
        const idProd = Number(req.params.id);
        const product = productsInfo.filter(prod => prod.id === idProd && prod.active === true);
        res.send(product);
    });
    
    router.put('/products/:id', isAdmin , (req, res) => {
        const idProd = Number(req.params.id);
        for (const product of productsInfo) {
            if (idProd === product.id) {
                const data = req.body;
                product.detail = data.detail;
                product.price = data.price;
                product.active = data.active;

                return res.json(productsInfo);
            }
        }
    });

    router.post('/products', isAdmin, (req, res) => {
        console.log(req.body);
        const id = new Date().getTime();
        const userData =  {
            ...req.body,
            id: id,
          };
        productsInfo.push(userData);
        res.send(productsInfo);
    });

    router.delete('/products/:id', isAdmin , (req, res) => {
        const idProd = Number(req.params.id);
        for (const product of productsInfo) {
            if (idProd === product.id) {
                const index = productsInfo.indexOf(product);
                if (index > -1) {
                    productsInfo.splice(index, 1);
                }
                return res.json(productsInfo);
            }
        }
    });

    return router;
}

module.exports = {
    getRouterProd
}