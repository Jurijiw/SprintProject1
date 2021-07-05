const orders = [
    {
        id: 1625081464339,
        detail: [ 
            {
                idProduct: 1,
                amount: 6
            },
            {
                idProduct: 3,
                amount: 1
            } 
        ],
        userId: 1625080204721,
        paymentMethod: 1625082031025,
        address: 1,
        status: 1625082331400, //Pendiente
        date: '2021-07-05T03:50:06.166Z'
    },
    {
        id: 1625081464340,
        detail: [ 
            {
                idProduct: 1,
                amount: 6
            },
            {
                idProduct: 3,
                amount: 1
            } 
        ],
        userId: 1625080204721,
        paymentMethod: 1625082031025,
        address: 1,
        status: 1625082391301, //Entregado
        date: '2021-07-05T03:51:00.509Z'
    },
    {
        id: 1625081478738,
        detail: [ 
            {
                idProduct: 2,
                amount: 1
            }
        ],
        userId: 1625080204721,
        paymentMethod: 1625082031025,
        address: 1,
        status: 1625082383225, //Enviado
        date: '2021-07-04T03:51:00.509Z'
    }
]

module.exports = {
    ordersInfo: orders,

}