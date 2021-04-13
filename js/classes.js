class Client {
    constructor(id, name, firstName, age, password, civility, status) {
        this.id = id;
        this.name = name;
        this.firstName = firstName;
        this.age = age;
        this.password = password;
        this.civility = civility;
        this.status = status;
    }
}

function serializeClient(client) {
    return JSON.stringify({
        name: client.name,
        firstName: client.firstName,
        age: parseInt(client.age),
        password: client.password,
        civility: client.civility,
        status: client.status,
    })
}

class Order {
    constructor(number, price, status, clientId) {
        this.id;
        this.number = number;
        this.price = price;
        this.status = status;
        this.clientId = clientId;
    }
}

function serializeOrder(order) {
    return JSON.stringify({
        id: parseInt(order.id),
        number: parseInt(order.number),
        price: parseFloat(order.price),
        status: parseInt(order.status),
        clientId: order.clientId,
    })
}