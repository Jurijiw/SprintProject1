const { usersInfo } = require('../data/users');
const { statusInfo } = require('../data/status');

const orders = [
    {
        id: 1625081464339,
        detail: [ 
            {
                idProduct: 1625082848172,
                amount: 6
            }
        ],
        userId: 1625080204721,
        status: 1 //Pendiente
    },
    {
        id: 1625081464340,
        detail: [ 
            {
                idProduct: 1625082848172,
                amount: 6
            },
            {
                idProduct: 1625082901706,
                amount: 1
            } 
        ],
        userId: 1625080204721,
        paymentMethod: 1625082031025,
        address: {
            street: 'San Juan',
            number: 22,
            city: 'Rio Grande',
            province: 'TDF'
            },
        status: 5, //Entregado
        date: '2021-07-05T03:51:00.509Z'
    },
    {
        id: 1625081478738,
        detail: [ 
            {
                idProduct: 1625082901706,
                amount: 1
            }
        ],
        userId: 1625080204721,
        paymentMethod: 1625082031025,
        address: {
            street: 'Sarmiento',
            number: 1911,
            city: 'Rio Grande',
            province: 'TDF'
            },
        status: 4, //Enviado
        date: '2021-07-04T03:51:00.509Z'
    },
    {
        id: 1625081464339,
        detail: [ 
            {
                idProduct: 1625082848172,
                amount: 6
            }
        ],
        userId: 1625080204721,
        status: 1 //Pendiente
    },
    {
        id: 1625081464340,
        detail: [ 
            {
                idProduct: 1625082848172,
                amount: 6
            },
            {
                idProduct: 1625082901706,
                amount: 1
            } 
        ],
        userId: 1625080204721,
        paymentMethod: 1625082031025,
        address: {
            street: 'San Juan',
            number: 22,
            city: 'Rio Grande',
            province: 'TDF'
            },
        status: 5, //Entregado
        date: '2021-07-05T03:51:00.509Z'
    },
    {
        id: 1625081478738,
        detail: [ 
            {
                idProduct: 1625082901706,
                amount: 1
            }
        ],
        userId: 1625080204721,
        paymentMethod: 1625082031025,
        address: {
            street: 'Sarmiento',
            number: 1911,
            city: 'Rio Grande',
            province: 'TDF'
            },
        status: 4, //Enviado
        date: '2021-07-04T03:51:00.509Z'
    }
]

function getFavs(id) {
    let favs = [];
    const userOrders = orders.filter(order => order.userId === id );
    for (const order of userOrders) {
        for (const product of order.detail) {
            if ( favs.includes( product.idProduct ) ){
                favs = favs;
            } else {
                favs.push(product.idProduct);
            }
        }
    }
    return favs;
}

function createOrder(id, idUser) {
    const data = new Object();
    data.detail = [];
    data.userId = idUser;

    const orderData =  {
        ...data,
        id: id,
        status: 1
      };

    orders.push(orderData);
    return orderData;
}

function updateOrder(idOrder, idProd, amount) {
    for (const order of orders) {
        if (idOrder === order.id) {
            const exists = order.detail.find(prod => prod.idProduct === idProd);
            console.log('Existe:', exists);
            if(exists === undefined) {
                order.detail.push({idProd: idProd, amount: amount});
                return 'Producto agregado con exito';
            }
            const index = order.detail.findIndex(prod => prod.idProduct === idProd);

            if (index > -1) {
                order.detail[index].idProduct = idProd;
                order.detail[index].amount = amount;
                return 'Producto actualizado con exito';
            }
        }
    }
    return '';
}

function deleteProductOrder(idOrder, idProd) {
    for (const order of orders) {
        if (idOrder === order.id) {
            const index = order.detail.findIndex(prod => prod.idProduct === idProd);
            if (index > -1) {
                order.detail.splice(index, 1);
                return 'Producto eliminado con exito';
            }
        }
    }
    return '';
}

function confirmOrder(body, idUser, idOrder) {
    const index = orders.findIndex(order => order.id === idOrder);
    if (index > -1) {
        orders[index].id = idOrder;
        orders[index].paymentMethod = Number(body.paymentMethod);
        orders[index].date = new Date();
        orders[index].status = 2;
        
        if (!body.address || body.address === '' || body.address === undefined || body.address === null) {
            for (const user of usersInfo) {
                if (user.id === idUser) {
                    orders[index].address = {
                        street: user.address.street,
                        number: user.address.number,
                        city: user.address.city,
                        province: user.address.province
                    }
                }
            }
        } else {
            orders[index].address = {
                street: body.address.street,
                number: body.address.number,
                city: body.address.city,
                province: body.address.province
            };
        }
        return 'Pedido confirmado con exito';
    }

    return '';
}

function orderByStatus() {
    let orderStatus = [];
    for (const status of statusInfo) {
        let name = status.detail;
        let statusName = orders.filter(order => order.status === status.id );
        statusName = {
            status: name,
            orders: statusName
            };
        orderStatus.push(statusName);
    }
    
    return orderStatus;
}

module.exports = {
    ordersInfo: orders,
    getFavs,
    createOrder,
    updateOrder,
    deleteProductOrder,
    confirmOrder,
    orderByStatus
}