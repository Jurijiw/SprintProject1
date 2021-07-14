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
        paymentMethod: 1625082031025,
        address: {
                street: 'Malvinas Argentinas',
                number: 555,
                city: 'Rio Grande',
                province: 'TDF'
                },
        status: 1, //Pendiente
        date: '2021-07-05T03:50:06.166Z'
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
        id: 1625081478739,
        detail: [ 
            {
                idProduct: 1625082901706,
                amount: 1
            }
        ],
        userId: 1625080204721,
        paymentMethod: 1625082031025,
        address: {
            street: 'Juan de Dios',
            number: 2021,
            city: 'Rio Grande',
            province: 'TDF'
            },
        status: 1,
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

module.exports = {
    ordersInfo: orders,
    getFavs

}