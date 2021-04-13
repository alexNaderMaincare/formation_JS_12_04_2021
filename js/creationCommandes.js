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

let orders = [];

function addOrder() {
    let number = parseInt(document.getElementById('number').value);
    let price = parseFloat(document.getElementById('price').value);
    let clientId = document.getElementById('clientId').value;
    let status = -1;

    status = convertStatus();

    console.log("Number: " + number 
              + ", price: " + price 
              + ", status: " + status 
              + ", clientId: " + clientId);

    if (   (number) 
        && (price)
        && (status != -1)
        && (clientId) ) {
            console.log("Order can be added");
            let newOrder = new Order(number, price, status, clientId)
            orders.push(newOrder);
            console.log(orders);

            sendOrderInfoToDb(newOrder);
        }
    else {
        console.log("Order can not be added");
    }
}

function convertStatus() {
    let statusNb = -1;
    let statusString = document.getElementById('status').value;


    if (statusString == "paid") {
        statusNb = 1;
    }
    else if (statusString == "waitingForPaiment") {
        statusNb = 2;
    }
    else if (statusString == "notPaid") {
        statusNb = 3;
    }
    else {
        console.log("Status is unknown");
    }

    console.log("Converted status from " + statusString + " to " + statusNb);

    return statusNb;
}

function sendOrderInfoToDb(order) {
    console.log("Enter sendOrderInfoToDb()");

    
    // Implement request
    $.ajax({
        url: 'http://localhost:3000/commandes',
        type: 'POST',
        dataType: 'JSON',
        contentType: "application/json",
        data: serializeOrder(order),
    })

    // Request success
    .done(function(data){
        console.log(data);
        console.log("Success ! Data: " + JSON.stringify(data));
    })
}