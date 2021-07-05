const users = [
    {
        id: 1625080182519,
        username: 'admin',
        name: 'Lia',
        lastName: 'Jurijiw',
        email: 'ljurijiw@gmail.com',
        phoneNumber: 2222111111,
        addresses:[
            {
                id: 1,
                street: 'Almafuerte',
                number: 1234,
                city: 'Rio Grande',
                province: 'TDF'
            }
        ],
        password: 'timi',
        admin: true
    },
    {
        id: 1625080204721,
        username: 'adri123',
        name: 'Adriana',
        lastName: 'Lopez',
        email: 'alopez@mail.com',
        phoneNumber: 2222333333,
        addresses:[
            {
                id: 1,
                street: 'Estrada',
                number: 2020,
                city: 'Rio Grande',
                province: 'TDF'
            }
        ],
        password: 'adri123',
        admin: false
    }
]


function validateLogin(username, password) {
    for (let user of users) {
        if (user.username === username && user.password === password){
            return true;
        }
    }
    return false;
}

function getUserPosition(username) {
    for (let index in users) {
        let user = users[index];
        if (user.username === username) {
            return index;
        }
    }
    return false;
}


module.exports = {
    usersInfo: users,
    validateLogin,
    getUserPosition,
}