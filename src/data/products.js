const products = [
    {
        id: 1625082848172,
        detail: 'Milanesa con pure',
        price: 350.25,
        active: true
    },
    {
        id: 1625082901706,
        detail: 'Suprema con ensalada',
        price: 280.00,
        active: true
    },
    {
        id: 1625082912024,
        detail: 'Ravioles con bolognesa',
        price: 300.50,
        active: false
    }
]

function createProd(body, id) {
    const data = new Object();
    data.detail = body.detail;
    data.price = body.price;

    const prodData =  {
        ...data,
        id: id,
        active: true
      };
    products.push(prodData);
    return prodData;
}

function checkBody(body) {
    let msg = '';
    if ( !body.detail ) {
        msg += 'Nombre de usuario es requerido.';
    }
    if ( !body.price || body.price <= 0 ) {
        msg += 'El precio es necesario. El mismo debe ser mayor a $ 0.';
    }

    return msg;
}

module.exports = {
    productsInfo: products,
    createProd,
    checkBody
}