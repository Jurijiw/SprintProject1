require('dotenv').config();

const express = require('express');
const { loadDocumentation } = require('./middlewares/documentation');
const { getRouter } = require('./routes/login');
const { getRouterPM } = require('./routes/paymentMethod');
const { getRouterProd } = require('./routes/product');
const { getRouterUser } = require('./routes/user');
const { getRouterOrders } = require('./routes/order');
const { isLogin } = require('./middlewares/validators');

const version = '/api/v1';
const port = process.env.PORT || 3030;


function main(){
    const server = express();
    server.use(express.json());
    loadDocumentation(server);

    //Login routes - Probadas
    server.use(version, getRouter());

    //Users routes - Probadas
    server.use(version, getRouterUser());

    server.use( isLogin );
    //Payment Methods routes - 
    server.use(version, getRouterPM());

    //Products routes
    server.use(version, getRouterProd());

    //Orders routes
    server.use(version, getRouterOrders());

    server.listen(port, () => {
        console.log(`Server running on port: ${port}`);
    });
}

main();