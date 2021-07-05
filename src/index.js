const express = require('express');
const { loadDocumentation } = require('./middlewares/documentation');
const { getRouter } = require('./routes/login');
const { getRouterPM } = require('./routes/paymentMethod');
const { getRouterProd } = require('./routes/product');
const { getRouterUser } = require('./routes/user');
const { getRouterOrders } = require('./routes/order');


function main(){
    const server = express();
    server.use(express.json());
    loadDocumentation(server);

    //Login routes - Probadas
    server.use('/', getRouter());

    //Users routes - Probadas
    server.use('/', getRouterUser());

    //Payment Methods routes - 
    server.use('/', getRouterPM());

    //Products routes
    server.use('/', getRouterProd());

    //Orders routes
    server.use('/', getRouterOrders());

    server.listen(9090, () => {
        console.log('Server ready: http://localhost:9090');
    });
}

main();