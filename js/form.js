let clients = [];
let orders = [];


// Add a client if all necessary information is given
function addClient() {
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
        data: newClient.serializeClient(),
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




// Search for client information (in form.html)
// Average age
// Name search
function searchClientInformation() {
    let information = document.getElementById('information').value;
    let name = document.getElementById('searchInfo').value;
    let message = "";

    document.getElementById('labelRechercheInfos').style.color = 'red';

    if (information == "average") {
        console.log("On souhaite connaître la moyenne d'âge !");
        displayAverageAgeClients();
    } else if (information == "searchClient") {
        console.log("On souhaite rechercher un client!");
        searchForClient(name);
    } else if (information == "rechercheDb") {
        console.log("On souhaite rechercher en database!");
        displayClients();

    }

    document.getElementById('labelRechercheInfos').innerHTML = message;
}

// Calculates average age (in form.html)
function displayAverageAgeClients() {

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

// Display clients information (in form.html)
function displayClients() {
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

// Search for a client in the DB with the name given (in form.html)
function searchForClient(name) {

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

// Get clients and commands info from DB
// commandes.html
function getAllData() {
    console.log("Enter getAllData");
    requestsJQuery('GET', 'http://localhost:3000/clients', 1);
    requestsJQuery('GET', 'http://localhost:3000/commandes', 2);

    getConnectedUserInfo();
}

function getConnectedUserInfo() {
    let username = localStorage.getItem('connectedUser');
    if (username != null) {
        document.getElementById('title').innerHTML = "CRM: " + username + " is connected";
    }

    let role = localStorage.getItem('role');
    console.log(role);

    if (role == "ADMIN") {
        if (document.getElementById('mySpan')) {
            document.getElementById('mySpan').hidden = true;
        }
    }
    else if (role == "USER") {
        
    }
    else {

    }
}

function initForm() {
    console.log(localStorage.getItem('role'));
    console.log(localStorage.getItem('connectedUser'));
    if (!localStorage.getItem('connectedUser')) {
        document.getElementById('mySpan').innerHTML = "Désole, vous n'avez pas les droits";
    } 
    else if  (localStorage.getItem('role') == 'USER') {
        document.getElementById('contentAddClient').hidden = true;
    }
    else if  (localStorage.getItem('role') == 'ADMIN') {
        document.getElementById('contentAddClient').hidden = false;
    }
}

function requestsJQuery(type, url, idFunction, data) {
    $.ajax({
      url: url,
      type: type,
      dataType: 'JSON',
      contentType: 'application/json',
      data: data
    })
    .done(function(data) {
        /*console.log(data);
        console.log("Success ! Data: " + JSON.stringify(data));*/
      switch (idFunction) {
        case 1:
          addElementsInTabClients(data);
          break;
        case 2:
          addElementsInTabCommandes(data);
          break;
        case 3:
          connection(data);
          break;
      }
  
  
    })
  }

// Fill the clients table
// commandes.html
function addElementsInTabClients(data) {
    let identifieRowClient = 1;
    let tabClient = document.getElementById('tabClients');

    let client = new Client();

    for (i in data) {

        client = client.deserialize(data[i]);

        let row = tabClient.insertRow(identifieRowClient);
        let cell1 = row.insertCell(0);
        cell1.innerHTML = client.id;
        row.insertCell(1).innerHTML = client.name;
        row.insertCell(2).innerHTML = client.firstName;

        client.formatAge(row.insertCell(3));
        client.formatCivility(row.insertCell(4));
        client.formatStatus(row.insertCell(5))

        //row.insertCell(5).innerHTML = data[i].status;
        identifieRowClient++;
    }
  }
  
// Fill the commands table
// commandes.html
function addElementsInTabCommandes(data) {
    let identifieRow = 1;
    let tabCommande = document.getElementById('tabCommandes');

    let order = new Order();

    for (i in data) {

        // Deserialize object
        order = order.deserialize(data[i]);

        let row = tabCommande.insertRow(identifieRow);
        row.insertCell(0).innerHTML = order.id;
        row.insertCell(1).innerHTML = order.number;
        order.formatPrice(row.insertCell(2));
        order.formatPriceTTC(row.insertCell(3));
        order.updateStatus(row.insertCell(4));

        // client.formatStatus(row.insertCell(3));

        row.insertCell(5).innerHTML = order.clientId;
        identifieRow++;
    }
}

// Add order in DB
function addOrder() {

    // Get infos from HTML
    let number = parseInt(document.getElementById('number').value);
    let price = parseFloat(document.getElementById('price').value);
    let clientId = document.getElementById('associatedClient').value;
    let status = -1;

    // Convert status from string to int
    status = convertStatus();

    let message = "";
    document.getElementById('labelCreationCommande').style.color = "red";

    console.log("Number: " + number 
              + ", price: " + price 
              + ", status: " + status 
              + ", clientId: " + clientId);

    // Create order if requirements are met
    if (   (number) 
        && (price)
        && (status != -1)
        && (clientId) ) {
            console.log("Order can be added");
            let newOrder = new Order(number, price, status, clientId)
            orders.push(newOrder);
            console.log(orders);

            sendOrderInfoToDb(newOrder);

            message = "Commande numéro " + number + " créée avec sucés !";
            document.getElementById('labelCreationCommande').style.color = "green";
            document.getElementById('labelCreationCommande').style.fontWeight = "bold";
    }
    else {
        console.log("Order can not be added");
        message = "La commande ne peut pas être créée...";
    }

    document.getElementById('labelCreationCommande').innerHTML = message;
}

// Convert status from string to int
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

// Send new order info to DB
function sendOrderInfoToDb(order) {
    console.log("Enter sendOrderInfoToDb()");

    
    // Implement request
    $.ajax({
        url: 'http://localhost:3000/commandes',
        type: 'POST',
        dataType: 'JSON',
        contentType: "application/json",
        data: order.serializeOrder(),
    })

    // Request success
    .done(function(data){
        console.log(data);
        console.log("Success ! Data: " + JSON.stringify(data));
    })
}

// Update client Id with data from client DB
function getClientAndAddTableSelect() {
    
    getConnectedUserInfo();

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
                opt.value = client.name + " " + client.firstName;
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
        console.log("On souhaite connaître le prix moyen des commandes !");
        displayAveragePrice();
    } else if (information == "commandSearch") {
        console.log("On souhaite rechercher une commande avec le numéro: " + number + " !");
        searchForCommand(number)
    } else if (information == "commandList") {
        console.log("On souhaite afficher la liste des commandes!");
        displayCommandInformation();
    }

    document.getElementById('labelRechercheInfos').innerHTML = message;
}


// Get average pride
function displayAveragePrice() {
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
function displayCommandInformation() {

    let message = "";
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
function searchForCommand(number) {

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

function connect() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    if (   (username.length > 0)
        && (password.length > 0) ) {
            createUser(username, password);
        }
    else {
        console.log("Can not create user !");
    }
}

function createUser(username, password) {
    console.log(username + password);

    requestsJQuery('GET', `http://localhost:3000/users?username=${username}&password=${password}`, 3);
}

function connection(data) {
    try  {
        let user = new User();
        user = user.deserialize(data[0]);
        console.log(user.role);

        localStorage.setItem('connectedUser', user.username);
        localStorage.setItem('role', user.role);
        window.location.replace("home.html");
    }
    catch (err) {
        $("#resultConnection").html(err);
    }
}

function deconnection() {
    $("#title").html("CRM");
    localStorage.clear();
}

function goBack() {
    console.log("gobackkkk");
    window.history.back();
}