const users = [
    {
        id: 1625080182519,
        username: 'admin',
        name: 'Lia Jurijiw',
        email: 'ljurijiw@gmail.com',
        phoneNumber: 2222111111,
        address:
            {
                street: 'Almafuerte',
                number: 1234,
                city: 'Rio Grande',
                province: 'TDF'
            }
        ,
        password: 'admin',
        admin: true,
        login: true
    },
    {
        id: 1625080204721,
        username: 'adri123',
        name: 'Adriana Lopez',
        email: 'alopez@mail.com',
        phoneNumber: 2222333333,
        address:
            {
                street: 'Estrada',
                number: 2020,
                city: 'Rio Grande',
                province: 'TDF'
            }
        ,
        password: 'adri123',
        admin: false,
        login: true
    },
    {
        id: 1625080204722,
        username: 'santi',
        name: 'Santiago Perez',
        email: 'sperez@mail.com',
        phoneNumber: 4444666666,
        address:
            {
                street: 'Rio Las Cuevas',
                number: 1589,
                city: 'Rio Grande',
                province: 'TDF'
            }
        ,
        password: 'santi',
        admin: false,
        login: false
    }
]

function validateLogin(username, email, password) {
    if ( !username ) {
        for (const user of users) {
            if (user.email === email && user.password === password){
                return true;
            }
        }
    } else if ( !email){
        for (const user of users) {
            if (user.username === username && user.password === password){
                return true;
            }
        }
    }
    return false;
}

function getUserPosition(username, email) {
    for (const index in users) {
        let user = users[index];
        if (user.username === username) {
            return index;
        } else if (user.email === email){
            return index;
        }
    }
    return false;
}

function createUser(body, id) {
    const data = new Object();
    data.username = body.username;
    data.name = body.name;
    data.email = body.email;
    data.phoneNumber = body.phoneNumber;
    data.password = body.password;
    data.address = {
        street: body.address.street,
        number: body.address.number,
        city: body.address.city,
        province: body.address.province
    };

    const userData =  {
        ...data,
        id: id,
        admin: false
      };
    users.push(userData);
    return userData;
}

function checkBody(body) {
    let msg = '';
    if ( !body.username ) {
        msg += 'Nombre de usuario es requerido.';
    }
    if ( !body.name ) {
        msg += 'Nombre y apellido es requerido.';
    }
    if ( !body.email ) {
        msg += 'Email es requerido.';
    }
    if ( !body.phoneNumber ) {
        msg += 'Telefono es requerido.';
    }
    if ( !body.password ) {
        msg += 'Contraseña es requerida.';
    }
    if ( !body.address.street || !body.address.number || !body.address.city || !body.address.province ) {
        msg += 'Direccion completa es requerida.';
    }

    return msg;
}

module.exports = {
    usersInfo: users,
    validateLogin,
    getUserPosition,
    createUser,
    checkBody
}