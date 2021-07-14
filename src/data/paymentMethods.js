const paymentMethods = [
    {
        id: 1625082031025,
        detail: 'Tarjeta de credito',
        active: true
    },
    {
        id: 1625082125742,
        detail: 'Tarjeta de debito',
        active: true

    },
    {
        id: 1625082134014,
        detail: 'Mercadopago',
        active: false
    }
]

function createPM(body, id) {
    const pmData =  {
        detail: body.detail,
        id: id,
        active: true
      };
    paymentMethods.push(pmData);
    return pmData;
}

function checkBody(body) {
    let msg = '';
    if ( !body.detail ) {
        msg += 'Descripcion de metodo de pago es requerida.';
    }
    return msg;
}

module.exports = {
    paymentMethodsInfo: paymentMethods,
    createPM,
    checkBody
}