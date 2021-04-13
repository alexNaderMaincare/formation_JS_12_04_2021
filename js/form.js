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

let clients = [];

function displayClient() {
    // Get values from HTML
    let name = document.getElementById('name').value;
    let firstName = document.getElementById('firstname').value;
    let age = document.getElementById('age').value;
    let password = document.getElementById('password').value;
    let civility = document.getElementById('civility').value;
    let status = document.getElementById('status').checked;

    // By default, the label is in red
    document.getElementById('labelCreationClient').style.color = 'red';

    // Call method to check parameters
    checkParametersClient(name, firstName, age, password, civility, status);
}

function checkParametersClient(name, firstName, age, password, civility, status)  {
    // Create a client if conditions are good
    // name and firstname  char min
    // password not empty and 6 char max
    // age is given
    let message;
    
    document.getElementById('labelCreationClient').style.color = 'red';

    if (    (name.length >= 5)
        &&  (firstName.length >= 5)
        &&  (password.length > 0)  
        &&  (password.length <= 6)
        &&  (age.length > 0) ){
            // Create a client
            createClient(name, firstName, age, password, civility, status);
            
            // Update message and label 
            message = "Felicitations, l'ajout du client à fonctionné !";
            document.getElementById('labelCreationClient').innerHTML = message;
            document.getElementById('labelCreationClient').style.color = 'green';

            // Clear values    
            document.getElementById('name').value = "";
            document.getElementById('firstname').value = "";
            document.getElementById('age').value = "";
            document.getElementById('password').value = "";
            document.getElementById('civility').value = "";
            document.getElementById('status').value = "";
        }
    else {
            // Call method to get error parameters
            message = checkErrorParams(name, firstName, age, password);
    }
    document.getElementById('labelCreationClient').innerHTML = message;
}

// Create a new client
function createClient(name, firstName, age, motDePasse, civ, status) {
    let newClient = new Client("", name, firstName, parseInt(age), motDePasse, civ, status);
    clients.push(newClient);
    console.log(clients);

    /*clients.push(client);
    alert("Nouveau client " + nom + " " + prenom + ". Il y a " + clients.length + " clients enregistrés !");

    message = "Bonjour " + civ + " " + prenom + " " + nom
    document.getElementById('labelCreationClient').style.color = 'green';*/

    // Implement request
    $.ajax({
        url: 'http://localhost:3000/clients',
        type: 'POST',
        dataType: 'JSON',
        contentType: "application/json",
        data: serializeClient(newClient),
    })

    // Request success
    .done(function(data){
        console.log(data);
        console.log("Success ! Data: " + JSON.stringify(data));
    })

}

// Print client parameters in error
function checkErrorParams(name, firstName, age, password) {

    let message = "Erreur sur les champs suivants: ";

    if (name.length < 5) {
        console.log("Nom incorrect");
        message += " nom";
    }

    if (firstName.length < 5) {
        console.log("Prenom incorrect");
        message += ", prenom";
    }

    if (password.length == 0 || password.length > 6) {
        console.log("Mot de passe incorrect");
        message += ", mot de passe";
    }

    if (age.length == 0) {
        console.log("Age incorrect");
        message += ", age";
    }

    return message;
}



// Search for client information
// Average age
// Name search
function searchClientInformation() {
    let information = document.getElementById('information').value;
    let name = document.getElementById('searchInfo').value;
    let message = "";

    document.getElementById('labelRechercheInfos').style.color = 'red';

    if (information == "average") {
        console.log("On souhaite connaître la moyenne d'âge !");
        getAverageAgeDb();
    } else if (information == "searchClient") {
        console.log("On souhaite rechercher un client!");
        getClientInformationDb(name);
    } else if (information == "rechercheDb") {
        console.log("On souhaite rechercher en database!");
        searchInDatabase();

    }

    document.getElementById('labelRechercheInfos').innerHTML = message;
}


// Calculates average age
function getAverageAge() {

    let message;
    
    if (clients.length > 0 ) {
        let averageAge = 0;

        for (i in clients) {
            averageAge += parseInt(clients[i].age);
        }

        averageAge /=  clients.length;

        message = "Moyenne age des clients = " + averageAge;
        document.getElementById('labelRechercheInfos').style.color = 'green';
    } 
    else {
        message = "Aucun client n'est renseigné !";
    }

    return message;
}


// Search for a client that fits the name given
function getClientInformationDb(name) {

    let message;

    console.log("On recherche un client du nom de " + name);

    if (clients.length > 0 ) {
        let clientFound = false;

        for (i in clients) {
            console.log("clients[i].name " + clients[i].name);
            if (clients[i].name.toUpperCase == name.toUpperCase) {
                console.log("Client trouvé à l'index " + i);
                clientFound = true;
                message = "Client trouvé: " 
                            + clients[i].civility 
                            + " " + clients[i].name.toUpperCase()
                            + " " + clients[i].firstName
                            + " (" + clients[i].age + " ans)";
                document.getElementById('labelRechercheInfos').style.color = 'green';
                break;
            }
        }

        if (!clientFound) {
            message = "Le client du nom de " +  name + " n'a pas été trouvé";
        }
    }
    else {
        message = "Aucun client n'est renseigné !";
    }

    return message;
}

function searchInDatabase() {
    // JQuery

    let message = "";

    // Implement request
    $.ajax({
        url: `http://localhost:3000/clients`,
        type: 'GET',
        dataType: 'JSON'
    })

    // Request success
    .done(function(data){
        message = "Les clients sont : <br>";

        console.log(data);
        console.log("Success ! Data: " + JSON.stringify(data));

        // Get info from db
        for(client of data) {
            message += "Nom: " + client.name + ", prenom: " + client.firstName + "<br>";
        }

        // Update HTML
        $("#labelRechercheInfos").css("color","green");
        $("#labelRechercheInfos").html(message);
    })
}

// Calculates average age
function getAverageAgeDb() {

    let message = "";
    let averageAge = 0;
    // Implement request
    $.ajax({
        url: 'http://localhost:3000/clients',
        type: 'GET',
        dataType: 'json'
    })

    // Request success
    .done(function(data){
        console.log(data);
        console.log("Success ! Data: " + JSON.stringify(data));

        if (data) {
            // Get info from db
            for(client of data) {
                console.log("Age : " + client.age);
                averageAge += parseInt(client.age);
            }
    
            message = "Moyenne d'âge: " + averageAge/(data.length);
        }
        else {
            message = "Aucune donnée en base !";
        }

        // Update HTML
        $("#labelRechercheInfos").css("color","green");
        $("#labelRechercheInfos").html(message);

    })
}



/* CLIENT INFO */
// Search for a client that fits the name given
function getClientInformationDb(name) {

    let message = "";
    let nameVar = name;
    console.log(name);
    // Implement request
    $.ajax({
        url: `http://localhost:3000/clients?name=${nameVar}`,
        type: 'GET',
        dataType: 'json'
    })

    // Request success
    .done(function(data){
        console.log(data);
        console.log("Success ! Data: " + JSON.stringify(data));

        if (data.length > 0) {
            message = data[0]['civility'] 
                         + " " + data[0]['name'] 
                         + " " + data[0]['firstName']
                         + " (" + data[0]['age'] + " ans)";
            $("#labelRechercheInfos").css("color","green");
        }
        else {
            message = "Désolé, le client n'est pas répertorié";
        }

        $("#labelRechercheInfos").html(message);

    })

}



// Partie finale du mardi 
// Exemple
function getAllData() {
    console.log("Enter loadDataFromDb");
    requestsJQuery('GET', 'http://localhost:3000/clients', 1);
    requestsJQuery('GET', 'http://localhost:3000/commandes', 2);
}

function requestsJQuery(type, url, idFunction, data) {
    $.ajax({
      url: url,
      type: type,
      dataType: 'JSON',
      contentType: "application/json",
      data: data
    })
    .done(function(data) {
        console.log(data);
        console.log("Success ! Data: " + JSON.stringify(data));
      switch (idFunction) {
        case 1:
          addElementsInTabClients(data);
          break
        case 2:
          addElementsInTabCommandes(data);
          break;
      }
  
  
    })
  }

// Function ID 1
function addElementsInTabClients(data) {
    let identifieRowClient = 1;
    let tabClient = document.getElementById('tableClients');
      for (i in data) {
        let row = tabClient.insertRow(identifieRowClient);
        row.insertCell(0).innerHTML = data[i].name;
        row.insertCell(1).innerHTML = data[i].firstName;
        identifieRowClient++;
      }
  }
  
  // Function ID 2
  function addElementsInTabCommandes(data) {
    let identifieRow = 1;
    let tabCommande = document.getElementById('tableCommandes');
    for (i in data) {
      let row = tabCommande.insertRow(identifieRow);
      row.insertCell(1).innerHTML = data[i].number;
      let cellStatus = row.insertCell(3);
      updateStatus(cellStatus, data[i].status);
      identifieRow++;
    }
  }

  function updateStatus(cell, orderState) {
    console.log("Order state: " + orderState);

    cell.style.textAlign ="right";

    if (orderState == 1) {
        cell.innerHTML = "Payé";
        cell.style.color = "green";
    }
    else if(orderState == 2) {
        cell.innerHTML = "En attente de paiement";
        cell.style.color = "orange";
    }
    else if(orderState == 3) {
        cell.innerHTML = "Non payé";
        cell.style.color = "red";
    }
    else {
        cell.innerHTML = "Status inconnu";
        cell.style.color = "black";
    }
}


  /* AJOUT COMMANDE */ 
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
    let clientId = document.getElementById('associatedClient').value;
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

function getClientAndAddTableSelect() {
    $.ajax({
        url: `http://localhost:3000/clients`,
        type: 'GET',
        dataType: 'json'
    })

    .done(function(data){
        console.log(data);
        console.log("Success ! Data: " + JSON.stringify(data));

        select = document.getElementById('associatedClient');

        if (data) {
            // Get info from db
            for(client of data) {
                var opt = document.createElement('option');
                opt.value = client.name + client.firstName;
                opt.innerHTML = client.name + " " + client.firstName;
                select.appendChild(opt);
            }
        }
    })
}



// Search for commande information
function searchCommandeInformation() {
    let information = document.getElementById('information').value;
    let number = parseInt(document.getElementById('searchInfo').value);
    let message = "";

    document.getElementById('labelRechercheInfos').style.color = 'red';

    if (information == "commandPriceAverage") {
        console.log("On souhaite connaître le prix moyen !");
        getAveragePriceDb();
    } else if (information == "commandSearch") {
        console.log("On souhaite rechercher une commande!");
        getCommandInformationDb(number)
    } else if (information == "commandList") {
        console.log("On souhaite rechercher en database!");
        getCommandList();
    }

    document.getElementById('labelRechercheInfos').innerHTML = message;
}


// Get average pride
function getAveragePriceDb() {
    let message = "";
    let averagePrice= 0;
    // Implement request
    $.ajax({
        url: 'http://localhost:3000/commandes',
        type: 'GET',
        dataType: 'json'
    })

    // Request success
    .done(function(data){
        console.log(data);
        console.log("Success ! Data: " + JSON.stringify(data));

        if (data) {
            // Get info from db
            for(commandes of data) {
                console.log("Age : " + commandes.price);
                averagePrice += parseInt(commandes.price);
            }
    
            message = "Moyenne de prix: " + averagePrice/(data.length);
        }
        else {
            message = "Aucune donnée en base !";
        }

        // Update HTML
        $("#labelRechercheInfos").css("color","green");
        $("#labelRechercheInfos").html(message);
    })
}

/* COMMAND INFO */
// Search for a client that fits the name given
function getCommandList() {

    let message = "";
    let nameVar = name;
    // Implement request
    $.ajax({
        url: `http://localhost:3000/commandes`,
        type: 'GET',
        dataType: 'json'
    })

    // Request success
    .done(function(data){
        message = "Les commandes sont : <br>";

        console.log(data);
        console.log("Success ! Data: " + JSON.stringify(data));

        // Get info from db
        for(commande of data) {
            message += "Id: " + commande.id 
                    + ", Numéro: " + commande.number
                    + ", Prix: " + commande.price
                    + ", Status: " + commande.status
                    + ", Client Id: " + commande.clientId + "<br>";
        }

        // Update HTML
        $("#labelRechercheInfos").css("color","green");
        $("#labelRechercheInfos").html(message);
    })

}

/* COMMAND INFO */
// Search for a command that fits the given name
function getCommandInformationDb(number) {

    let message = "";
    let numberVar = number;
    // Implement request
    $.ajax({
        url: `http://localhost:3000/commandes?number=${numberVar}`,
        type: 'GET',
        dataType: 'json'
    })

    // Request success
    .done(function(data){
        console.log(data);
        console.log("Success ! Data: " + JSON.stringify(data));

        if (data) {
            console.log(data[0]['number']);
            message = "Id: " + data[0]['id'] 
                         + ", numéro: " + data[0]['number'] 
                         + ", prix: " + data[0]['price']
                         + ", status: " + data[0]['status']
                         + ", id client: " + data[0]['clientId'];

            $("#labelRechercheInfos").css("color","green");
        }
        else {
            message = "Désolé, la commande n'est pas répertoriée";
        }

        $("#labelRechercheInfos").html(message);

    })

}